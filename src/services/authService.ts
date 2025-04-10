
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  updateProfile,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth, db } from './firebaseConfig';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from "sonner";

// Create a new user
export const registerUser = async (email: string, password: string, displayName: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update profile with display name
    await updateProfile(userCredential.user, { displayName });
    
    // Initialize user document in Firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      email,
      displayName,
      createdAt: serverTimestamp(),
      stats: {
        easy: { solved: 0, total: 650 },
        medium: { solved: 0, total: 1450 },
        hard: { solved: 0, total: 600 },
        totalSolved: 0,
        totalProblems: 2700,
        streak: 0,
        lastSolvedDate: null
      }
    });
    
    toast.success("Registration successful!");
    return userCredential.user;
  } catch (error: any) {
    toast.error(`Registration failed: ${error.message}`);
    throw error;
  }
};

// Sign in existing user
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    toast.success("Sign in successful!");
    return userCredential.user;
  } catch (error: any) {
    toast.error(`Sign in failed: ${error.message}`);
    throw error;
  }
};

// Sign out
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    toast.success("Signed out successfully");
  } catch (error: any) {
    toast.error(`Sign out failed: ${error.message}`);
    throw error;
  }
};

// Get current user 
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Subscribe to auth state changes
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!auth.currentUser;
};
