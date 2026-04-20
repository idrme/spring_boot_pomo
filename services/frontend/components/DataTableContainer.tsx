"use client";
import { columns, Task } from "@/app/history/columns"
import { DataTable } from "@/app/history/data-table"
import { useEffect, useState } from "react";

export function DataTableContainer() {

    const [data, setData] = useState<Task[]>([]);

    useEffect(() => {
        try {
            const getTasks = async () => {
                const res = await fetch(`/api/private/myTasks`,
                {
                    method: "GET",
                    credentials : "include"
                }
                );
                if (res.ok)
                {
                    // alert("ok");
                    const received : Task[] = await res.json();
                    setData([]);
                    for (const task of received) {
                        setData(prevData => [...prevData, task]);
                    }

                }
            }
            getTasks();
        } catch (err)
        {
        }
    }, []);

    return (
        <div>
            <DataTable columns={columns} data={data} />
        </div>
    )
}