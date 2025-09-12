"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryColumn = {
  imageUrl: string
  id: string
  name: string
  billboardLabel: string
  createdAt: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    id: "name",
    header: "Name",
  },
  {
    accessorKey: "billboardLabel",
    id: "billboardLabel",
    header: "Billboard",
    cell: ({row}) => row.original.billboardLabel,
  },
  {
    accessorKey: "createdAt",
    id: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({row}) => <CellAction data={row.original} />
  }
]