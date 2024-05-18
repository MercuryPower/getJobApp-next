import React, {createContext} from "react";

export interface VacancyInfo {
    id: number;
    companyName: string;
    vacancyName:string;
    salary?: string;
    tp?:string;
    skills:{
        id:number;
        name:string;
    }[]
    cities:{
        id:number;
        name:string;
    }[]
    exp:string;
    [key: string]: any;
}

export interface IsEmployerContextProps {
    isEmployer: boolean;
    setIsEmployer: (value: boolean) => void;
}