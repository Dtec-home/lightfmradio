import { z } from 'zod';

const PAYSTACK_API_URL = 'https://api.paystack.co';

const paystackResponseSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  data: z.record(z.unknown()).optional(),
});

export const donationInputSchema = z.object({
  email: z.string().email(),
  amount: z.number().finite().positive().max(1_000_000),
});

export type DonationInput = z.infer<typeof donationInputSchema>;

function getSecretKey() {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    throw new Error('PAYSTACK_SECRET_KEY is not configured');
  }

  return secretKey;
}

async function paystackRequest(path: string, init: RequestInit) {
  const response = await fetch(`${PAYSTACK_API_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${getSecretKey()}`,
      'Content-Type': 'application/json',
      ...init.headers,
    },
    cache: 'no-store',
  });
  const payload = paystackResponseSchema.parse(await response.json());

  if (!response.ok || !payload.status) {
    throw new Error(payload.message || 'Paystack request failed');
  }

  return payload;
}

export async function initializeDonation(input: DonationInput) {
  const currency = process.env.PAYSTACK_CURRENCY ?? 'KES';
  const callbackUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/give/callback`;

  const payload = await paystackRequest('/transaction/initialize', {
    method: 'POST',
    body: JSON.stringify({
      email: input.email,
      amount: Math.round(input.amount * 100),
      currency,
      callback_url: callbackUrl,
      metadata: {
        purpose: 'Light FM ministry giving',
      },
    }),
  });

  const authorizationUrl = z.string().url().parse(payload.data?.authorization_url);
  const reference = z.string().min(1).parse(payload.data?.reference);

  return { authorizationUrl, reference };
}

export async function verifyDonation(reference: string) {
  const payload = await paystackRequest(`/transaction/verify/${encodeURIComponent(reference)}`, {
    method: 'GET',
  });

  return z.object({
    status: z.string(),
    reference: z.string(),
    amount: z.number(),
    currency: z.string(),
  }).parse(payload.data);
}
