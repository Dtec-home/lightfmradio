import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';
import { NextRequest } from 'next/server';
import { donationInputSchema, initializeDonation, verifyDonation } from '@/lib/paystack';
import { POST as initializeRoute } from '@/app/api/paystack/initialize/route';
import { GET as verifyRoute } from '@/app/api/paystack/verify/route';
import { getSafeImageSource } from '@/lib/images';
import { escapeHtml } from '@/lib/email';

describe('Paystack giving', () => {
  it('escapes contact content before placing it in email HTML', () => {
    assert.equal(
      escapeHtml('<script>alert("x")</script>\nThanks & peace'),
      '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;\nThanks &amp; peace',
    );
  });

  it('allows local and approved AzuraCast images only', () => {
    assert.equal(getSafeImageSource('/logo.png'), '/logo.png');
    assert.equal(getSafeImageSource('https://app.lightfmradio.org/uploads/art.jpg'), 'https://app.lightfmradio.org/uploads/art.jpg');
    assert.equal(getSafeImageSource('http://app.lightfmradio.org/uploads/art.jpg'), null);
    assert.equal(getSafeImageSource('https://untrusted.example/art.jpg'), null);
  });

  it('accepts a valid donation and rejects invalid amounts', () => {
    assert.deepEqual(donationInputSchema.parse({ email: 'giver@example.com', amount: 500 }), {
      email: 'giver@example.com',
      amount: 500,
    });
    assert.throws(() => donationInputSchema.parse({ email: 'giver@example.com', amount: 0 }));
  });

  it('initializes and verifies a transaction through Paystack', async () => {
    process.env.PAYSTACK_SECRET_KEY = 'sk_test_for_tests';
    process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000';
    const fetchMock = mock.method(globalThis, 'fetch', async (input: string | URL) => {
      const url = String(input);
      const body = url.includes('initialize')
        ? { status: true, message: 'Authorization URL created', data: { authorization_url: 'https://paystack.test/checkout', reference: 'ref_123' } }
        : { status: true, message: 'Verification successful', data: { status: 'success', reference: 'ref_123', amount: 50000, currency: 'KES' } };
      return new Response(JSON.stringify(body), { status: 200 });
    });

    await assert.doesNotReject(() => initializeDonation({ email: 'giver@example.com', amount: 500 }));
    assert.deepEqual(await verifyDonation('ref_123'), {
      status: 'success',
      reference: 'ref_123',
      amount: 50000,
      currency: 'KES',
    });

    fetchMock.mock.restore();
  });

  it('returns a checkout URL from the initialize API', async () => {
    process.env.PAYSTACK_SECRET_KEY = 'sk_test_for_tests';
    const fetchMock = mock.method(globalThis, 'fetch', async () =>
      new Response(JSON.stringify({
        status: true,
        message: 'Authorization URL created',
        data: { authorization_url: 'https://paystack.test/checkout', reference: 'ref_123' },
      }), { status: 200 }),
    );

    const response = await initializeRoute(new NextRequest('http://localhost/api/paystack/initialize', {
      method: 'POST',
      body: JSON.stringify({ email: 'giver@example.com', amount: 500 }),
      headers: { 'content-type': 'application/json' },
    }));

    assert.equal(response.status, 200);
    assert.equal((await response.json()).authorizationUrl, 'https://paystack.test/checkout');
    fetchMock.mock.restore();
  });

  it('rejects malformed verification references', async () => {
    const response = await verifyRoute(new NextRequest('http://localhost/api/paystack/verify?reference=bad%20reference'));
    assert.equal(response.status, 400);
  });

  it('accepts Paystack trxref callback parameters', async () => {
    const response = await verifyRoute(new NextRequest('http://localhost/api/paystack/verify?trxref=ref_123'));
    assert.notEqual(response.status, 400);
  });
});
