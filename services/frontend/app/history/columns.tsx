"use client"
 
import { ColumnDef } from "@tanstack/react-table"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Task = {
  id: number
  title: string
  completed : boolean
  time : number
  createdAt : string
}
 
export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Task name",
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "completed",
    header: "Finished",
  },
]