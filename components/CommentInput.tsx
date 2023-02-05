import React, { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

import { addCommentOnNews, addCommentOnDead } from '../pages/api/apiCaller'
import TextInput from './TextInput'
import { Comment } from '../pages/types'

interface Props {
  deadId?: number
  newsId?: number
  comments: Comment[] | undefined
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>
}

const CommentInput: React.FC<Props> = ({
  deadId,
  newsId,
  comments,
  setComments,
}) => {
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newsId) {
      addCommentOnNews(newsId, name, comment)
        .then(({ data }) => {
          toast.success('Comment was added successfully!')
          setComments &&
            setComments(comments ? [...comments, data.comment] : [data.comment])
          setName('')
          setComment('')
        })
        .catch((error) => {
          toast.error(error)
        })
    } else if (deadId) {
      addCommentOnDead(deadId, name, comment)
        .then(({ data }) => {
          toast.success('Comment was added successfully!')
          setComments &&
            setComments(comments ? [...comments, data.comment] : [data.comment])
          setName('')
          setComment('')
        })
        .catch((error) => {
          toast.error(error)
        })
    }
  }

  const changeComment = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setComment(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        name='name'
        label='Name'
        type='text'
        value={name}
        setValue={setName}
      />
      <textarea
        id='comment'
        rows={4}
        name='comment'
        className='block p-4 w-full min-h-[190px] text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        placeholder='Leave Comment'
        value={comment}
        onChange={changeComment}
      ></textarea>
      <button
        type='submit'
        className='bg-[#5241fe] py-4 px-[60px] text-lg text-white font-bold rounded-full ml-auto flex my-4'
      >
        Post
      </button>
    </form>
  )
}

export default CommentInput
