import mongoose, { Schema } from 'mongoose';

const gradeSchema = new Schema({
  id: { type: Number, required: true },
  grade: { type: String, required: true },
});

const Grade = mongoose.models.Grade || mongoose.model('Grade', gradeSchema);

export default Grade;
