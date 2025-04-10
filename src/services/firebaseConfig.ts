
// This is a dummy Firebase configuration for development
// In a real app, you would use actual Firebase credentials

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

// Mock Firestore database
export const db = {
  collection: () => ({
    doc: () => ({
      get: async () => ({
        exists: true,
        data: () => ({}),
      }),
      set: async () => {},
    }),
  }),
};

export default app;
