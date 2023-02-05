import React from 'react'
import { confirmAlert } from 'react-confirm-alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'

import { deleteComment } from '../pages/api/apiCaller'
import { Comment } from '../pages/types'
import { isAdmin } from '../config/utils'

interface Props {
  comments: Comment[] | undefined
  flag?: boolean
  setFlag?: React.Dispatch<React.SetStateAction<boolean>>
}

const Comments: React.FC<Props> = ({ comments, flag, setFlag }) => {
  const handleDelete = (id: number) => {
    confirmAlert({
      title: 'Delete',
      message: 'Are you sure to delete this comment?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            if (isAdmin()) {
              deleteComment(id)
                .then(({ data }: any) => {
                  toast.success('The comment was removed successfully!')
                  if (flag !== undefined) setFlag && setFlag(!flag)
                })
                .catch((error: any) => {
                  toast.error('Deleting the comment was failed!')
                })
            }
          },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    })
  }

  return (
    <div className='my-5'>
      <div>
        <div className='mb-5'>
          <span className='text-2xl font-bold'>{`Comments (${
            (comments && comments.length) || '0'
          })`}</span>
        </div>
        {comments &&
          comments?.map((comment) => (
            <div
              className='flex justify-between mb-3 pl-4 w-full border-b pb-4'
              key={comment.id}
            >
              <div className='flex flex-col w-full'>
                <span className='text-xl font-bold pb-3'>
                  {comment?.username}
                </span>
                <span>{comment?.content}</span>
              </div>
              <div
                className={
                  'flex items-center mr-3 ' + (isAdmin() ? '' : 'hidden')
                }
              >
                <button
                  className='w-8 h-8 border border-[#f73000] rounded-full text-[#f73000] hover:bg-[#f73000] hover:text-white'
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleDelete(comment?.id)
                  }}
                >
                  <FontAwesomeIcon className='m-auto w-5' icon={faXmark} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Comments
