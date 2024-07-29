const { default: axios } = require('axios');

const GetAllGrades = () => axios.get('/api/grade');
const CreateNewStudent = (data: any) => axios.post('/api/student', data);
const GetAllStudents = () => axios.get('/api/student');
const DeleteStudent = (id) => axios.delete('/api/student?id=' + id);
const GetAttendance = () => axios.get('/api/attendance');
const MarkAttendance = (data: any) => axios.post('/api/attendance', data);

export default {
  GetAllGrades,
  CreateNewStudent,
  GetAllStudents,
  DeleteStudent,
  GetAttendance,
  MarkAttendance,
};
