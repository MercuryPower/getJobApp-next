
// AUTH

export const LOGIN_REQUEST = `http://127.0.0.1:8000/auth/jwt/login`
export const REGISTRATION_REQUEST = `http://127.0.0.1:8000/auth/register`

// !AUTH

// GET
export const GET_USER = `http://127.0.0.1:8000/tests/active_user`
export const GET_RESUMES = `http://127.0.0.1:8000/tests/user`
export const GET_VACANCIES = `http://127.0.0.1:8000/tests/company`
export const GET_CITIES = `http://127.0.0.1:8000/tests/cities`
export const GET_SKILLS = `http://127.0.0.1:8000/tests/skills`
export const GET_PROFESSIONS = `http://127.0.0.1:8000/tests/verified_vacancy_names`
export const GET_TYPES_OF_EMPLOY = `http://127.0.0.1:8000/tests/types_of_employ`
export const GET_TOTAL_PAGES = `http://127.0.0.1:8000/tests/company_count`

export const GET_VERIFICATIONS_SKILLS = `http://127.0.0.1:8000/tests/unverified_skills`
export const GET_VERIFICATIONS_CITIES = `http://127.0.0.1:8000/tests/unverified_cities`
export const GET_VERIFICATIONS_VACANCY_NAMES = `http://127.0.0.1:8000/tests/unverified_vacancy_names`
export const GET_MY_VACANCIES_OR_RESUMES = `http://127.0.0.1:8000/tests/vacancy_by_user`

// !GET

// STATISTIC REQUESTS
export const VACANCY_STATISTIC = `http://127.0.0.1:8000/tests/statistics/company`
export const RESUME_STATISTIC = `http://127.0.0.1:8000/tests/statistics/user`
export const SKILLS_STATISTIC_VACANCY =  `http://127.0.0.1:8000/tests/skill_statistics/company`
export const SKILLS_STATISTIC_RESUME =  `http://127.0.0.1:8000/tests/skill_statistics/user`

// !STATISTIC REQUESTS


// VERIFICATION REQUESTS (GET, SET)

export const SET_VERIFICATION_SKILL = `http://127.0.0.1:8000/tests/verify_skill`
export const SET_VERIFICATION_CITY = `http://127.0.0.1:8000/tests/verify_city`
export const SET_VERIFICATION_VACANCY_NAME = `http://127.0.0.1:8000/tests/verify_vacancy_name`
export const SET_UNVERIFIED_SKILL = `http://127.0.0.1:8000/tests/unverify_skill`
export const SET_UNVERIFIED_CITY = `http://127.0.0.1:8000/tests/unverify_city`
export const SET_UNVERIFIED_VACANCY_NAME = `http://127.0.0.1:8000/tests/unverify_vacancy_name`
export const GET_VERIFICATION_COMPANY_NAME = `http://127.0.0.1:8000/tests/verification_requests`
export const SET_VERIFICATION_REQUEST_COMPANY_NAME = `http://127.0.0.1:8000/tests/send_verification_requests`
export const SET_VERIFICATION_COMPANY_NAME= `http://127.0.0.1:8000/tests/verify_company`
export const SET_UNVERIFIED_COMPANY_NAME= `http://127.0.0.1:8000/tests/unverify_company`

// !VERIFICATION REQUESTS


// REPORT REQUESTS
export const REPORT_VACANCY = `http://127.0.0.1:8000/tests/report_vacancy`

// !REPORT REQUESTS

// PHOTO
export const ADD_PHOTO = `http://127.0.0.1:8000/tests/add_photo`
export const UPDATE_PHOTO = `http://127.0.0.1:8000/tests/update_photo`
// !PHOTO