import React, { ReactNode } from 'react';
import SideNav from './_components/SideNav';
import Header from './_components/Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <div className='md:w-64 fixed md: block'>
        <SideNav />
      </div>
      <Header />
      <div className='md:ml-64'>{children}</div>
    </div>
  );
};

export default Layout;
