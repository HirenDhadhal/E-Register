import { connectToDB } from '@/lib/mongoDB';
import { NextResponse } from 'next/server';
import { Attendance, Student } from '@/app/_models/mongoDBSchema';

export async function GET(req) {
  await connectToDB();

  const searchParams = req.nextUrl.searchParams;
  const grade = searchParams.get('grade');
  const month = searchParams.get('month');

  console.log('Grade: ' + grade + ' month: ' + month);

  try {
    const studentAttendanceData = await Student.aggregate([
      {
        $lookup: {
          from: 'attendances', // Name of the attendance collection
          localField: 'Sid', // Field from the Student collection
          foreignField: 'studentId', // Field from the Attendance collection
          as: 'attendanceRecords', // Alias for the joined data
        },
      },
      {
        $unwind: {
          path: '$attendanceRecords', // Unwind the joined array
          preserveNullAndEmptyArrays: false, // Dont Keep students with no attendance records
        },
      },
      {
        $match: {
          'attendanceRecords.month': month,
          grade: grade,
        },
      },
    ]);

    // console.log('Data before filtering:', studentAttendanceData);

    // const filteredData = studentAttendanceData.filter(
    //   (student) =>
    //     student.attendanceRecords.month === month && student.grade === grade
    // );

    // console.log('Filtered Data:', filteredData);
    return NextResponse.json(studentAttendanceData);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

export async function POST(request) {
  await connectToDB();
  const { studentId, day, month, present } = await request.json();
  await Attendance.create({ studentId, present, day, month });

  try {
    return NextResponse.json({ message: 'Attedance added successfully' });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
