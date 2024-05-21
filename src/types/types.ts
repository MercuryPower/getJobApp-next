import React, {createContext} from "react";

export interface VacancyInfo {
    id: number;
    user_id:number;
    companyName: string;
    vacancy_name:string;
    salary_type:string;
    fixed_salary:number;
    max_salary:number;
    min_salary:number;
    types_of_employ?:{
        id:number;
        name:string;
    }[];
    skills:{
        id:number;
        name:string;
    }[]
    cities:{
        id:number;
        name:string;
    }[]
    exp:string;
    description:string;
    contacts:string
    [key: string]: any;
}
export interface ResumeInfo extends VacancyInfo {
    resume:string;
}
export interface IsEmployerContextProps {
    isEmployer: boolean;
    setIsEmployer: (value: boolean) => void;
}