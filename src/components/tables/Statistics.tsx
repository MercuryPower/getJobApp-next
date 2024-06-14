"use client"

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {ArrowUpDown, ChevronDown} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {columnTranslations, StatisticProps, VerificationCompanyProps, VerificationProps} from "@/types/types";
import {
    GET_USER_INFO_BY_ID, PATCH_USER_INFO_BY_ID,
    SET_UNVERIFIED_CITY,
    SET_UNVERIFIED_SKILL, SET_UNVERIFIED_VACANCY_NAME,
    SET_VERIFICATION_CITY, SET_VERIFICATION_COMPANY_NAME,
    SET_VERIFICATION_SKILL, SET_VERIFICATION_VACANCY_NAME,
} from "@/url/urls";
import {useEffect, useMemo, useState} from "react";
const generateColumns = (data: StatisticProps[] | VerificationProps[] | VerificationCompanyProps[], isEmployer?:boolean, isVerification?:boolean, verifyTableType?: 'skill' | 'city' | 'vacancyName' | 'companyName'): ColumnDef<StatisticProps | VerificationProps | VerificationCompanyProps>[] => {

    if (!data || data.length === 0) {
        return [];
    }

    const sampleItem = data[0];

    return Object.keys(sampleItem).map((key) => {
        return {
            accessorKey: key,
            header: ({ column }) => {
                return (
                    <div className={'text-center'}>
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            {key === "averageSalaryByGrades" ? "Средняя зарплата по грейду" : columnTranslations[key] || key.charAt(0).toUpperCase() + key.slice(1)}
                            <ArrowUpDown className="ml-2 h-4 w-4"/>
                        </Button>
                    </div>
                );
            },
            cell: ({ row }) => {
                const value = row.getValue(key) as React.ReactNode;
                return (
                    <div
                        className=
                            {` capitalize
                             ${key === 'grade' ? ' font-extrabold text-xl ' : 'text-2xl'}
                             ${key === 'profession' ? 'font-bold': 'text-center'}
                             ${key === 'averageSalaryByGrades' || key === 'expectedSalary'? 'lowercase' : ''}
                             ${key === 'amountOfVacancies' ? 'capitalize font-medium ' : ''}
                             ${key === 'percent' ? 'capitalize font-medium ' : ''}
                             ${parseFloat(value as string) === 0 && 'font-extrabold text-lg'}
                             `
                    }>
                        {key === "averageSalaryByGrades" || key === 'expectedSalary' || key === 'percent' ? (
                            <>
                                {parseFloat(value as string) !== 0 ? (
                                    <>
                                        {key === 'percent' ? (
                                            new Intl.NumberFormat("ru-RU", {
                                                style: "percent",
                                                minimumFractionDigits: 2,
                                            }).format(parseFloat(value as string) / 100)
                                        ) : (
                                            new Intl.NumberFormat("ru-RU", {
                                                style: "currency",
                                                currency: "RUB",
                                            }).format(parseFloat(value as string))
                                        )}
                                    </>
                                ) : (
                                    "по договоренности"
                                )}
                            </>
                        ) : (
                            value
                        )}
                    </div>
                );
            },
            }
    });
};

export function Statistics({ data, isEmployer, isVerification,  verifyTableType, updateVerificationData}: { data: StatisticProps[] | VerificationProps[] | VerificationCompanyProps[], isEmployer?:boolean, isVerification?:boolean,  verifyTableType?: 'skill' | 'city' | 'vacancyName' | 'companyName', updateVerificationData?: (newData: (VerificationProps)[]) => void;}) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const columns = useMemo(() => generateColumns(data, isEmployer, isVerification, verifyTableType),[data, isEmployer, isVerification, verifyTableType]);
    if (isVerification && data.length > 0) {
        columns.push({
            id: 'verificationStatus',
            header: 'Статус верификации',
            cell: ({ row }) => (
                <div className="flex space-x-2 justify-center">
                    <Button className={'bg-green-600'} onClick={() => handleVerification(row.original as VerificationProps, 'accept')}>
                        Принять
                    </Button>
                    <Button variant={'destructive'} onClick={() => handleVerification(row.original as VerificationProps, 'reject')}>
                        Отклонить
                    </Button>
                </div>
            ),
        });
    }

    async function handleVerification(item :VerificationProps | VerificationCompanyProps, action: 'accept' | 'reject') {
        let requestUrl = ''
        let secondCompanyRequestUrl = ''
        switch(verifyTableType){
            case "skill":
                action === 'accept' ?
                    requestUrl = SET_VERIFICATION_SKILL
                    :
                    requestUrl = SET_UNVERIFIED_SKILL
                break;
            case "city":
                action === 'accept' ?
                    requestUrl = SET_VERIFICATION_CITY
                    :
                    requestUrl = SET_UNVERIFIED_CITY
                break;
            case "vacancyName":
                action === 'accept' ?
                    requestUrl = SET_VERIFICATION_VACANCY_NAME
                    :
                    requestUrl = SET_UNVERIFIED_VACANCY_NAME
                break;
            case "companyName":
                action === 'accept' ?
                        requestUrl = GET_USER_INFO_BY_ID
                    :
                    requestUrl = SET_UNVERIFIED_VACANCY_NAME
                break;
            default:
                return;
        }
        if (action === 'accept') {
            try {
                const response = await fetch(`${requestUrl}/${item.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });
                if (!response.ok) {
                    throw new Error('Ошибка при отправке данных');
                }
                const newData = data.filter((d): d is VerificationProps => 'id' in d && d.id !== item.id);
                updateVerificationData?.(newData);
            } catch (error) {
                console.error('Error:', error);
            }

        }
        if (action === 'reject') {
            try {
                const response = await fetch(`${requestUrl}/${item.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });
                if (!response.ok) {
                    throw new Error('Ошибка при отправке данных');
                }
                const newData = data.filter((d): d is VerificationProps => 'id' in d && d.id !== item.id);
                updateVerificationData?.(newData);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });
    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                {table.getAllColumns().find(col => col.id === "profession" || col.id === 'name') && (
                    <Input
                        placeholder="Поиск"
                        value={(table.getColumn(table.getAllColumns().find(col => col.id === "profession" || col.id === 'name')?.id as string)?.getFilterValue() as string) ?? ""}
                        onChange={(event) => {
                            const columnId = table.getAllColumns().find(col => col.id === "profession" || col.id === 'name')?.id;
                            if (columnId) {
                                table.getColumn(columnId)?.setFilterValue(event.target.value);
                            }
                        }}
                        className="max-w-sm"
                    />
                )}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Колонки <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(value)
                                        }
                                    >
                                        {columnTranslations[column.id] || column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className={header.id === 'verificationStatus' ? 'text-center' : ''}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Результатов не найдено.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length > 0 && (
                        `${table.getFilteredSelectedRowModel().rows.length} из  ${table.getFilteredRowModel().rows.length} полей выбрано.`
                    )}
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Назад
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Далее
                    </Button>
                </div>
            </div>
        </div>
    );
}