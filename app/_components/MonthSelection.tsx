'use client';
import React, { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarDays } from 'lucide-react';
import moment from 'moment';
import { addMonths } from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Button } from '@/components/ui/button';

const MonthSelection = ({ selectedMonth }) => {
  const nextMonth = addMonths(new Date(), 0);
  const [month, setMonth] = useState(nextMonth);
  const handleMonthClick = (date) => {
    const newDate = new Date(date.getFullYear(), date.getMonth(), 1);
    setMonth(newDate);
    selectedMonth(newDate);
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className='flex gap-2 items-center text-slate-500'
          >
            {' '}
            <CalendarDays className='h-5 w-5' />{' '}
            {moment(month).format('MMM YYYY')}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          {' '}
          {/* <Calendar
            mode='single'
            month={month}
            onMonthChange={(val) => {
              selectedMonth(val);
              setMonth(val);
            }}
            className='flex flex-1 justify-center'
          /> */}
          {/* <DayPicker
              selected={month}
              onChange={(date) => {
                setMonth(date);
                selectedMonth(date);
              }}
              dateFormat='MMMM yyyy'
              showMonthYearPicker
              inline
              toYear={'2023'}
              fromYear={'2023'}
            /> */}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MonthSelection;
