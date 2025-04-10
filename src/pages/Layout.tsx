
import React from 'react';
import Navbar from '@/components/Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-64 h-screen fixed">
        <Navbar />
      </div>
      <div className="flex-1 ml-64">
        <main className="container py-8">
          {children}
        </main>
      </div>
    </div>
  );
};
