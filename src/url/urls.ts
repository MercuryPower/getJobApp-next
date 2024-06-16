// AUTH

export const LOGIN_REQUEST = `http://127.0.0.1:8000/auth/jwt/login`
export const REGISTRATION_REQUEST = `http://127.0.0.1:8000/auth/register`

// !AUTH

// GET
export const GET_USER = `http://127.0.0.1:8000/user/active_user`
export const GET_RESUMES = `http://127.0.0.1:8000/search/user`
export const GET_VACANCIES = `http://127.0.0.1:8000/search/company`
export const GET_CITIES = `http://127.0.0.1:8000/search/cities`
export const GET_SKILLS = `http://127.0.0.1:8000/search/skills`
export const GET_PROFESSIONS = `http://127.0.0.1:8000/search/verified_vacancy_names`
export const GET_TYPES_OF_EMPLOY = `http://127.0.0.1:8000/search/types_of_employ`
export const GET_TOTAL_PAGES = `http://127.0.0.1:8000/search/company_count`

export const GET_VERIFICATIONS_SKILLS = `http://127.0.0.1:8000/admin/unverified_skills`
export const GET_VERIFICATIONS_CITIES = `http://127.0.0.1:8000/admin/unverified_cities`
export const GET_VERIFICATIONS_VACANCY_NAMES = `http://127.0.0.1:8000/admin/unverified_vacancy_names`
export const GET_MY_VACANCIES_OR_RESUMES = `http://127.0.0.1:8000/user/vacancy_by_user`

// !GET

// STATISTIC REQUESTS
export const VACANCY_STATISTIC = `http://127.0.0.1:8000/stats/statistics/company`
export const RESUME_STATISTIC = `http://127.0.0.1:8000/stats/statistics/user`
export const SKILLS_STATISTIC_VACANCY = `http://127.0.0.1:8000/stats/skill_statistics/company`
export const SKILLS_STATISTIC_RESUME = `http://127.0.0.1:8000/stats/skill_statistics/user`

// !STATISTIC REQUESTS


// VERIFICATION REQUESTS (GET, SET)

export const SET_VERIFICATION_SKILL = `http://127.0.0.1:8000/admin/verify_skill`
export const SET_VERIFICATION_CITY = `http://127.0.0.1:8000/admin/verify_city`
export const SET_VERIFICATION_VACANCY_NAME = `http://127.0.0.1:8000/admin/verify_vacancy_name`
export const SET_UNVERIFIED_SKILL = `http://127.0.0.1:8000/admin/unverify_skill`
export const SET_UNVERIFIED_CITY = `http://127.0.0.1:8000/admin/unverify_city`
export const SET_UNVERIFIED_VACANCY_NAME = `http://127.0.0.1:8000/admin/unverify_vacancy_name`
export const GET_VERIFICATION_COMPANY_NAME = `http://127.0.0.1:8000/admin/verification_requests`
export const SET_VERIFICATION_REQUEST_COMPANY_NAME = `http://127.0.0.1:8000/user/send_verification_requests`
export const SET_VERIFICATION_COMPANY_NAME= `http://127.0.0.1:8000/admin/verify_company`
export const SET_UNVERIFIED_COMPANY_NAME= `http://127.0.0.1:8000/admin/unverify_company`

// !VERIFICATION REQUESTS


// REPORT REQUESTS
export const REPORT_VACANCY = `http://127.0.0.1:8000/user/report_vacancy`

// !REPORT REQUESTS

// PHOTO
export const ADD_PHOTO = `http://127.0.0.1:8000/user/add_photo`
export const UPDATE_PHOTO = `http://127.0.0.1:8000/user/update_photo`
// !PHOTO

export const DELETE_VACANCY = `http://127.0.0.1:8000/user/delete_vacancy`
export const GET_RECOMMENDATIONS = `http://127.0.0.1:8000/user/recommendations`