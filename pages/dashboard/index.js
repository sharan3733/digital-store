import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Heading from "@/components/Heading";
import Link from "next/link";

export default function Dashboard() {
    const { data: session, status, } = useSession()
    const router = useRouter()

    const loading = status === 'loading'

    if (loading) {
        return null
    }

    if (!session) {
        router.push('/')
        return
    }
    if (session && !session.user.name) {
        router.push('/setup')
        return
    }
    return (
        <div>
            <Heading />

            <h1 className="flex justify-center mt-20 text-xl">Dashboard</h1>

            <div className="flex justify-center mt-10">
                <Link href={`/dashboard/new`} className='text-xl border p-2'>
                    Create a new product
                </Link>
            </div>

        </div>
    )
}