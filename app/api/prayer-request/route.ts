import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { z } from 'zod';
import { createEmailTransport, escapeHtml, getEmailAddresses } from '@/lib/email';

const prayerRequestSchema = z.object({
  name: z.string().trim().min(2).max(100),
  contact: z.string().trim().min(3).max(254),
  request: z.string().trim().min(10).max(5000),
  isConfidential: z.boolean().optional(),
});

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const prayerRequests = await prisma.prayerRequest.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(prayerRequests);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch prayer requests' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const input = prayerRequestSchema.safeParse(await request.json());
    if (!input.success) {
      return NextResponse.json({ error: 'Please check the form fields and try again.' }, { status: 400 });
    }

    const { name, contact, request: prayerText, isConfidential = false } = input.data;

    const prayerRequest = await prisma.prayerRequest.create({
      data: {
        name,
        contact,
        request: prayerText,
        isConfidential: !!isConfidential,
      },
    });

    try {
      const transporter = createEmailTransport();
      const { from, contactTo } = getEmailAddresses();

      await transporter.sendMail({
        from,
        to: contactTo,
        subject: `New Prayer Request from ${name}`,
        html: `
          <h3>New Prayer Request</h3>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Contact:</strong> ${escapeHtml(contact)}</p>
          <p><strong>Confidential:</strong> ${isConfidential ? 'Yes' : 'No'}</p>
          <p><strong>Request:</strong></p>
          <p>${escapeHtml(prayerText).replace(/\n/g, '<br>')}</p>
        `,
      });
    } catch (emailError) {
      console.error('Prayer request notification email error:', emailError);
    }

    return NextResponse.json(prayerRequest);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create prayer request' }, { status: 500 });
  }
}
