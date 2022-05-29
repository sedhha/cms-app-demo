import { IDatabasePostState } from 'constants/immediate-states/post.state'
import React from 'react'
import SelfPost, { ApproveUserUid } from './SelfPost'

const SelfPosts = (props: {
  posts: IDatabasePostState[]
  approveUserUid: ApproveUserUid
}) => {
  const { posts, approveUserUid } = props
  return (
    <React.Fragment>
      {posts.map((element, index) => (
        <SelfPost key={index} post={element} approveUserUid={approveUserUid} />
      ))}
    </React.Fragment>
  )
}

export default SelfPosts
