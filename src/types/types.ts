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
    reports:{
        id: number;
        report_user_id: number;
        report_description:string;
        report_type:string;
        report_username:string;
    }[]
    type:string;
    photo_url?: any;
    is_reported:boolean;
    is_verified:boolean;
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
    count?:number;
    percent?:number;
}
export interface VerificationProps {
    id:number;
    name:string;
    company_name:string;
    company_description:string
    company_email:string
}

export const columnTranslations: { [key: string]: string } = {
    grade: "Грейд",
    profession: "Профессия",
    averageSalaryByGrades: "Средняя зарплата по грейдам",
    amountOfVacancies: "Количество вакансий",
    expectedSalary: "Ожидаемая зарплата",
    numberOfApplications: "Количество заявок",
    company_name:"Название компании",
    company_description:"Описании компании",
    company_email:'Email компании',
    name:'Название',
    verificationStatus:'Статус верификации',
    count:'Количество',
    percent:'% от общего числа вакансий'
};

export interface userProperties {
    id: number,
    username:string,
    email: string,
    photo_url:any;
    description:string,
    type:string,
    registered_at: string,
    is_verified: boolean;
    is_superuser: boolean;
}