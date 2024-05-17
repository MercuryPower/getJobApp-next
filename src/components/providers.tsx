'use client'

import {ThemeProvider} from "next-themes";
import React, {createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext<{
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    user: {id: number, username:string, email: string}| null;
}>({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    user: null
});
export default function Providers({children}:{children:React.ReactNode}){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user ,setUser] = useState<{id: number, username:string, email: string;} | null >(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const user_response = await fetch('http://127.0.0.1:8000/users/me', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    next:{revalidate:3600}
                });
                const responseData = await user_response.json();

                if (user_response.ok) {
                    setIsLoggedIn(true);
                    setUser(responseData);
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            } catch (error) {
                setIsLoggedIn(false);
                setUser(null);
                throw new Error((error as Error).message);
            }
        };
        void fetchData();
        return () => {
        };
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user }}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </AuthContext.Provider>
    )

}
export const useAuth = () => useContext(AuthContext);