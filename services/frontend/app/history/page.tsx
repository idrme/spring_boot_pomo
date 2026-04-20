import { cookies } from 'next/headers'
import * as jwt from 'jsonwebtoken'
import { redirect } from 'next/navigation'
import { columns, Task } from "./columns"
import { DataTable } from "./data-table"
import { DataTableContainer } from '@/components/DataTableContainer'
 

export default async function Page() {

    // Vérifie si le JWT en cookie est valide
    const cookieStore = await cookies();
    const token = await cookieStore.get('jwt')?.value
    if (!token) {
        redirect('/')
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
        redirect('/')
    }

    return (
        <div className=" ">
            <div className=" text-left ">
                <h1 className="text-5xl mb-10 text-center font-bold">History of last tasks</h1>
                        <DataTableContainer />
            </div>
        </div>
    )
}

