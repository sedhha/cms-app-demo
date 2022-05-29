import { NAVIGATION_ROUTES, PROFILE_ROUTES } from 'constants/routes'
import Link from 'next/link'
import React from 'react'
import Auth from '@frontent-utils/firebase-client'
import { useAppDispatch, useAppSelector } from '@redux-imports/tools/hooks'
import { resetToInitState } from '@redux-imports/slices/posts'
import { useRouter } from 'next/router'
const activeStyle = 'text-indigo-600 underline'

type Props = {
  postOpType: string
}

export default function Header(props: Props) {
  const { postOpType } = props
  const router = useRouter()
  const signOut = () => {
    Auth.signOut()
    dispatch(resetToInitState())
    router.push(NAVIGATION_ROUTES.LOGIN)
  }
  const dispatch = useAppDispatch()
  const { userRole } = useAppSelector((state) => state.user)
  return (
    <div className="flex flex-row justify-around w-full p-2">
      {(userRole === 'Admin' || userRole === 'Super-Admin') && (
        <Link href={NAVIGATION_ROUTES.PROFILE_ADD_POST}>
          <a
            className={
              postOpType === PROFILE_ROUTES.ADD_ARTICLES ? activeStyle : ''
            }
          >
            Add Post
          </a>
        </Link>
      )}
      <Link href={NAVIGATION_ROUTES.PROFILE_VIEW_POST}>
        <a
          className={
            postOpType === PROFILE_ROUTES.VIEW_ARTICLES ? activeStyle : ''
          }
        >
          View Post
        </a>
      </Link>

      {(userRole === 'Admin' || userRole === 'Super-Admin') && (
        <Link href={NAVIGATION_ROUTES.PROFILE_MY_POST}>
          <a
            className={
              postOpType === PROFILE_ROUTES.REVIEW_ARTICLES ? activeStyle : ''
            }
          >
            My Posts
          </a>
        </Link>
      )}
      <a onClick={signOut} className="cursor-pointer">
        Sign Out
      </a>
    </div>
  )
}
