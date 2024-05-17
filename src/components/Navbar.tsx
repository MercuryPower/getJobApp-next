'use client'
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {useRouter} from "next/navigation";
import ThemeSwitch from "@/components/ui/ThemeSwitch";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {CreditCard, User} from "lucide-react";
import LoginSection from "@/components/sections/LoginSection";
import {useSession} from "next-auth/react";
import {auth} from "@/auth";

const Navbar = () => {
    // const [userType, setUserType] = useState('employer')
    //
    // const handleTypeChange = (type: string) => {
    //     setUserType(type)
    // }

    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState<any>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user_response = await fetch('http://127.0.0.1:8000/users/me', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    next:{revalidate:60}
                });
                const responseData = await user_response.json();

                // Проверка успешности аутентификации
                if (user_response.ok) {
                    setIsLoggedIn(true);
                    setUser(responseData); // Предположим, что имя пользователя находится в свойстве "name" объекта responseData
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

        fetchData(); // Вызов асинхронной функции внутри эффекта

        // Функция "деструктор" (cleanup function) может быть возвращена из этого эффекта,
        // если необходимо выполнить очистку при размонтировании компонента или при повторном запуске эффекта
        return () => {
            // Например, здесь вы можете выполнить очистку, если это необходимо
        };
    }, []); // Пустой массив зависимостей указывает, что эффект будет выполнен только один раз при монтировании компонента

    return (
        <nav className={'flex justify-around  drop-shadow border-b'}>
            <div className={'flex'}>
                <div className={'w-159 flex ml-4 self-center flex-col p-1   '}>
                    <div className={'flex m-2 '}>
                        <Button onClick={() => router.push('/')}
                                className={'w-48 text-center rounded  border-2 p-2  transition'}>Соискателям</Button>
                    </div>
                    <div className={'flex justify-center'}>
                        <Button className={'w-48 border-black bg-green-600 p-2 rounded font-bold transition'}
                                onClick={() => router.push('/employer')}>Работодателям</Button>
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
                    <button type={'button'} onClick={() => router.push('/vacancies')}
                            className={'flex border-black p-2 rounded  font-bold hover:opacity-70 transition'}>
                        <svg className={'mr-2 self-center dark:invert'} width="15" height="14" viewBox="0 0 15 14"
                             fill="black" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.375 8.90625C9.375 9.16524 9.16523 9.375 8.90625 9.375H6.09375C5.83477 9.375 5.625 9.16524 5.625 8.90625V7.5H0V11.7188C0 12.4688 0.65625 13.125 1.40625 13.125H13.5938C14.3438 13.125 15 12.4688 15 11.7188V7.5H9.375V8.90625ZM13.5938 2.8125H11.25V1.40625C11.25 0.65625 10.5938 0 9.84375 0H5.15625C4.40625 0 3.75 0.65625 3.75 1.40625V2.8125H1.40625C0.65625 2.8125 0 3.46875 0 4.21875V6.5625H15V4.21875C15 3.46875 14.3438 2.8125 13.5938 2.8125ZM9.375 2.8125H5.625V1.875H9.375V2.8125Z"/>
                        </svg>
                        Вакансии
                    </button>
                </div>
                <div className={'ml-9'}>
                    <button type={'button'} onClick={() => router.push('/jobseekers')}
                            className={'flex border-black p-2 rounded font-bold hover:opacity-70 transition'}>
                        <svg className={'mr-2 self-center dark:invert '} width="15" height="11" viewBox="0 0 15 11"
                             fill="black" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M2.25 4.5C3.07734 4.5 3.75 3.82734 3.75 3C3.75 2.17266 3.07734 1.5 2.25 1.5C1.42266 1.5 0.75 2.17266 0.75 3C0.75 3.82734 1.42266 4.5 2.25 4.5ZM12.75 4.5C13.5773 4.5 14.25 3.82734 14.25 3C14.25 2.17266 13.5773 1.5 12.75 1.5C11.9227 1.5 11.25 2.17266 11.25 3C11.25 3.82734 11.9227 4.5 12.75 4.5ZM13.5 5.25H12C11.5875 5.25 11.2148 5.41641 10.943 5.68594C11.8875 6.20391 12.5578 7.13906 12.7031 8.25H14.25C14.6648 8.25 15 7.91484 15 7.5V6.75C15 5.92266 14.3273 5.25 13.5 5.25ZM7.5 5.25C8.95078 5.25 10.125 4.07578 10.125 2.625C10.125 1.17422 8.95078 0 7.5 0C6.04922 0 4.875 1.17422 4.875 2.625C4.875 4.07578 6.04922 5.25 7.5 5.25ZM9.3 6H9.10547C8.61797 6.23438 8.07656 6.375 7.5 6.375C6.92344 6.375 6.38438 6.23438 5.89453 6H5.7C4.20937 6 3 7.20938 3 8.7V9.375C3 9.99609 3.50391 10.5 4.125 10.5H10.875C11.4961 10.5 12 9.99609 12 9.375V8.7C12 7.20938 10.7906 6 9.3 6ZM4.05703 5.68594C3.78516 5.41641 3.4125 5.25 3 5.25H1.5C0.672656 5.25 0 5.92266 0 6.75V7.5C0 7.91484 0.335156 8.25 0.75 8.25H2.29453C2.44219 7.13906 3.1125 6.20391 4.05703 5.68594Z"/>
                        </svg>
                        Соискатели
                    </button>
                </div>
                <div className={'ml-9'}>
                    <button className={'flex border-black p-2 rounded font-bold hover:opacity-70 transition'}>
                        <svg className={'mr-2 self-center dark:invert'} width="15" height="15" viewBox="0 0 15 15"
                             fill="black" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_128_113)">
                                <path
                                    d="M14.5982 14.0625H13.9286V0.703125C13.9286 0.314795 13.5688 0 13.125 0H1.875C1.43119 0 1.07143 0.314795 1.07143 0.703125V14.0625H0.401786C0.1799 14.0625 0 14.2199 0 14.4141V15H15V14.4141C15 14.2199 14.8201 14.0625 14.5982 14.0625ZM4.28571 2.22656C4.28571 2.03241 4.46561 1.875 4.6875 1.875H6.02679C6.24867 1.875 6.42857 2.03241 6.42857 2.22656V3.39844C6.42857 3.59259 6.24867 3.75 6.02679 3.75H4.6875C4.46561 3.75 4.28571 3.59259 4.28571 3.39844V2.22656ZM4.28571 5.03906C4.28571 4.84491 4.46561 4.6875 4.6875 4.6875H6.02679C6.24867 4.6875 6.42857 4.84491 6.42857 5.03906V6.21094C6.42857 6.40509 6.24867 6.5625 6.02679 6.5625H4.6875C4.46561 6.5625 4.28571 6.40509 4.28571 6.21094V5.03906ZM6.02679 9.375H4.6875C4.46561 9.375 4.28571 9.21759 4.28571 9.02344V7.85156C4.28571 7.65741 4.46561 7.5 4.6875 7.5H6.02679C6.24867 7.5 6.42857 7.65741 6.42857 7.85156V9.02344C6.42857 9.21759 6.24867 9.375 6.02679 9.375ZM8.57143 14.0625H6.42857V11.6016C6.42857 11.4074 6.60847 11.25 6.83036 11.25H8.16964C8.39153 11.25 8.57143 11.4074 8.57143 11.6016V14.0625ZM10.7143 9.02344C10.7143 9.21759 10.5344 9.375 10.3125 9.375H8.97321C8.75133 9.375 8.57143 9.21759 8.57143 9.02344V7.85156C8.57143 7.65741 8.75133 7.5 8.97321 7.5H10.3125C10.5344 7.5 10.7143 7.65741 10.7143 7.85156V9.02344ZM10.7143 6.21094C10.7143 6.40509 10.5344 6.5625 10.3125 6.5625H8.97321C8.75133 6.5625 8.57143 6.40509 8.57143 6.21094V5.03906C8.57143 4.84491 8.75133 4.6875 8.97321 4.6875H10.3125C10.5344 4.6875 10.7143 4.84491 10.7143 5.03906V6.21094ZM10.7143 3.39844C10.7143 3.59259 10.5344 3.75 10.3125 3.75H8.97321C8.75133 3.75 8.57143 3.59259 8.57143 3.39844V2.22656C8.57143 2.03241 8.75133 1.875 8.97321 1.875H10.3125C10.5344 1.875 10.7143 2.03241 10.7143 2.22656V3.39844Z"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_128_113">
                                    <rect width="15" height="15"/>
                                </clipPath>
                            </defs>
                        </svg>
                        Статистика
                    </button>
                </div>
                <div className={'ml-9'}>
                    <button className={'flex border-black p-2 rounded  font-bold hover:opacity-70 transition'}>
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
                        Тренды
                    </button>
                </div>
                <div className={'ml-9 '}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                className={'border-none flex border-black p-2 rounded bg  font-bold hover:opacity-70 transition '}
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
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <CreditCard className="mr-2 h-4 w-4"/>
                                    <span>Billing</span>
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
                {/*{session ?*/}
                {/*    <p>Welcome, {session.user?.name}</p> : <LoginSection/>*/}
                {/*}*/}
                {isLoggedIn ? <p>{user.username}</p>:
                <LoginSection />}
            </div>
        </nav>
    );
};

export default Navbar;