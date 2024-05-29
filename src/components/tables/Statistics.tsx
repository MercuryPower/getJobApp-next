"use client"

import * as React from "react"
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
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const data: Payment[] = [
    {
        id: "m5gr84i9",
        profession: 'Frontend ',
        averageSalaryByGrades: 52990,
        grade: 'Junior',
        amountOfVacancies: 12,
    },
    {
        id: "m5gr84i9",
        profession: 'Менеджер проекта',
        averageSalaryByGrades: 32000,
        grade: 'Junior',
        amountOfVacancies: 12,
    },
    {
        id: "m5gr84i9",
        profession: 'C++',
        averageSalaryByGrades: 120000,
        grade: 'Intern',
        amountOfVacancies: 2,
    },
    {
        id: "m5gr84i9",
        profession: 'Python',
        averageSalaryByGrades: 125000,
        grade: 'Lead',
        amountOfVacancies: 7,
    },
    {
        id: "m5gr84i9",
        profession: 'Backend разработка',
        averageSalaryByGrades: 200000,
        grade: 'Senior',
        amountOfVacancies: 7,
    },
    {
        id: "m5gr84i9",
        profession: 'Backend',
        averageSalaryByGrades: 150000,
        grade: 'Middle',
        amountOfVacancies: 7,
    },
    {
        id: "m5gr84i9",
        profession: 'Backend',
        averageSalaryByGrades: 150000,
        grade: 'Middle',
        amountOfVacancies: 7,
    },
    {
        id: "m5gr84i9",
        profession: 'Backend',
        averageSalaryByGrades: 150000,
        grade: 'Middle',
        amountOfVacancies: 7,
    },
    {
        id: "m5gr84i9",
        profession: 'Backend',
        averageSalaryByGrades: 150000,
        grade: 'Middle',
        amountOfVacancies: 7,
    },
    {
        id: "m5gr84i9",
        profession: 'Backend',
        averageSalaryByGrades: 150000,
        grade: 'Middle',
        amountOfVacancies: 7,
    },
    {
        id: "m5gr84i9",
        profession: 'Backend',
        averageSalaryByGrades: 150000,
        grade: 'Middle',
        amountOfVacancies: 7,
    },
    {
        id: "m5gr84i9",
        profession: 'Backend',
        averageSalaryByGrades: 100000,
        grade: 'Junior',
        amountOfVacancies: 7,
    },
    {
        id: "m5gr84i9",
        profession: 'DevOps',
        averageSalaryByGrades: 40000,
        grade: 'Middle',
        amountOfVacancies: 9,
    },
    {
        id: "m5gr84i9",
        profession: 'IT директор',
        averageSalaryByGrades: 123456,
        grade: 'Junior',
        amountOfVacancies: 12,
    },
]

export type Payment = {
    id: string
    profession : string
    averageSalaryByGrades: number;
    grade:'Intern' | 'Junior' | 'Middle' | 'Senior' | 'Lead';
    amountOfVacancies: number
}

export const columns: ColumnDef<Payment>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "grade",
        header: "Грейд",
        cell: ({ row }) => (
            <div className="capitalize font-extrabold text-lg">{row.getValue("grade")}</div>
        ),
    },
    {
        accessorKey: "profession",
        header: "Профессия",
        cell: ({ row }) => (
            <div className="capitalize font-bold  text-xl">{row.getValue("profession")}</div>
        ),
    },
    {
        accessorKey: "averageSalaryByGrades",
        header: ({ column }) => {
            return (
                <div className={'text-center'}>
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Средняя зарплата по грейду
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>

            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("averageSalaryByGrades"))
            const formatted = new Intl.NumberFormat("ru-RU", {
                style: "currency",
                currency: "RUB",
            }).format(amount)
            return (<div className="text-center lowercase text-xl">~ {formatted}</div>)
        },
    },
    {
        accessorKey: "amountOfVacancies",
        header: () => <div className="text-center">Количество вакансий</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amountOfVacancies"))
            return (<div className="font-medium text-center  text-xl">{amount}</div>)
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export function Statistics() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

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
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Поиск по профессиям"
                    value={(table.getColumn("profession")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("profession")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
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
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
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
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
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
                    {/*{table.getFilteredSelectedRowModel().rows.length} of{" "}*/}
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
    )
}
