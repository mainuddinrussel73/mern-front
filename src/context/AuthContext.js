import React, { createContext, useState, useEffect } from 'react';
import { signOut,getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
// Create the context
export const AuthContext = createContext();

// Create the context provider component
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(null); // Store user role here

    useEffect(() => {
        const auth = getAuth();

        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, async (user) =>  {
            
            setCurrentUser(user); // Set the logged-in user
            if (user) {
                // Fetch role from backend or set manually
                console.log(user);
                try{
                const token = await user.getIdToken();
                const response = await axios.get(`http://localhost:5000/api/auth/user/${user.uid}`, {
                  headers: { Authorization: `Bearer ${token}` },
                });
                setUserRole(response.data._user.role); // Assuming role is in the response

                }catch(err){
                    console.log(err);
                }
            } else {
                setUserRole(null);
            }
            setLoading(false); // Stop loading once user is determined
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator
    }

     // Logout function
    const logout = async () => {
        const auth = getAuth();
        await signOut(auth);
        setCurrentUser(null); // Clear the user from the state
    };
    // Provide the user state and a way to update it to the children components
    return (
        <AuthContext.Provider value={{ currentUser, setUserRole, userRole, setCurrentUser,logout }}>
            {!loading && children} 
        </AuthContext.Provider>
    );
};
