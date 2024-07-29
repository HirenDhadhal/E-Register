import { Student } from '@/app/_models/mongoDBSchema';
import { connectToDB } from '@/lib/mongoDB';
import { NextResponse } from 'next/server';

export async function POST(request: {
  json: () =>
    | PromiseLike<{ name: any; grade: any; address: any; contact: any }>
    | { name: String; grade: String; address: String; contact: String };
}) {
  await connectToDB();
  const { name, grade, address, contact } = await request.json();
  await Student.create({ name, grade, address, contact });

  try {
    return NextResponse.json({
      message: 'Student has been added successfully',
    });
  } catch (err) {
    return NextResponse.json({ message: err });
  }
}

export async function GET() {
  await connectToDB();

  try {
    const students = await Student.find({});
    return NextResponse.json(students);
  } catch (err) {
    return NextResponse.json({ message: err });
  }
}

export async function DELETE(req) {
  await connectToDB();
  const searchParams = new URL(req.url).searchParams;
  const id = searchParams.get('id');

  try {
    const deletedStudent = await Student.findOneAndDelete({
      Sid: parseInt(id),
    });
    if (!deletedStudent) {
      return NextResponse.json(
        { message: 'Student not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: 'Student deleted successfully' });
  } catch (err) {
    console.error('Error deleting student:', err);
    return NextResponse.json(
      { message: 'Error deleting student' },
      { status: 500 }
    );
  }
}
