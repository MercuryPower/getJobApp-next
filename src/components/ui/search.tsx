'use client';

import React from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams ?? undefined);
        if (term) {
            params.set('query', term);
            params.set('page', '1');
        } else {
            params.delete('query');
            params.set('page', '1');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 600);


    return (
        <div className=" flex ">
            <label className={'self-center mr-2'} htmlFor="search">
                Поиск
            </label>
            <input
                className="flex-grow peer block w-full rounded-md border border-gray-200 py-[9px] pl-5 outline-2 placeholder:text-gray-500"
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams?.get('query')?.toString()}
            />
            <svg className={'self-center ml-2 dark:invert '} width="23" height="22" viewBox="0 0 23 22" fill="black" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.58335 3.6667C8.05836 3.6667 6.59582 4.24616 5.51749 5.27761C4.43916 6.30906 3.83335 7.70801 3.83335 9.1667C3.83335 10.6254 4.43916 12.0243 5.51749 13.0558C6.59582 14.0872 8.05836 14.6667 9.58335 14.6667C11.1083 14.6667 12.5709 14.0872 13.6492 13.0558C14.7276 12.0243 15.3334 10.6254 15.3334 9.1667C15.3334 7.70801 14.7276 6.30906 13.6492 5.27761C12.5709 4.24616 11.1083 3.6667 9.58335 3.6667ZM1.91669 9.1667C1.91686 7.99965 2.20823 6.8495 2.76657 5.81183C3.32492 4.77415 4.13412 3.87893 5.12692 3.20056C6.11972 2.52218 7.26744 2.08025 8.47471 1.91149C9.68198 1.74273 10.9139 1.85201 12.0682 2.23026C13.2224 2.6085 14.2656 3.24478 15.111 4.08622C15.9565 4.92766 16.5798 5.94996 16.9291 7.06815C17.2784 8.18634 17.3437 9.36813 17.1195 10.5153C16.8953 11.6625 16.3881 12.7419 15.64 13.6639L20.8026 18.6019C20.9771 18.7748 21.0737 19.0064 21.0715 19.2467C21.0694 19.4871 20.9686 19.717 20.7909 19.8869C20.6132 20.0569 20.3728 20.1533 20.1216 20.1554C19.8703 20.1575 19.6282 20.0651 19.4475 19.8981L14.2849 14.96C13.1517 15.8016 11.7942 16.3221 10.367 16.4624C8.93984 16.6027 7.50012 16.3571 6.2116 15.7536C4.92308 15.15 3.83747 14.2127 3.07821 13.0483C2.31896 11.8839 1.91653 10.539 1.91669 9.1667Z"/>
            </svg>
        </div>
    );
}