import React, {createContext, Dispatch, SetStateAction} from "react";


export interface CardsProperties {
    data:VacancyInfo[],
    setIsHovered?:(b: boolean)=> void,
    page?:number,
    query?:string,
    queryString?:string,
    isLoading?:boolean
}
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
    contacts:string;
    registered_at:string;
    created_at:string;
    companyDescription:string;
    [key: string]: any;
}
export interface ResumeInfo extends VacancyInfo {
    resume:string;
}
export interface IsEmployerContextProps {
    isEmployer: boolean;
    setIsEmployer: Dispatch<SetStateAction<boolean>>;
}

export interface StatisticProps {
    grade: string;
    profession: string;
    expectedSalary?: number | string;
    numberOfApplications?: number;
    averageSalaryByGrades?: number | string;
    amountOfVacancies?: number;
}
export const columnTranslations: { [key: string]: string } = {
    grade: "Грейд",
    profession: "Профессия",
    averageSalaryByGrades: "Средняя зарплата по грейдам",
    amountOfVacancies: "Количество вакансий",
    expectedSalary: "Ожидаемая зарплата",
    numberOfApplications: "Количество заявок"
};

export interface userProperties {
    id: number,
    username:string,
    email: string,
    description:string,
    type:string,
    registered_at: string,
    is_verified: boolean;
    is_superuser: boolean;
}