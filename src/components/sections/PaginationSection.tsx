import React, {useEffect, useState} from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis, PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {GET_TOTAL_PAGES} from "@/url/urls";


const PaginationSection = ({currentPage}:{currentPage:number}) => {
    const [totalPages, setTotalPages] = useState<number>(1); // Используем состояние для хранения totalPages
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
    const navigateToPage = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            router.push(`/vacancies?page=${pageNumber}${searchParams.get('query') || ''}`);
        }
    };

    const renderPages = () => {
        const pagesToShow = [];
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
    useEffect(() => {
        const fetchTotalPages = async () => {
            try {
                const response = await fetch(GET_TOTAL_PAGES);
                if (response.ok) {
                    const data = parseInt(await response.text(), 10);
                    setTotalPages(data);
                } else {
                    console.error('Failed to fetch total pages');
                }
            } catch (error) {
                console.error('Error fetching total pages:', error);
            }
        };
        void fetchTotalPages();
    }, []);
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