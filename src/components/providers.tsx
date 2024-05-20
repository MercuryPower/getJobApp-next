'use client'

import {ThemeProvider} from "next-themes";
import React, {createContext, useContext, useEffect, useState} from "react";
import {IsEmployerContextProps} from "@/types/types";
import {router} from "next/client";
export const AuthContext = createContext<{
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    user: {id: number, username:string, email: string,  type:string;}| null;
}>({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    user: null
});
const IsEmployerContext = createContext<IsEmployerContextProps | undefined>(undefined);
export default function Providers({children}:{children:React.ReactNode}){
    const [isEmployer, setIsEmployer] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user ,setUser] = useState<{id: number, username:string, email: string,  type:string;} | null >(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const user_response = await fetch('http://127.0.0.1:8000/users/me', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
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
            }
        };
        void fetchData();
        return () => {
        };
    }, []);

    return (
        <IsEmployerContext.Provider value={{ isEmployer, setIsEmployer }}>
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
        </IsEmployerContext.Provider>
    )

}
export const useAuth = () => useContext(AuthContext);
export const useIsEmployer = () => {
    const context = useContext(IsEmployerContext);
    if (!context) {
        throw new Error('useIsEmployer must be used within an IsEmployerProvider');
    }
    return context;
};