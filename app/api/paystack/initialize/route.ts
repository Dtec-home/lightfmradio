import { NextRequest, NextResponse } from 'next/server';
import { donationInputSchema, initializeDonation } from '@/lib/paystack';

export async function POST(request: NextRequest) {
  try {
    const input = donationInputSchema.parse(await request.json());
    const payment = await initializeDonation(input);

    return NextResponse.json(payment);
  } catch (error) {
    console.error('Paystack initialization error:', error);
    return NextResponse.json({ error: 'Unable to start payment' }, { status: 400 });
  }
}
