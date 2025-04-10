import { auth, db } from './firebaseConfig';
import { toast } from "sonner";

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

// Mock data for when no real data is available yet
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

// Mock timestamp function
const mockServerTimestamp = () => new Date().toISOString();

// User profile operations
export const getUserProfile = async (userId: string) => {
  try {
    const userDoc = await db.collection('users').doc(userId).get();
    
    if (userDoc.exists) {
      return userDoc.data();
    } else {
      console.log("No user profile found");
      return null;
    }
  } catch (error: any) {
    console.error("Error getting user profile:", error);
    toast.error(`Failed to get user profile: ${error.message}`);
    throw error;
  }
};

export const saveUserProfile = async (userId: string, data: any) => {
  try {
    await db.collection('users').doc(userId).set(data);
    toast.success("Profile saved successfully");
  } catch (error: any) {
    console.error("Error saving user profile:", error);
    toast.error(`Failed to save profile: ${error.message}`);
    throw error;
  }
};

// Problem tracking operations
export const saveUserProblem = async (userId: string, problem: Problem) => {
  try {
    // Mock document reference
    await db.collection('users').doc(userId).collection('problems').doc(String(problem.id)).set({
      ...problem,
      updatedAt: mockServerTimestamp()
    });
    
    // Update stats if problem is solved
    if (problem.status === 'Solved') {
      await updateUserStats(userId, problem);
    }
    
    toast.success(`Problem "${problem.title}" saved successfully`);
  } catch (error: any) {
    console.error("Error saving problem data:", error);
    toast.error(`Failed to save problem: ${error.message}`);
    throw error;
  }
};

export const deleteUserProblem = async (userId: string, problemId: number) => {
  try {
    // For our mock implementation, we'll just log the action
    console.log(`Deleting problem ${problemId} for user ${userId}`);
    toast.success("Problem deleted successfully");
  } catch (error: any) {
    console.error("Error deleting problem:", error);
    toast.error(`Failed to delete problem: ${error.message}`);
    throw error;
  }
};

export const getUserProblems = async (userId: string) => {
  try {
    // For our mock implementation, we'll return mock problems
    return fetchMockProblems();
  } catch (error: any) {
    console.error("Error getting user problems:", error);
    toast.error(`Failed to load problems: ${error.message}`);
    throw error;
  }
};

// Get real user stats from database
export const getUserStatsFromDB = async (userId: string): Promise<UserStats> => {
  try {
    const userDoc = await db.collection('users').doc(userId).get();
    
    if (userDoc.exists && userDoc.data().stats) {
      return userDoc.data().stats as UserStats;
    } else {
      // If no stats exist, create default stats
      const defaultStats = fetchMockUserStats();
      await db.collection('users').doc(userId).set({ stats: defaultStats }, { merge: true });
      return defaultStats;
    }
  } catch (error: any) {
    console.error("Error getting user stats:", error);
    toast.error(`Failed to load statistics: ${error.message}`);
    throw error;
  }
};

// Update user stats when a problem is solved
const updateUserStats = async (userId: string, problem: Problem) => {
  try {
    const userDoc = await db.collection('users').doc(userId).get();
    
    if (userDoc.exists) {
      const userData = userDoc.data();
      const stats = userData.stats || fetchMockUserStats();
      
      // Only count if this is a new solved problem
      if (!problem.solvedDate || new Date(problem.solvedDate).toDateString() !== new Date().toDateString()) {
        // Update based on difficulty
        if (problem.difficulty === 'Easy') {
          stats.easy.solved += 1;
        } else if (problem.difficulty === 'Medium') {
          stats.medium.solved += 1;
        } else if (problem.difficulty === 'Hard') {
          stats.hard.solved += 1;
        }
        
        stats.totalSolved += 1;
        
        // Update streak logic
        const today = new Date().toISOString().split('T')[0];
        const lastSolvedDate = stats.lastSolvedDate;
        
        if (lastSolvedDate) {
          const lastDate = new Date(lastSolvedDate);
          const currentDate = new Date(today);
          
          // Calculate days between
          const timeDiff = currentDate.getTime() - lastDate.getTime();
          const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
          
          if (daysDiff === 1) {
            // Consecutive day, increase streak
            stats.streak += 1;
          } else if (daysDiff > 1) {
            // Broke the streak, reset to 1
            stats.streak = 1;
          }
          // If daysDiff is 0, it's the same day, don't change streak
        } else {
          // First time solving, set streak to 1
          stats.streak = 1;
        }
        
        stats.lastSolvedDate = today;
        
        // Update the stats in the document
        await db.collection('users').doc(userId).set({ stats }, { merge: true });
      }
    }
  } catch (error) {
    console.error("Error updating user stats:", error);
  }
};

// For real usage with mock Firebase auth
export const getProblems = async (): Promise<Problem[]> => {
  const user = auth.currentUser;
  if (user) {
    try {
      return await getUserProblems(user.uid);
    } catch (error) {
      console.error("Error fetching problems:", error);
      return fetchMockProblems();
    }
  } else {
    return fetchMockProblems();
  }
};

export const getUserStats = async (): Promise<UserStats> => {
  const user = auth.currentUser;
  if (user) {
    try {
      return await getUserStatsFromDB(user.uid);
    } catch (error) {
      console.error("Error fetching user stats:", error);
      return fetchMockUserStats();
    }
  } else {
    return fetchMockUserStats();
  }
};
