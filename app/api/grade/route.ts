import { Grade } from '@/app/_models/mongoDBSchema';
import { connectToDB } from '@/lib/mongoDB';
import { NextResponse } from 'next/server';

// GET handler for fetching all grades
export async function GET() {
  await connectToDB();

  try {
    const grades = await Grade.find({});
    return NextResponse.json(grades);
  } catch (err) {
    return NextResponse.json({ message: err });
  }
}
