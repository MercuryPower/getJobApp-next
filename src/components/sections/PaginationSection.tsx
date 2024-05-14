import React, {useEffect, useState} from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis, PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {usePathname, useRouter, useSearchParams} from "next/navigation";


const PaginationSection = ({currentPage}:{currentPage:number}) => {
    // const pathname = usePathname();
    // const searchParams = useSearchParams();
    // const currentPage = Number(searchParams.get('page')) || 1;
    //
    // const createPageURL = (pageNumber: number | string) => {
    //     const params = new URLSearchParams(searchParams);
    //     params.set('page', pageNumber.toString());
    //     return `${pathname}?${params.toString()}`;
    // };

    const router = useRouter();
    const searchParams = useSearchParams();
    const page = searchParams.get('page') ?? '1'
    const totalPages = 5;
    const navigateToPage = (pageNumber: number) => {
        router.push(`/vacancies?page=${pageNumber}&query=${searchParams.get('query') || ''}`);
    };
    const renderPages = () => {
        const pagesToShow = [];
        const [totalPages, setTotalPages] = useState<number>(1); // Используем состояние для хранения totalPages

        useEffect(() => {
            void fetchTotalPages();
        }, []);

        const fetchTotalPages = async () => {
            try {
                // Отправляем запрос на сервер
                const response = await fetch('/api/getTotalPages'); // Замените '/api/getTotalPages' на ваш эндпоинт на сервере
                if (response.ok) {
                    const data = await response.json();
                    setTotalPages(data.totalPages);
                } else {
                    console.error('Failed to fetch total pages');
                }
            } catch (error) {
                console.error('Error fetching total pages:', error);
            }
        };


        pagesToShow.push(currentPage);

        for (let i = currentPage - 1; i >= Math.max(currentPage - 2, 1); i--) {
            pagesToShow.unshift(i);
        }


        for (let i = currentPage + 1; i <= Math.min(currentPage + 2, totalPages); i++) {
            pagesToShow.push(i);
        }

        return pagesToShow.map(pageNumber => (
            <PaginationItem key={pageNumber} >
                <PaginationLink className={'cursor-pointer'} isActive={pageNumber === currentPage} onClick={() => navigateToPage(pageNumber)}>
                    {pageNumber}
                </PaginationLink>
            </PaginationItem>
        ));
    };
    return (
        <Pagination >
            <PaginationContent>
                <PaginationItem className={'cursor-pointer'}>
                    <PaginationPrevious onClick={() => navigateToPage(Number(currentPage) - 1)}/>
                </PaginationItem >
                {renderPages()}
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem className={'cursor-pointer'}>
                    <PaginationNext onClick={() => navigateToPage(Number(currentPage) + 1)}/>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationSection;