import React, {useState} from 'react';
import {useRouter} from "next/navigation";

interface IMenuItems {
    itemName: string;
    redirectTo?:string;
}

const NavbarItem = (item:IMenuItems) => {
    const router = useRouter();
    return (
        <div>
            <div>
                <button type={'button'} onClick={item?.redirectTo ? () => router.push(`/${item.redirectTo}`):undefined} className={'flex border-black p-2 rounded  font-bold hover:opacity-70 transition'}>
                    <svg className={'mr-2 self-center dark:invert'} width="15" height="14" viewBox="0 0 15 14" fill="black" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.375 8.90625C9.375 9.16524 9.16523 9.375 8.90625 9.375H6.09375C5.83477 9.375 5.625 9.16524 5.625 8.90625V7.5H0V11.7188C0 12.4688 0.65625 13.125 1.40625 13.125H13.5938C14.3438 13.125 15 12.4688 15 11.7188V7.5H9.375V8.90625ZM13.5938 2.8125H11.25V1.40625C11.25 0.65625 10.5938 0 9.84375 0H5.15625C4.40625 0 3.75 0.65625 3.75 1.40625V2.8125H1.40625C0.65625 2.8125 0 3.46875 0 4.21875V6.5625H15V4.21875C15 3.46875 14.3438 2.8125 13.5938 2.8125ZM9.375 2.8125H5.625V1.875H9.375V2.8125Z"/>
                    </svg>
                    {item.itemName}
                </button>
            </div>
        </div>
    );
};

export default NavbarItem;