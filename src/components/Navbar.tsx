'use client'
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {useRouter} from "next/navigation";
import ThemeSwitch from "@/components/ui/ThemeSwitch";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {CreditCard, FileText, User} from "lucide-react";
import LoginSection from "@/components/sections/LoginSection";
import {useSession} from "next-auth/react";
import {auth} from "@/auth";
import {getToken} from "@auth/core/jwt";
import LogOutSection from "@/components/sections/LogOutSection";
import {useAuth, useIsEmployer} from "@/components/providers";
import Link from "next/link";
import {useLogOut} from "@/hooks/useLogOut";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

const Navbar = () => {
    // const [userType, setUserType] = useState('employer')
    //
    // const handleTypeChange = (type: string) => {
    //     setUserType(type)
    // }
    const {isEmployer, setIsEmployer} = useIsEmployer()
    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    // const secret = process.env.AUTH_SECRET;
    const {isLoggedIn, user} = useAuth();
    // const [isLoggedIn, setIsLoggedIn] = useState(false)
    // const [user, setUser] = useState<any>()
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const user_response = await fetch('http://127.0.0.1:8000/users/me', {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //                 },
    //                 next:{revalidate:3600}
    //             });
    //             const responseData = await user_response.json();
    //
    //             // Проверка успешности аутентификации
    //             if (user_response.ok) {
    //                 setIsLoggedIn(true);
    //                 setUser(responseData); // Предположим, что имя пользователя находится в свойстве "name" объекта responseData
    //             } else {
    //                 setIsLoggedIn(false);
    //                 setUser(null);
    //             }
    //         } catch (error) {
    //             setIsLoggedIn(false);
    //             setUser(null);
    //             throw new Error((error as Error).message);
    //         }
    //     };
    //     fetchData();
    //     return () => {
    //     };
    // }, []);

    return (
        <nav className={'flex justify-around  drop-shadow border-b'}>
            <div className={'flex'}>
                <div className={'w-159 flex ml-4 self-center flex-col p-1   '}>
                    <div className={'flex m-2 '}>
                        <Button  onClick={() => setIsEmployer(false)}
                                className={`w-48 font-light text-center ${!isEmployer && `bg-green-600 font-bold outline hover:bg-green-600`}   p-2  transition`}>Соискателям</Button>
                    </div>
                    <div className={'flex justify-center'}>
                        <Button className={`w-48 text-center  font-light  ${isEmployer && `bg-green-600 outline font-bold hover:bg-green-600`} p-2 rounded transition`}
                                onClick={() => setIsEmployer(true)}>Работодателям</Button>
                    </div>
                </div>
                <button onClick={() => router.push('/')}>
                    <div className={'flex p-4 self-center m-4 border-l-2  cursor-pointer'}>
                        <Image
                            src="/logo.svg"
                            alt="Logo"
                            className={"rounded dark:invert"}
                            width={50}
                            height={54}
                        />
                        <div className={'self-center m-2 text-center text-xs'}>
                            <span className={'rounded p-1'}>Работа</span> - найдется!
                        </div>
                    </div>
                </button>
            </div>
            <div className={'flex  self-center justify-center'}>
                {/*<NavbarItem itemName={'Вакансия'} ></NavbarItem>*/}
                <div>
                    <Button variant={'link'} type={'button'} onClick={() => router.push('/vacancies')}
                            className={'flex border-black p-2 hover:no-underline rounded  font-bold hover:opacity-70 transition'}>
                        <svg className={'mr-2 self-center dark:invert'} width="15" height="14" viewBox="0 0 15 14"
                             fill="black" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.375 8.90625C9.375 9.16524 9.16523 9.375 8.90625 9.375H6.09375C5.83477 9.375 5.625 9.16524 5.625 8.90625V7.5H0V11.7188C0 12.4688 0.65625 13.125 1.40625 13.125H13.5938C14.3438 13.125 15 12.4688 15 11.7188V7.5H9.375V8.90625ZM13.5938 2.8125H11.25V1.40625C11.25 0.65625 10.5938 0 9.84375 0H5.15625C4.40625 0 3.75 0.65625 3.75 1.40625V2.8125H1.40625C0.65625 2.8125 0 3.46875 0 4.21875V6.5625H15V4.21875C15 3.46875 14.3438 2.8125 13.5938 2.8125ZM9.375 2.8125H5.625V1.875H9.375V2.8125Z"/>
                        </svg>
                        Вакансии
                    </Button>
                </div>
                <div className={'ml-9'}>
                    <Button variant={'link'} type={'button'} onClick={() => router.push('/jobseekers')}
                            className={'flex border-black p-2 hover:no-underline rounded font-bold hover:opacity-70 transition'}>
                        <svg className={'mr-2 self-center dark:invert '} width="15" height="11" viewBox="0 0 15 11"
                             fill="black" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M2.25 4.5C3.07734 4.5 3.75 3.82734 3.75 3C3.75 2.17266 3.07734 1.5 2.25 1.5C1.42266 1.5 0.75 2.17266 0.75 3C0.75 3.82734 1.42266 4.5 2.25 4.5ZM12.75 4.5C13.5773 4.5 14.25 3.82734 14.25 3C14.25 2.17266 13.5773 1.5 12.75 1.5C11.9227 1.5 11.25 2.17266 11.25 3C11.25 3.82734 11.9227 4.5 12.75 4.5ZM13.5 5.25H12C11.5875 5.25 11.2148 5.41641 10.943 5.68594C11.8875 6.20391 12.5578 7.13906 12.7031 8.25H14.25C14.6648 8.25 15 7.91484 15 7.5V6.75C15 5.92266 14.3273 5.25 13.5 5.25ZM7.5 5.25C8.95078 5.25 10.125 4.07578 10.125 2.625C10.125 1.17422 8.95078 0 7.5 0C6.04922 0 4.875 1.17422 4.875 2.625C4.875 4.07578 6.04922 5.25 7.5 5.25ZM9.3 6H9.10547C8.61797 6.23438 8.07656 6.375 7.5 6.375C6.92344 6.375 6.38438 6.23438 5.89453 6H5.7C4.20937 6 3 7.20938 3 8.7V9.375C3 9.99609 3.50391 10.5 4.125 10.5H10.875C11.4961 10.5 12 9.99609 12 9.375V8.7C12 7.20938 10.7906 6 9.3 6ZM4.05703 5.68594C3.78516 5.41641 3.4125 5.25 3 5.25H1.5C0.672656 5.25 0 5.92266 0 6.75V7.5C0 7.91484 0.335156 8.25 0.75 8.25H2.29453C2.44219 7.13906 3.1125 6.20391 4.05703 5.68594Z"/>
                        </svg>
                        Соискатели
                    </Button>
                </div>
                <div className={'ml-9'}>
                    <Button variant={'link'} className={'flex border-black p-2 hover:no-underline rounded font-bold hover:opacity-70 transition'} onClick={() => router.push('/statistics')}>
                        <svg className={'self-center mr-2'} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.5 1C11.7761 1 12 1.22386 12 1.5V13.5C12 13.7761 11.7761 14 11.5 14C11.2239 14 11 13.7761 11 13.5V1.5C11 1.22386 11.2239 1 11.5 1ZM9.5 3C9.77614 3 10 3.22386 10 3.5V13.5C10 13.7761 9.77614 14 9.5 14C9.22386 14 9 13.7761 9 13.5V3.5C9 3.22386 9.22386 3 9.5 3ZM13.5 3C13.7761 3 14 3.22386 14 3.5V13.5C14 13.7761 13.7761 14 13.5 14C13.2239 14 13 13.7761 13 13.5V3.5C13 3.22386 13.2239 3 13.5 3ZM5.5 4C5.77614 4 6 4.22386 6 4.5V13.5C6 13.7761 5.77614 14 5.5 14C5.22386 14 5 13.7761 5 13.5V4.5C5 4.22386 5.22386 4 5.5 4ZM1.5 5C1.77614 5 2 5.22386 2 5.5V13.5C2 13.7761 1.77614 14 1.5 14C1.22386 14 1 13.7761 1 13.5V5.5C1 5.22386 1.22386 5 1.5 5ZM7.5 5C7.77614 5 8 5.22386 8 5.5V13.5C8 13.7761 7.77614 14 7.5 14C7.22386 14 7 13.7761 7 13.5V5.5C7 5.22386 7.22386 5 7.5 5ZM3.5 7C3.77614 7 4 7.22386 4 7.5V13.5C4 13.7761 3.77614 14 3.5 14C3.22386 14 3 13.7761 3 13.5V7.5C3 7.22386 3.22386 7 3.5 7Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                        Статистика
                    </Button>
                </div>
                <div className={'ml-9'}>
                        <Button variant={'link'} className={'flex border-black p-2 hover:no-underline rounded font-bold hover:opacity-70 transition'} onClick={() => router.push('/recommendations')}>
                        <svg className={'mr-2 self-center dark:invert'} width="15" height="14" viewBox="0 0 15 14"
                             fill="black" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_128_115)">
                                <path
                                    d="M6.75261 0.463536L5.05209 3.91145L1.2474 4.46614C0.565106 4.5651 0.291669 5.40624 0.786461 5.88802L3.53906 8.57031L2.88802 12.3594C2.77084 13.0443 3.49219 13.5573 4.09636 13.237L7.5 11.4479L10.9036 13.237C11.5078 13.5547 12.2292 13.0443 12.112 12.3594L11.4609 8.57031L14.2135 5.88802C14.7083 5.40624 14.4349 4.5651 13.7526 4.46614L9.94792 3.91145L8.2474 0.463536C7.94271 -0.151047 7.0599 -0.15886 6.75261 0.463536Z"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_128_115">
                                    <rect width="15" height="13.3333"/>
                                </clipPath>
                            </defs>
                        </svg>
                        Рекомендации
                    </Button>
                </div>
                <div className={'ml-9 '}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                className={'border-none flex border-black p-2 hover:no-underline rounded bg  font-bold hover:opacity-70 transition '}
                                variant="link">
                                Еще
                                <svg className={'ml-2 self-center dark:invert'} width="12" height="7" viewBox="0 0 12 7"
                                     fill="black" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.5 1.125L6 5.875L10.5 1.125"/>
                                </svg>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <User className="mr-2 h-4 w-4"/>
                                    <Link href={'/profile'}>Профиль</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <CreditCard className="mr-2 h-4 w-4"/>
                                    <span>Отзывы</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className={'self-center flex gap-10 '}>
                <div
                    className={'flex self-center hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full transition-all p-2'}>
                    <ThemeSwitch/>
                </div>
                {isLoggedIn && user ?
                    (<div className={'flex space-x-4 max-w-md text-ellipsis outline-none overflow-hidden '}>
                        <Dialog open={isDialogOpen}>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    className={'border-none outline-none self-center flex border-black p-2 hover:no-underline rounded bg  hover:opacity-70 transition '}
                                    variant="link">
                                    {user?.username}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Привет, {user?.username}!</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem className={'font-extrabold'}>
                                        <User className="mr-2 h-4 w-4"/>
                                        <Link href={'/profile'}>Профиль</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <FileText className="mr-2 h-4 w-4"/>
                                        {user?.type === 'company' ?
                                            <Link href={'/vacancies/me'}>Мои вакансии</Link>
                                            :
                                            <Link href={'/jobseekers/me'}>Мои резюме</Link>
                                        }
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator/>
                                        <DialogTrigger asChild>
                                            <Button className={'mr-2 h-8 w-full self-center'} variant={'link'} onClick={() => setIsDialogOpen(!isDialogOpen)}>Выйти</Button>
                                        </DialogTrigger>
                                        <DialogContent className={'flex self-justify-center flex-col'} >
                                            <DialogHeader className={'self-center'}>
                                                <DialogTitle >Вы уверены, что хотите выйти?</DialogTitle>
                                            </DialogHeader>
                                            <div className={'flex justify-center space-x-4'}>
                                                <Button size={'lg'} className={'flex self-center bg-green-600 font-bold text-lg'} type={"submit"} onClick={useLogOut}>Да</Button>
                                                <Button size={'lg'} className={'flex self-center opacity-80 font-bold'} onClick={() => setIsDialogOpen(!isDialogOpen)} >Нет</Button>
                                            </div>
                                        </DialogContent>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </Dialog>
                        <div>
                            <LogOutSection/>
                        </div>
                    </div>)
                    :
                    <LoginSection />
                }
                {/*<LoginSection />*/}
            </div>
        </nav>
    );
};

export default Navbar;