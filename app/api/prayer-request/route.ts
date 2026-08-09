import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import nodemailer from 'nodemailer';

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
    const { name, contact, request: prayerText, isConfidential } = await request.json();

    const prayerRequest = await prisma.prayerRequest.create({
      data: {
        name,
        contact,
        request: prayerText,
        isConfidential: !!isConfidential,
      },
    });

    // Best-effort notification email — a failure here should not fail the request,
    // since the DB write (the record of the prayer request) is what matters most.
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'lcministries254@gmail.com',
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: 'lcministries254@gmail.com',
        to: 'lcministries254@gmail.com',
        subject: `New Prayer Request from ${name}`,
        html: `
          <h3>New Prayer Request</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Contact:</strong> ${contact}</p>
          <p><strong>Confidential:</strong> ${isConfidential ? 'Yes' : 'No'}</p>
          <p><strong>Request:</strong></p>
          <p>${String(prayerText).replace(/\n/g, '<br>')}</p>
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
