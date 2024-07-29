import mongoose, { Schema } from 'mongoose';
import autoIncrement from 'mongoose-sequence';

const AutoIncrement = autoIncrement(mongoose);

const gradeSchema = new Schema({
  id: { type: Number, required: true },
  grade: { type: String, required: true },
});

const studentSchema = new Schema({
  Sid: { type: Number, unique: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  grade: { type: String, required: true },
});

if (!mongoose.models.Student) {
  studentSchema.plugin(AutoIncrement, { inc_field: 'Sid' });
}

const attendanceSchema = new Schema({
  Aid: { type: Number },
  studentId: { type: Number },
  present: { type: Boolean, required: true, default: false },
  day: { type: Number, required: true },
  month: { type: String, required: true },
});

if (!mongoose.models.Attendance) {
  attendanceSchema.plugin(AutoIncrement, { inc_field: 'Aid' });
}

const Grade = mongoose.models.Grade || mongoose.model('Grade', gradeSchema);
const Student =
  mongoose.models.Student || mongoose.model('Student', studentSchema);
const Attendance =
  mongoose.models.Attendance || mongoose.model('Attendance', attendanceSchema);

export { Grade, Student, Attendance };
