import { prisma } from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await prisma.users.findMany();
  return NextResponse.json(users);
}
