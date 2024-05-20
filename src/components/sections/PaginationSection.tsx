import React, {useEffect, useState} from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis, PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {usePathname, useRouter, useSearchParams} from "next/navigation";


const PaginationSection = ({currentPage,queryString, query}:{currentPage:number, queryString:string, query:string}) => {
    const [totalPages, setTotalPages] = useState<number>(1);
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
    const pathname = usePathname()
    const type = pathname.includes('jobseekers') ? 'user' : 'company';

    const navigateToPage = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            router.push(`${pathname}?page=${pageNumber}&${queryString}&${query}`);
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
                const response = await fetch(`http://127.0.0.1:8000/tests/${type}_count?page=${page}&query=${query}&${queryString}`);
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
    }, [page, query, queryString]);
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