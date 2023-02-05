import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Head from 'next/head.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'react-toastify'
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { confirmAlert } from 'react-confirm-alert'
import moment from 'moment'

import Header from '../../components/Header'
import Comments from '../../components/Comments'
import CommentInput from '../../components/CommentInput'
import Footer from '../../components/Footer'
import { updateCandle, deleteDeadPerson } from '../api/apiCaller'
import { APP_URL, BASE_URL } from '../../config'
import { DeadPerson, Comment } from '../types'
import { isAdmin, isCookie } from '../../config/utils'
import { getCookie, hasCookie, setCookie } from 'cookies-next'
import Link from 'next/link'

interface Props {
  data: {
    detail: DeadPerson
    comments: Comment[]
  }
  token: boolean
}

const myLoader = ({ src, width }: { src: string; width: number }) => {
  return `${src}?w=${width}`
}

const Detail: React.FC<Props> = ({ data, token }) => {
  const router = useRouter()
  const urlname = router.asPath
  const [detail, setDetail] = useState(data?.detail)
  const [comments, setComments] = useState<Comment[]>(data?.comments)
  const [candles, setCandles] = useState(data?.detail?.candles)
  const [candle, setCandle] = useState(false)
  const array = hasCookie('candle') ? (getCookie('candle') as string) : ''
  const list: Array<string> = array.split(',')

  useEffect(() => {
    setCandle(list.includes(urlname))
  }, [list, urlname])

  useEffect(() => {
    setDetail(data?.detail)
  }, [data])

  const handleCandle = () => {
    let number = 1
    if (!isCookie()) {
      return
    }
    const index = list.indexOf(urlname)
    if (candle && !isAdmin()) {
      number = -1
      setCandle(false)
      if (index !== -1) {
        list.splice(index, 1)
      }
      setCookie('candle', list.toString(), { maxAge: 1000 * 3600 * 24 * 365 })
    } else {
      setCandle(true)
      if (index === -1) {
        list?.push(urlname)
      }
      setCookie('candle', list.toString(), { maxAge: 1000 * 3600 * 24 * 365 })
    }
    updateCandle(urlname, number)
      .then(({ data }) => {
        setCandles(data?.candles)
      })
      .catch((error) => {})
  }

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    confirmAlert({
      title: 'Delete',
      message: 'Are you sure to delete this person?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            if (isAdmin() && detail?.urlname) {
              deleteDeadPerson(detail?.urlname)
                .then(({ data }) => {
                  toast.success('The person was removed successfully!')
                  router.push('/list')
                })
                .catch((error) => {
                  toast.error('Deleting the person was failed!')
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
    <>
      <Header token={token} />
      <div className='container mx-auto flex justify-center'>
        <div className='p-2 md:p-16 mt-10'>
          <Head>
            <meta charSet='utf-8' />
            <title>Public Figures News. Career, Wealth And Death</title>
            <link rel='canonical' href={`${APP_URL}/${router.query.urlname}`} />
            <meta
              property='og:title'
              content={'Death of ' + detail?.fullname + ' , Age ' + detail?.age}
            />
            <meta property='og:type' content='article' />
            <meta
              property='og:url'
              content={`${APP_URL}/${router.query.urlname}`}
            />
            <meta
              property='og:image'
              content={detail?.photo || `${APP_URL}/default_user.png`}
            />
            <meta
              property='og:description'
              content={
                'Read about ' +
                detail?.fullname +
                ' net worth, career and death'
              }
            />
            <meta
              key='twitter-title'
              name='twitter:title'
              content={'Death of ' + detail?.fullname + ' , Age ' + detail?.age}
            />
            <meta
              key='twitter-description'
              name='twitter:description'
              content={
                'Read about ' +
                detail?.fullname +
                ' net worth, career and death'
              }
            />
            <meta
              name='twitter:image'
              content={detail?.photo || `${APP_URL}/default_user.png`}
            />
          </Head>
          <div className='block w-full lg:flex lg:mr-8'>
            <div className='md:ml-4'>
              <Image
                loader={myLoader}
                src={detail?.photo || './default_user.png'}
                className='rounded-lg object-cover w-full'
                width={300}
                height={200}
                alt='photo'
              />
            </div>
            <div className='md:ml-8 w-full'>
              <div className='pt-10 min-[450px]:flex min-[450px]:justify-between'>
                <div className='flex mr-5'>
                  <div className='flex flex-col mr-10 md:mr-24'>
                    <p className='text-2xl font-semibold'>{detail?.fullname}</p>
                    <div className='pt-4 flex justify-between'>
                      <div className='flex'>
                        <p className='font-semibold text-lg mr-1'>age:</p>
                        <p className='text-md flex items-center'>
                          {detail?.age}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className='flex items-center mr-5'
                    onClick={handleCandle}
                  >
                    <Image
                      className='cursor-pointer shrink-0 cover-content min-w-[40px]'
                      src={
                        candle
                          ? '/images/open-candle.png'
                          : '/images/close-candle.png'
                      }
                      width={40}
                      height={50}
                      alt='candle'
                    />
                  </div>
                  <p className='text-xl flex items-center'>{candles}</p>
                </div>
                <div className='flex items-center mr-5'>
                  <p className='mr-3 flex items-top text-xl'>Socials:</p>
                  <div className='flex items-top'>
                    <a href={detail?.facebook} target='blank'>
                      <FontAwesomeIcon
                        className={
                          'mr-3 text-[#009ef7] text-2xl cursor-pointer w-4 ' +
                          (detail?.facebook ? '' : 'hidden')
                        }
                        icon={faFacebookF}
                      />
                    </a>
                    <a href={detail?.twitter} target='blank'>
                      <FontAwesomeIcon
                        className={
                          'mr-3 text-[#009ef7] text-2xl cursor-pointer w-6 ' +
                          (detail?.twitter ? '' : 'hidden')
                        }
                        icon={faTwitter}
                      />
                    </a>
                    <a href={detail?.instagram} target='blank'>
                      <FontAwesomeIcon
                        className={
                          'mr-3 text-[#009ef7] text-2xl cursor-pointer w-6 ' +
                          (detail?.instagram ? '' : 'hidden')
                        }
                        icon={faInstagram}
                      />
                    </a>
                    <a href={detail?.youtube} target='blank'>
                      <FontAwesomeIcon
                        className={
                          'mr-3 text-[#009ef7] text-2xl cursor-pointer w-7 ' +
                          (detail?.youtube ? '' : 'hidden')
                        }
                        icon={faYoutube}
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className='mt-6 min-[450px]:flex'>
                <div className='mb-3'>
                  <p className='font-semibold text-md'>Born:</p>
                  <p className='min-[450px]:max-w-[200px]'>
                    {moment(detail?.birthday).format('DD MMMM YYYY.')}
                  </p>
                  <p className=''>{detail?.birthplace}</p>
                </div>
                <div className='min-[450px]:ml-10 mb-3'>
                  <p className='font-semibold text-md'>Died:</p>
                  <p className='min-[450px]:max-w-[200px]'>
                    {moment(detail?.deadDay).format('DD MMMM YYYY.')}
                  </p>
                  <p className=''>{detail?.deadPlace}</p>
                </div>
                <div className='min-[450px]:ml-10 mb-3'>
                  <p className='font-semibold text-md'>Cause of death:</p>
                  <p className='min-[450px]:max-w-[200px]'>{detail?.reason}</p>
                </div>
                <div className='min-[450px]:ml-10 mb-3'>
                  <p className='font-semibold text-md'>Net Worth:</p>
                  <p className='min-[450px]:max-w-[200px]'>
                    {detail?.netWorth}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-10'>
            <p className='font-semibold text-xl'>Career</p>
            <div
              className='text-sm'
              dangerouslySetInnerHTML={{ __html: detail?.career || '' }}
            />
          </div>
          <div className='mt-10'>
            <p className='font-semibold text-xl'>Death</p>
            <div
              className='text-sm'
              dangerouslySetInnerHTML={{ __html: detail?.death || '' }}
            />
          </div>
          <div className={isAdmin() ? 'flex justify-end mt-4' : 'hidden'}>
            <Link
              className='p-2 px-5 border border-[#30d700] rounded-full text-[#30d700] hover:bg-[#30d700] hover:text-white flex mr-4'
              href={`/${detail?.urlname}/edit`}
            >
              <FontAwesomeIcon className='mr-2 w-4 h-full' icon={faEdit} />
              <p>Edit</p>
            </Link>
            <button
              className='p-2 px-5 border border-[#f73000] rounded-full text-[#f73000] hover:bg-[#f73000] hover:text-white flex'
              onClick={handleDelete}
            >
              <FontAwesomeIcon className='mr-2 w-4 h-full' icon={faTrash} />
              <p>Delete</p>
            </button>
          </div>
          <div className='mt-5'>
            <Comments comments={comments} />
            <CommentInput
              deadId={detail?.id}
              comments={comments}
              setComments={setComments}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { urlname } = context.query

    const res = await fetch(`${BASE_URL}/deadpeople/${urlname}`)
    const detail = await res.json()
    let comments: any
    if (detail?.id) {
      const resComments = await fetch(`${BASE_URL}/comments/dead/${detail?.id}`)
      comments = await resComments.json()
    }
    const token = hasCookie('admin_token', {
      req: context.req,
      res: context.res,
    })

    return { props: { data: { detail, comments: comments?.comments }, token } }
  } catch (error) {
    return {
      props: { data: { detail: null, comments: null }, token: null },
    }
  }
}

export default Detail
