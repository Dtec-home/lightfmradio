'use client';

import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

const SUGGESTED_AMOUNTS = [500, 1000, 2500, 5000];

export function GivingForm() {
  const [amount, setAmount] = useState('1000');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function startPayment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/paystack/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, amount: Number(amount) }),
      });
      const data = await response.json();

      if (!response.ok || !data.authorizationUrl) {
        throw new Error(data.error ?? 'Unable to start payment');
      }

      window.location.assign(data.authorizationUrl);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unable to start payment');
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={startPayment} className="mt-8 max-w-xl">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="giving-email">Email receipt</FieldLabel>
          <Input
            id="giving-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="giving-amount">Amount (KES)</FieldLabel>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {SUGGESTED_AMOUNTS.map((suggestedAmount) => (
              <Button
                key={suggestedAmount}
                type="button"
                variant={amount === String(suggestedAmount) ? 'default' : 'outline'}
                onClick={() => setAmount(String(suggestedAmount))}
              >
                KES {suggestedAmount.toLocaleString()}
              </Button>
            ))}
          </div>
          <Input
            id="giving-amount"
            type="number"
            min="1"
            step="1"
            required
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="mt-2"
          />
        </Field>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button type="submit" size="lg" disabled={isSubmitting} className="h-12 sm:self-start sm:px-8">
          {isSubmitting ? 'Opening secure checkout…' : 'Give securely with Paystack'}
        </Button>
      </FieldGroup>
    </form>
  );
}
