import { IDatabasePostState } from 'constants/immediate-states/post.state'
import React from 'react'

export type PostInterestHandler = (docId: string) => void
export default function Post(props: {
  post: IDatabasePostState
  postInterestHandler: PostInterestHandler
}) {
  const {
    post: { address, size, rooms, monthlyRent, securitDeposit },
  } = props
  return (
    <React.Fragment>
      <div className="flex flex-col gap-1 p-2 border-2 border-indigo-400">
        <h1 className="text-lg font-semibold text-indigo-600 text-std">
          Location :- {address}
        </h1>
        <label className="text-std text-md">Size :- {size}</label>
        <label className="text-std text-md">Room Type :- {rooms}</label>
        <label className="text-std text-md">
          Monthly Rent :- &#8377;{monthlyRent}
        </label>
        <label className="text-std text-md">
          Room Type :- &#8377;{securitDeposit}
        </label>
      </div>
      <button
        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded focus:shadow-outline hover:bg-blue-700 focus:outline-none"
        type="button"
        onClick={() =>
          props.postInterestHandler(props.post.docId ?? 'Unknown Doc Id')
        }
      >
        Show Interest
      </button>
    </React.Fragment>
  )
}
