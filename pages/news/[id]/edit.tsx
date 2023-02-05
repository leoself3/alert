import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRotateLeft,
  faFloppyDisk,
} from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import { hasCookie } from 'cookies-next'

import Header from '../../../components/Header'
import DatePicker from '../../../components/DatePicker'
import TextInput from '../../../components/TextInput'
import TextEditor from '../../../components/TextEditor'
import MultiInput from '../../../components/MultiInput'
import Footer from '../../../components/Footer'
import { updateNews } from '../../api/apiCaller'
import { BASE_URL } from '../../../config'
import { News } from '../../types'

const EditNews: React.FC<{ token: boolean; news: News }> = ({
  token,
  news,
}) => {
  const [title, setTitle] = useState(news?.title || '')
  const [photo, setPhoto] = useState<File>()
  const [name, setName] = useState(news?.username || '')
  const [published, setPublished] = useState(news?.published_at || '')
  const [editor, setEditor] = useState(news?.description || '')
  const [hashtagList, setHashtagList] = useState<string[]>(news?.hashtags || [])
  const router = useRouter()

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoto(event.target?.files ? event.target?.files[0] : undefined)
  }

  const getContent = (htmlContent: string) => {
    const content = htmlContent.replace('<p></p>', '<br />')
    setEditor(content)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.stopPropagation()
    event.preventDefault()

    const formData = new FormData()
    formData.append('title', title)
    formData.append('photo', photo || '')
    formData.append('username', name)
    formData.append('hashtags', JSON.stringify(hashtagList))
    formData.append('description', editor)
    formData.append('published_at', published)

    updateNews(formData, news?.id)
      .then(({ data }) => {
        router.push('/news')
        toast.success('The news was updated successfully!')
      })
      .catch((error) => {
        toast.error(error)
      })
  }

  return (
    <>
      <Header token={token} />
      <Head>
        <title>Public Figures News. Career, Wealth And Death</title>
      </Head>
      <div className='container mx-auto flex justify-center'>
        <div className='m-3 md:m-10'>
          <span className='text-4xl flex justify-center font-bold mb-5'>
            News
          </span>
          <form onSubmit={handleSubmit}>
            <div className='form-group mb-5'>
              <input
                className='form-control block w-full px-3 text-base font-normal h-full text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  :border-blue-600 focus:outline-none'
                type='file'
                id='formFile'
                onChange={onFileChange}
              />
            </div>
            <div className='form-group mb-5'>
              <TextInput
                name='title'
                label='Title'
                type='string'
                value={title}
                setValue={setTitle}
              />
            </div>
            <div className='grid md:grid-cols-2 md:gap-6'>
              <TextInput
                name='name'
                label='Name'
                type='text'
                value={name}
                setValue={setName}
              />
              <DatePicker
                label='Published Date'
                value={published}
                setValue={setPublished}
              />
            </div>
            <MultiInput
              name='hashtag'
              label='Hashtags'
              list={hashtagList}
              setList={setHashtagList}
            />
            <div className='mt-3 form-group p-1 min-w-[400px] border'>
              <TextEditor getContent={getContent} />
            </div>
            <div className='flex justify-between mt-3'>
              <Link
                href='/news'
                className='p-2 flex focus:ring-4 focus:outline-none font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                <FontAwesomeIcon
                  className='mr-2 w-4'
                  icon={faArrowRotateLeft}
                />
                <p className='flex items-center'>To News List</p>
              </Link>
              <button
                type='submit'
                className='flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                <FontAwesomeIcon
                  className='text-white mr-2 w-4'
                  icon={faFloppyDisk}
                />
                <p className='flex items-center'>Save</p>
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { id } = context.query
    const token = hasCookie('admin_token', {
      req: context.req,
      res: context.res,
    })
    if (!token) {
      return {
        redirect: {
          destination: '/admin',
          permanent: false,
        },
      }
    }
    const res = await fetch(`${BASE_URL}/news/${id}`)
    const news = await res.json()

    return {
      props: {
        news: news?.article,
        token,
      },
    }
  } catch (error) {
    return { props: { token: null } }
  }
}

export default EditNews
