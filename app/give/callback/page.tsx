'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/PageHeader';

type PaymentState = 'loading' | 'success' | 'failed';

export default function GivingCallbackPage() {
  const [state, setState] = useState<PaymentState>('loading');

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const reference = query.get('reference') ?? query.get('trxref');
    if (!reference) {
      setState('failed');
      return;
    }

    fetch(`/api/paystack/verify?reference=${encodeURIComponent(reference)}`)
      .then(async (response) => {
        const data = await response.json();
        setState(response.ok && data.success ? 'success' : 'failed');
      })
      .catch(() => setState('failed'));
  }, []);

  const message = {
    loading: 'Confirming your payment securely…',
    success: 'Thank you for supporting the Light FM ministry.',
    failed: 'We could not confirm this payment. Please contact us with your Paystack reference.',
  }[state];

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4 text-center">
      <PageHeader title={state === 'success' ? 'Thank you for giving' : 'Payment status'} intro={message} />
      {state !== 'loading' && (
        <Button asChild size="lg">
          <Link href="/get-involved#give">Return to giving</Link>
        </Button>
      )}
    </main>
  );
}
