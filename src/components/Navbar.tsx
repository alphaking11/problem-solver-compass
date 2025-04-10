
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ListChecks, User, LogOut } from 'lucide-react';
import { signOut } from '@/services/authService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 p-4">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-center">Problem Solver Compass</h1>
        {currentUser && (
          <p className="text-sm text-center text-muted-foreground mt-1">
            Welcome, {currentUser.displayName || 'User'}
          </p>
        )}
      </div>
      
      <nav className="space-y-2 flex-1">
        <Link
          to="/"
          className={`flex items-center gap-2 p-2 rounded-md hover:bg-primary/10 transition-colors ${
            isActive('/') ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground'
          }`}
        >
          <Home size={18} />
          <span>Dashboard</span>
        </Link>
        <Link
          to="/problems"
          className={`flex items-center gap-2 p-2 rounded-md hover:bg-primary/10 transition-colors ${
            isActive('/problems') ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground'
          }`}
        >
          <ListChecks size={18} />
          <span>Problems</span>
        </Link>
        <Link
          to="/profile"
          className={`flex items-center gap-2 p-2 rounded-md hover:bg-primary/10 transition-colors ${
            isActive('/profile') ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground'
          }`}
        >
          <User size={18} />
          <span>Profile</span>
        </Link>
      </nav>
      
      <div className="mt-auto">
        {currentUser && (
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={handleSignOut}
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
