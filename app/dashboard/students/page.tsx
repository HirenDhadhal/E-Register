'use client';
import React, { useEffect, useState } from 'react';
import AddNewStudent from './_components/AddNewStudent';
import StudentsListTable from './_components/StudentsListTable';
import GlobalApi from '@/app/_services/GlobalApi';

const Student = () => {
  const [studentList, setStudentList] = useState([]);
  const fetchStudentList = async () => {
    try {
      const response = await GlobalApi.GetAllStudents();
      setStudentList(response.data);
    } catch (error) {
      console.error('Error fetching student list:', error);
    }
  };
  useEffect(() => {
    fetchStudentList();
  }, []);

  return (
    <div className='p-7'>
      <h2 className='font-bold text-2xl flex justify-between items-center'>
        Students <AddNewStudent refreshData={fetchStudentList} />
      </h2>
      <StudentsListTable
        students={studentList}
        refreshData={fetchStudentList}
      />
    </div>
  );
};

export default Student;
