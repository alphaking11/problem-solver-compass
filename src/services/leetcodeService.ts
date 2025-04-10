
import { auth, db } from './firebaseConfig';
import { collection, doc, setDoc, getDoc, query, where, getDocs, updateDoc, arrayUnion } from 'firebase/firestore';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Problem {
  id: number;
  title: string;
  titleSlug: string;
  difficulty: Difficulty;
  tags: string[];
  status: 'Solved' | 'Attempted' | 'Todo';
  lastAttemptDate?: string;
  solvedDate?: string;
  notes?: string;
  timeSpent?: number; // in minutes
}

export interface UserStats {
  easy: {
    solved: number;
    total: number;
  };
  medium: {
    solved: number;
    total: number;
  };
  hard: {
    solved: number;
    total: number;
  };
  totalSolved: number;
  totalProblems: number;
  streak: number;
  lastSolvedDate?: string;
}

// Mock data for initial development - replace with actual API calls
export const fetchMockUserStats = (): UserStats => {
  return {
    easy: { solved: 45, total: 650 },
    medium: { solved: 28, total: 1450 },
    hard: { solved: 12, total: 600 },
    totalSolved: 85,
    totalProblems: 2700,
    streak: 7,
    lastSolvedDate: new Date().toISOString().split('T')[0]
  };
};

export const fetchMockProblems = (): Problem[] => {
  return [
    {
      id: 1,
      title: "Two Sum",
      titleSlug: "two-sum",
      difficulty: "Easy",
      tags: ["Array", "Hash Table"],
      status: "Solved",
      solvedDate: "2024-04-05",
      notes: "Used a hash map to store values and their indices.",
      timeSpent: 15
    },
    {
      id: 3,
      title: "Longest Substring Without Repeating Characters",
      titleSlug: "longest-substring-without-repeating-characters",
      difficulty: "Medium",
      tags: ["String", "Sliding Window"],
      status: "Solved",
      solvedDate: "2024-04-03",
      notes: "Used sliding window technique.",
      timeSpent: 25
    },
    {
      id: 4,
      title: "Median of Two Sorted Arrays",
      titleSlug: "median-of-two-sorted-arrays",
      difficulty: "Hard",
      tags: ["Array", "Binary Search"],
      status: "Attempted",
      lastAttemptDate: "2024-04-01",
    },
    {
      id: 20,
      title: "Valid Parentheses",
      titleSlug: "valid-parentheses",
      difficulty: "Easy",
      tags: ["Stack", "String"],
      status: "Todo"
    },
    {
      id: 53,
      title: "Maximum Subarray",
      titleSlug: "maximum-subarray",
      difficulty: "Medium",
      tags: ["Array", "Dynamic Programming"],
      status: "Solved",
      solvedDate: "2024-04-07",
      notes: "Used Kadane's algorithm for optimal solution.",
      timeSpent: 20
    },
    {
      id: 146,
      title: "LRU Cache",
      titleSlug: "lru-cache",
      difficulty: "Medium",
      tags: ["Hash Table", "Linked List", "Design"],
      status: "Todo"
    }
  ];
};

// User profile operations
export const getUserProfile = async (userId: string) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.log("No user profile found");
      return null;
    }
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};

export const saveUserProfile = async (userId: string, data: any) => {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, data, { merge: true });
  } catch (error) {
    console.error("Error saving user profile:", error);
    throw error;
  }
};

// Problem tracking operations
export const saveUserProblem = async (userId: string, problem: Problem) => {
  try {
    const problemRef = doc(db, "users", userId, "problems", String(problem.id));
    await setDoc(problemRef, problem);
  } catch (error) {
    console.error("Error saving problem data:", error);
    throw error;
  }
};

export const getUserProblems = async (userId: string) => {
  try {
    const problemsRef = collection(db, "users", userId, "problems");
    const problemsSnap = await getDocs(problemsRef);
    
    const problems: Problem[] = [];
    problemsSnap.forEach((doc) => {
      problems.push(doc.data() as Problem);
    });
    
    return problems;
  } catch (error) {
    console.error("Error getting user problems:", error);
    throw error;
  }
};

// For development and demo purposes
export const getProblems = (): Promise<Problem[]> => {
  return Promise.resolve(fetchMockProblems());
};

export const getUserStats = (): Promise<UserStats> => {
  return Promise.resolve(fetchMockUserStats());
};
