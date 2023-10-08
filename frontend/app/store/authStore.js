import create from 'zustand';
import {devtools, persist} from "zustand/middleware";

const authStore = (set) => ({
    isAuthenticated: false,
    user: null,
    token: null,

    login: (userData, token) => set({
        isAuthenticated: true,
        user: userData,
        token: token
    }),
    logout: () => set({ isAuthenticated: false, user: null, token: null })
});

const useAuthStore = create(
    devtools(
        persist(authStore, {
            name: 'Authentication'
        })
    )
)

export default useAuthStore;
