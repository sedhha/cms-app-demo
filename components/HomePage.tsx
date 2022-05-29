import { NAVIGATION_ROUTES } from 'constants/routes'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { siteMetaData } from '../constants/metadata'
const Home: NextPage = () => {
  const router = useRouter()
  const navigateToLogin = () => router.push(NAVIGATION_ROUTES.LOGIN)
  const navigateToRegister = () => router.push(NAVIGATION_ROUTES.REGISTER)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>{siteMetaData.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        <h1 className="text-4xl font-bold font-std">
          Content Management System
        </h1>
        <br />
        <button
          type="button"
          onClick={navigateToLogin}
          className="mr-2 mb-2 w-1/5 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
        <button
          type="button"
          onClick={navigateToRegister}
          className="mr-2 mb-2 w-1/5 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register
        </button>
      </main>
    </div>
  )
}

export default Home
