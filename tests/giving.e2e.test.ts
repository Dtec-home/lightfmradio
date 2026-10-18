import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

const baseUrl = process.env.E2E_BASE_URL ?? 'http://localhost:3000';

describe('giving page', () => {
  it('renders the Paystack giving flow', async () => {
    const response = await fetch(`${baseUrl}/get-involved`);
    const html = await response.text();

    assert.equal(response.status, 200);
    assert.match(html, /Give securely with Paystack/);
  });
});
