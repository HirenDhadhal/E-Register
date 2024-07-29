'use client';
import MonthSelection from '@/app/_components/MonthSelection';
import React, { useEffect, useState } from 'react';
import GradeSelect from '@/app/_components/GradeSelect';
import { Button } from '@/components/ui/button';
import GlobalApi from '@/app/_services/GlobalApi';

const Attendance = () => {
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState();
  const onSearchHandler = () => {
    const newDate = new Date();
    setSelectedMonth(newDate);
    console.log(selectedGrade, ' ', selectedMonth);
  };

  const loadAttendance = async () => {
    try {
      const responseData = await GlobalApi.GetAttendance();
      console.log(responseData);
    } catch (error) {
      console.error('Attendance Fetching Error: ', error);
    }
  };
  useEffect(() => {
    loadAttendance();
    console.log('UseEffect in Attendance compoenent');
  }, []);
  return (
    <div className='p-10'>
      {' '}
      <h2 className='text-2xl font-bold'>Attendance</h2>
      <div className='flex gap-5 p-5 border rounded-lg'>
        <div className='flex gap-2 items-center my-5'>
          <label>Select Month:</label>
          <MonthSelection />
        </div>
        <div className='flex gap-2 items-center my-5'>
          <label>Select Grade:</label>
          <GradeSelect selectedGrade={(val) => setSelectedGrade(val)} />
        </div>
      </div>
      <Button onClick={() => onSearchHandler()}>Search</Button>
      {/* Student Attendance Grid */}
    </div>
  );
};

export default Attendance;
