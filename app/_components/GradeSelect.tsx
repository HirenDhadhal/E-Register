'use client';
import React, { useEffect, useState } from 'react';
import GlobalApi from '../_services/GlobalApi';

const GradeSelect = ({ selectedGrade }) => {
  const [grades, setGrades] = useState([]);
  useEffect(() => {
    GetAllGradeList();
  }, []);

  const GetAllGradeList = () => {
    GlobalApi.GetAllGrades().then((res: { data: any }) => setGrades(res.data));
  };
  return (
    <div>
      <select
        className='p-3 border rounded-lg py-2'
        onChange={(e) => selectedGrade(e.target.value)}
      >
        {grades.map((item, idx) => (
          <option key={idx} value={item.grade}>
            {item.grade}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GradeSelect;
