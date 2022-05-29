import React, { useEffect } from 'react'
import Header from './Header'
import { useRouter } from 'next/router'
import { useAppSelector } from '@redux-imports/tools/hooks'
import { NAVIGATION_ROUTES, PROFILE_ROUTES } from 'constants/routes'
import ViewPost from './ViewPost'
import AddPost from './AddPost'
import MyPosts from './MyPosts'
import Head from 'next/head'
import { siteMetaData } from 'constants/metadata'

export default function Profile() {
  const router = useRouter()
  const postOpType = router.query.postOpType
  const { isLoggedIn } = useAppSelector((state) => state.user)
  useEffect(() => {
    if (!isLoggedIn) router.push(NAVIGATION_ROUTES.LOGIN)
  }, [isLoggedIn])

  let RenderComponent = <div>Unknown Route</div>
  switch (postOpType) {
    case PROFILE_ROUTES.VIEW_ARTICLES: {
      RenderComponent = <ViewPost />
      break
    }
    case PROFILE_ROUTES.ADD_ARTICLES: {
      RenderComponent = <AddPost />
      break
    }
    case PROFILE_ROUTES.REVIEW_ARTICLES: {
      RenderComponent = <MyPosts />
      break
    }
    default:
      break
  }
  return (
    <React.Fragment>
      <Head>
        <title>{siteMetaData.title}: Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col w-full h-full">
        <Header postOpType={(postOpType as string) ?? 'view-post'} />
        {RenderComponent}
      </div>
    </React.Fragment>
  )
}
