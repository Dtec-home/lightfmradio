import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const { isAnswered } = await request.json();

    const prayerRequest = await prisma.prayerRequest.update({
      where: { id },
      data: { isAnswered: !!isAnswered },
    });

    return NextResponse.json(prayerRequest);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update prayer request' }, { status: 500 });
  }
}
