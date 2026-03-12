import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  try {
    const shows = await prisma.show.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(shows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch shows' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const show = await prisma.show.create({ data });
    return NextResponse.json(show);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create show' }, { status: 500 });
  }
}
