import { NextRequest, NextResponse } from 'next/server';
import { verifyDonation } from '@/lib/paystack';

export async function GET(request: NextRequest) {
  const reference =
    request.nextUrl.searchParams.get('reference') ??
    request.nextUrl.searchParams.get('trxref');

  if (!reference || !/^[a-zA-Z0-9._-]+$/.test(reference)) {
    return NextResponse.json({ error: 'Invalid payment reference' }, { status: 400 });
  }

  try {
    const payment = await verifyDonation(reference);
    return NextResponse.json({ success: payment.status === 'success', payment });
  } catch (error) {
    console.error('Paystack verification error:', error);
    return NextResponse.json({ error: 'Unable to verify payment' }, { status: 502 });
  }
}
