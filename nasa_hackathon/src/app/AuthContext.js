import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from './firebase';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const isLoggedIn = user !== null; // Determine if the user is logged in

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };

    const logOut = () => {
        signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("Current user:", currentUser); // Debugging line
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []); // Removed user from dependency array

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, googleSignIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};

export const useAuth = () => {
    return useContext(AuthContext);
};
