import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { cn } from '../../lib/utils';

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-bg">
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)} 
      />

      {/* Main content */}
      <div 
        className={cn(
          'flex flex-1 flex-col overflow-hidden transition-all duration-300 ease-in-out',
          isSidebarOpen ? 'lg:ml-[260px]' : 'lg:ml-[80px]'
        )}
      >
        <Topbar 
          onMenuClick={() => setIsMobileOpen(true)}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-bg p-4 md:p-6 lg:p-8 page-enter-active">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
