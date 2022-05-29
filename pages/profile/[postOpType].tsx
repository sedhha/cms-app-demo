import React, { useEffect } from 'react'
import Profile from 'components/Profile/Profile'
import { useAppDispatch, useAppSelector } from '@redux-imports/tools/hooks'
import { useRouter } from 'next/router'
import { NAVIGATION_ROUTES } from 'constants/routes'

type Props = {}

export default function PostOpType({}: Props) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { isLoggedIn } = useAppSelector((state) => state.user)
  useEffect(() => {
    if (!isLoggedIn) router.push(NAVIGATION_ROUTES.LOGIN)
  }, [])
  return <Profile />
}
