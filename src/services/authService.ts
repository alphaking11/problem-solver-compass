
import { toast } from "sonner";
import { auth, db } from './firebaseConfig';

// Dummy user database
const dummyUsers = [
  { email: 'user@example.com', password: 'password123', displayName: 'Demo User' },
  { email: 'test@example.com', password: 'test123', displayName: 'Test User' },
  { email: 'admin@example.com', password: 'admin123', displayName: 'Admin User' },
];

// Mock Firebase User type
type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
};

// Create a new user
export const registerUser = async (email: string, password: string, displayName: string) => {
  try {
    // Check if user already exists
    const existingUser = dummyUsers.find(user => user.email === email);
    if (existingUser) {
      throw new Error('Email already in use');
    }
    
    // Add new user to dummy database
    dummyUsers.push({ email, password, displayName });
    
    // Create mock user object
    const newUser = {
      uid: Math.random().toString(36).substring(2, 15),
      email,
      displayName,
    };
    
    // Update auth.currentUser
    (auth as any).currentUser = newUser;
    
    toast.success("Registration successful!");
    return newUser;
  } catch (error: any) {
    toast.error(`Registration failed: ${error.message}`);
    throw error;
  }
};

// Sign in existing user
export const signIn = async (email: string, password: string) => {
  try {
    // Find user in dummy database
    const user = dummyUsers.find(user => user.email === email && user.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Create mock user object
    const mockUser: User = {
      uid: Math.random().toString(36).substring(2, 15),
      email: user.email,
      displayName: user.displayName,
    };
    
    // Update auth.currentUser
    (auth as any).currentUser = mockUser;
    
    toast.success("Sign in successful!");
    return mockUser;
  } catch (error: any) {
    toast.error(`Sign in failed: ${error.message}`);
    throw error;
  }
};

// Sign out
export const signOut = async () => {
  try {
    // Clear current user
    (auth as any).currentUser = null;
    toast.success("Signed out successfully");
  } catch (error: any) {
    toast.error(`Sign out failed: ${error.message}`);
    throw error;
  }
};

// Get current user 
export const getCurrentUser = (): User | null => {
  return (auth as any).currentUser;
};

// Subscribe to auth state changes
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  // Simulate onAuthStateChanged
  callback((auth as any).currentUser);
  
  // Return unsubscribe function
  return () => {};
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!(auth as any).currentUser;
};
