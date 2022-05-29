import { IDatabasePostState } from 'constants/immediate-states/post.state'
import React from 'react'
import Post, { PostInterestHandler } from './Post'

const Posts = (props: {
  posts: IDatabasePostState[]
  postInterestHandler: PostInterestHandler
}) => {
  const { posts, postInterestHandler } = props
  return (
    <React.Fragment>
      {posts.map((element, index) => (
        <Post
          key={index}
          post={element}
          postInterestHandler={postInterestHandler}
        />
      ))}
    </React.Fragment>
  )
}

export default Posts
