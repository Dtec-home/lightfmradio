import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

const DEFAULT_MINISTRY_EMAIL = 'lcministries254@gmail.com';

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getEmailAddress(name: string, fallback: string): string {
  return process.env[name]?.trim() || fallback;
}

export function createEmailTransport(): Transporter {
  const user = getEmailAddress('SMTP_USER', DEFAULT_MINISTRY_EMAIL);
  const password = process.env.SMTP_PASSWORD?.trim() || process.env.GMAIL_APP_PASSWORD?.trim();

  if (!password) {
    throw new Error('Email delivery is not configured: SMTP_PASSWORD or GMAIL_APP_PASSWORD is required.');
  }

  const host = process.env.SMTP_HOST?.trim();
  if (host) {
    const port = Number(process.env.SMTP_PORT || 587);
    if (!Number.isInteger(port) || port < 1 || port > 65535) {
      throw new Error('Email delivery is not configured: SMTP_PORT must be a valid port.');
    }

    return nodemailer.createTransport({
      host,
      port,
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user, pass: password },
    });
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass: password },
  });
}

export function getEmailAddresses() {
  const from = getEmailAddress('EMAIL_FROM', getEmailAddress('SMTP_USER', DEFAULT_MINISTRY_EMAIL));
  const contactTo = getEmailAddress('CONTACT_EMAIL_TO', DEFAULT_MINISTRY_EMAIL);

  return { from, contactTo };
}
