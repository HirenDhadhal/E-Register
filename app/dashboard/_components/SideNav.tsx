'use client';
import React from 'react';
import Image from 'next/image';
import { GraduationCap, Hand, LayoutIcon, Settings } from 'lucide-react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SideNav = () => {
  const path = usePathname();
  const { user } = useKindeBrowserClient();
  const menuList = [
    {
      id: 1,
      name: 'Dashboard',
      icon: LayoutIcon,
      path: '/dashboard',
    },
    {
      id: 2,
      name: 'Students',
      icon: GraduationCap,
      path: '/dashboard/students',
    },
    {
      id: 3,
      name: 'Attendance',
      icon: Hand,
      path: '/dashboard/attendance',
    },
    {
      id: 4,
      name: 'Settings',
      icon: Settings,
      path: '/dashboard/setting',
    },
  ];
  return (
    <div className='border shadow-md h-screen p-5 hidden md:block'>
      <Image src='/logoipsum.svg' width={180} height={50} alt='logo' />
      <hr className='my-5' />
      {menuList.map((menu, idx) => (
        <Link href={menu.path}>
          <h2
            key={idx}
            className={`flex items-center gap-3 text-md p-4 text-slate-500 
        hover:bg-primary 
        hover:text-white 
        cursor-pointer
        rounded-lg
        ${path == menu.path && 'bg-primary text-white'}`}
          >
            <menu.icon /> {menu.name}
          </h2>
        </Link>
      ))}

      <div className='flex gap-2 items-center bottom-5 fixed p-2'>
        <Image
          src={user?.picture || '/default-user.png'}
          width={35}
          height={35}
          alt='user'
          className='rounded-full'
        />
        <div>
          <h2 className='text-sm font-bold'>
            {user?.given_name} {user?.family_name}
          </h2>
          <h2 className='text-xs text-slate-400'>{user?.email}</h2>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
