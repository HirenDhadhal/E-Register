'use client';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useForm, SubmitHandler } from 'react-hook-form';
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';

type Inputs = {
  name: string;
  address: string;
  contact: string;
  grade: string;
};

interface FormData {
  name: string;
  address: string;
  grade: string;
  contact: string;
  // Add other form fields here as needed
}

const AddNewStudent = ({ refreshData }) => {
  const [open, setOpen] = useState(false);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  useEffect(() => {
    GetAllGradeList();
  }, []);

  const GetAllGradeList = () => {
    GlobalApi.GetAllGrades().then(
      (res: { data: any }) => setGrades(res.data)
      // console.log(res.data);
    );
  };

  const onsubmit: SubmitHandler<FormData> = (data) => {
    setLoading(true);
    GlobalApi.CreateNewStudent(data)
      .then((res) => {
        console.log('Response:', res);
        refreshData();
        toast('New Student Added');
      })
      .catch((err) => {
        console.error('Error adding student:', err);
        toast('Failed to add student', { type: 'error' });
      });
    setLoading(false);
    reset();
  };

  return (
    <div>
      {' '}
      <Button onClick={() => setOpen(true)}>+ Add New Student</Button>
      <Dialog open={open}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit(onsubmit)}>
                <div className='py-3'>
                  <label>Full Name</label>
                  <Input
                    placeholder='Ex. John Carry'
                    {...register('name', { required: true })}
                  />
                </div>
                <div className='flex flex-col'>
                  <label>Select Grade</label>
                  <select
                    className='p-3 border rounded-lg py-2'
                    {...register('grade', { required: true })}
                  >
                    {grades.map((item, idx) => (
                      <option key={idx} value={item.grade}>
                        {item.grade}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='py-3'>
                  <label>Contact Number</label>
                  <Input
                    type='number'
                    placeholder='Ex. 9876543210'
                    {...register('contact', { required: true })}
                  />
                </div>
                <div className='py-3'>
                  <label>Address</label>
                  <Input
                    placeholder='Ex. 219, Bakers Street'
                    {...register('address', { required: true })}
                  />
                </div>
                <div className='flex gap-3 items-center justify-end mt-5'>
                  <Button
                    type='submit'
                    disabled={loading}
                    onClick={() => {
                      setOpen(false);
                      console.log('Saved');
                    }}
                  >
                    {loading ? <Loader className='animate-spin' /> : 'Save'}
                  </Button>
                  <Button
                    disabled={loading}
                    variant='ghost'
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewStudent;
