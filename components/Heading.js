import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"

export default function Heading() {
    const router = useRouter()

    const {data: session, status} = useSession()
    const loading = status === 'loading'
    if(loading) {
        return null
    }

    return(
        <header className="flex px-5 pt-5 pb-2 h-14">
            <div className="text-xl">
                {router.asPath === '/' ? (
                    <p>Digital Downloads</p>
                ):(
                    <Link href={`/`} className='underline'>
                        Home
                        </Link>
                )}
            </div>
            <div className='ml-10 -mt-1 grow'></div>
            {session &&
            (router.asPath === '/dashboard' ?(
                <a className="flex">
                    <p className="mr-3 font-bold">Dashboard</p>
                </a>
            ):(
                <Link href={`/dashboard`} className='flex'>
                    <p className="mr-3 underline">Dashboard</p>
                </Link>
            ))}
            <a className="px-4 font-bold border rounded-full flex-l"
            href={session ? '/api/auth/signout':'/api/auth/signin'}>
                {session ? 'logout' : 'login'}
            </a>

        </header>
    )

}