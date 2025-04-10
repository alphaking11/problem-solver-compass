
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  LayoutDashboard, 
  Code, 
  User, 
  Calendar, 
  LogOut 
} from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex flex-col h-screen border-r bg-card">
      <div className="p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-leetcode-primary flex items-center justify-center">
            <Code size={18} className="text-white" />
          </div>
          <span className="font-semibold text-lg">ProblemSolver</span>
        </div>
      </div>
      <div className="flex-1 px-3 py-4 space-y-2">
        <Link to="/">
          <Button 
            variant={isActive('/') ? "default" : "ghost"} 
            className="w-full justify-start gap-2"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Button>
        </Link>
        <Link to="/problems">
          <Button 
            variant={isActive('/problems') ? "default" : "ghost"} 
            className="w-full justify-start gap-2"
          >
            <Code size={18} />
            Problems
          </Button>
        </Link>
        <Link to="/profile">
          <Button 
            variant={isActive('/profile') ? "default" : "ghost"} 
            className="w-full justify-start gap-2"
          >
            <User size={18} />
            Profile
          </Button>
        </Link>
      </div>
      <div className="p-4 border-t">
        <div className="flex items-center gap-3 mb-4">
          <Avatar>
            <AvatarFallback className="bg-leetcode-primary text-white">JS</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">John Smith</p>
            <p className="text-xs text-muted-foreground">johnsmith@example.com</p>
          </div>
        </div>
        <Button variant="outline" className="w-full justify-start gap-2">
          <LogOut size={18} />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
