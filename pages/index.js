
import { Inter } from 'next/font/google'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Heading from '@/components/Heading'

const inter = Inter({ subsets: ['latin'] })

export default function Index() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return null
  }
  return (
    <div>
      <Heading />
      <h1 className='flex justify-center mt-20 text-xl'>Welcome!</h1>

    </div>
  )
}
