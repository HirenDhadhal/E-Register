'use client';
import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { Button } from '@/components/ui/button';
import { Search, Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];

interface Student {
  id: number;
  name: string;
  address: string;
  contact: string;
  grade: string;
}

interface StudentListProps {
  students: Student[];
  refreshData: () => void;
}

const StudentsListTable: React.FC<StudentListProps> = ({
  students,
  refreshData,
}) => {
  const deleteRecord = (id: number) => {
    GlobalApi.DeleteStudent(id)
      .then((resp) => {
        if (resp) {
          toast('Student Deleted Successfully');
          refreshData();
        }
      })
      .catch((error) => {
        console.error('Error deleting student:', error);
      });
  };

  const CustomButton = (props: any) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant='destructive'>
            <Trash />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              user and remove data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteRecord(props.data.Sid)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  const [colData] = useState([
    { field: 'grade', filter: true },
    { field: 'name', filter: true },
    { field: 'address', filter: true },
    { field: 'contact', filter: true },
    { field: 'action', cellRenderer: CustomButton },
  ]);

  const [rowData, setRowData] = useState<Student[]>([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    setRowData(students);
  }, [students]);

  return (
    <div className='my-7'>
      <div className='ag-theme-quartz' style={{ height: 500 }}>
        <div className='p-2 flex gap-2 rounded-lg border shadow-sm mb-4 max-w-sm'>
          <Search />
          <input
            type='text'
            placeholder='Search on Anything'
            className='outline-none w-full'
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <AgGridReact
          rowData={rowData}
          columnDefs={colData}
          pagination={pagination}
          quickFilterText={searchInput}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </div>
  );
};

export default StudentsListTable;
