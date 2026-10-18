import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createEmailTransport, escapeHtml, getEmailAddresses } from '@/lib/email';

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().min(1).max(200),
  category: z.string().trim().min(1).max(80),
  message: z.string().trim().min(10).max(5000),
});

export async function POST(request: NextRequest) {
  try {
    const input = contactSchema.safeParse(await request.json());
    if (!input.success) {
      return NextResponse.json({ error: 'Please check the form fields and try again.' }, { status: 400 });
    }

    const { name, email, subject, category, message } = input.data;
    const { from, contactTo } = getEmailAddresses();
    const transporter = createEmailTransport();

    await transporter.sendMail({
      from,
      to: contactTo,
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Category:</strong> ${escapeHtml(category)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact email delivery error:', error);
    return NextResponse.json({ error: 'We could not send your message right now. Please try again later.' }, { status: 503 });
  }
}
