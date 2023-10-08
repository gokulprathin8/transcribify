import create from 'zustand';

const useAuthStore = create((set) => ({
    isAuthenticated: false,      // To keep track of authentication status.
    user: null,                  // To store user data (e.g., user id, email).
    token: null,                 // To store the JWT or any auth token.
    
    // Method to update the store when a user logs in.
    login: (userData, token) => set({
        isAuthenticated: true,
        user: userData,
        token: token
    }),
    
    // Method to reset the store when a user logs out.
    logout: () => set({ isAuthenticated: false, user: null, token: null })
}));

export default useAuthStore;
