import Grade from '@/app/_models/mongoDBSchema';
import { connectToDB } from '@/lib/mongoDB';
import { NextResponse } from 'next/server';

export async function POST(request: {
  json: () =>
    | PromiseLike<{ id: any; grade: any }>
    | { id: Number; grade: String };
}) {
  await connectToDB();
  const { id, grade } = await request.json();
  await Grade.create({ id, grade });

  try {
    return NextResponse.json({
      message: 'Grade has been created successfully',
    });
  } catch (err) {
    return NextResponse.json({ message: err });
  }
}
