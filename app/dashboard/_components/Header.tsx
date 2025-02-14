'use client';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import React from 'react';
import Image from 'next/image';

const Header = () => {
  const { user } = useKindeBrowserClient();
  return (
    <div className='p-4 shadow-sm flex justify-between'>
      <div></div>
      <div>
        <Image
          src={user?.picture || '/default-avatar.png'}
          width={35}
          height={35}
          alt='user'
          className='rounded-full'
        />
      </div>
    </div>
  );
};

export default Header;
