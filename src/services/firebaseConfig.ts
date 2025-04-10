
// This is a dummy Firebase configuration for development
// In a real app, you would use actual Firebase credentials

// Mock database store to simulate persistence between operations
const mockStore: Record<string, any> = {
  users: {}
};

// Mock Firebase app
const app = {
  name: 'dummy-firebase-app',
};

// Mock Firebase auth
export const auth = {
  currentUser: null,
  onAuthStateChanged: (callback: Function) => {
    callback(auth.currentUser);
    // Return an unsubscribe function
    return () => {};
  },
};

// Helper for mock collection functionality
const createMockCollection = (collectionPath: string) => {
  // Ensure the collection exists in our mock store
  if (!mockStore[collectionPath]) {
    mockStore[collectionPath] = {};
  }
  
  return {
    doc: (docId: string) => {
      return {
        collection: (subCollectionPath: string) => createMockCollection(`${collectionPath}/${docId}/${subCollectionPath}`),
        get: async () => {
          const data = mockStore[collectionPath][docId];
          return {
            exists: !!data,
            data: () => data || {},
          };
        },
        set: async (data: any, options?: { merge?: boolean }) => {
          if (options?.merge && mockStore[collectionPath][docId]) {
            mockStore[collectionPath][docId] = {
              ...mockStore[collectionPath][docId],
              ...data
            };
          } else {
            mockStore[collectionPath][docId] = data;
          }
        },
      };
    },
  };
};

// Mock Firestore database
export const db = {
  collection: (collectionPath: string) => createMockCollection(collectionPath),
};

export default app;
