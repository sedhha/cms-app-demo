import { IDatabasePostState } from 'constants/immediate-states/post.state'
import React from 'react'

export type ApproveUserUid = (docId: string, requestorUid: string) => void
export default function Post(props: {
  post: IDatabasePostState
  approveUserUid: ApproveUserUid
}) {
  const {
    post: {
      address,
      size,
      rooms,
      monthlyRent,
      securitDeposit,
      interestedUsers,
    },
    approveUserUid,
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
        <div>
          <p className="text-indigo-600">Interested Users:</p>
          <div className="flex flex-col px-2">
            {interestedUsers?.map((user, index) => (
              <div key={index} className="flex flex-row items-center gap-1">
                <label className="text-std text-md">Email:</label>
                <label className="text-std text-md">{user.email}</label>
                <button
                  type="button"
                  onClick={() =>
                    approveUserUid(
                      props.post.docId ?? 'Undefined Doc Id',
                      user.uid
                    )
                  }
                  className="p-1 font-bold text-white bg-blue-500 rounded focus:shadow-outline hover:bg-blue-700 focus:outline-none"
                >
                  Approve
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
