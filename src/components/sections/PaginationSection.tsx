import React from 'react';
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
    const perPage = searchParams.get('perPage') ?? '5'
    const navigateToPage = (pageNumber: number) => {
        router.push(`/vacancies?page=${pageNumber}&query=${searchParams.get('query') || ''}`);
    };
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious onClick={() => navigateToPage(Number(currentPage) - 1)}/>
                </PaginationItem >
                <PaginationLink isActive>
                    {page}
                </PaginationLink>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext onClick={() => navigateToPage(Number(currentPage) + 1)}/>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationSection;