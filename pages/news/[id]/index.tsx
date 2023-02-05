import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { hasCookie } from 'cookies-next'
import { toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

import Header from '../../../components/Header'
import Comments from '../../../components/Comments'
import CommentInput from '../../../components/CommentInput'
import ShareButtons from '../../../components/ShareButtons'
import Footer from '../../../components/Footer'
import { deleteNews, getCommentsByNews } from '../../api/apiCaller'
import { APP_URL, BASE_URL } from '../../../config'
import { isAdmin } from '../../../config/utils'
import { Comment, News } from '../../types'

interface Props {
  data: {
    news: News
    comments: Comment[]
  }
  token: boolean
}

const myLoader = ({ src, width }: { src: string; width: number }) => {
  return `${src}?w=${width}`
}

const NewsDetail: React.FC<Props> = ({ data, token }) => {
  const router = useRouter()
  const id = router.query.id
  const [news, setNews] = useState(data?.news)
  const [hashtagList, setHashtagList] = useState<string[]>()
  const [comments, setComments] = useState(data?.comments)
  const [commentFlag, setCommentFlag] = useState(false)
  let text = data?.news?.description.replace(/(<([^>]+)>)/gi, '')
  text = text.replace(/&nbsp;/gi, '')
  let adsbygoogle = []

  useEffect(() => {
    var ads = document.getElementsByClassName('adsbygoogle').length
    for (var i = 0; i < ads; i++) {
      try {
        if (typeof window !== undefined && typeof window !== null)
          (adsbygoogle = (window as any).adsbygoogle || []).push({})
      } catch (e) {}
    }
  }, [])

  useEffect(() => {
    setNews(data?.news)
    setComments(data?.comments)
    if (typeof data?.news?.hashtags === 'string') {
      setHashtagList(data?.news?.hashtags?.split(','))
    } else {
      setHashtagList(data?.news?.hashtags)
    }
  }, [data])

  useEffect(() => {
    id &&
      getCommentsByNews(id[0])
        .then(({ data }) => {
          setComments(data.comments)
        })
        .catch((error) => {
          toast.error(error)
        })
  }, [id, commentFlag])

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    confirmAlert({
      title: 'Delete',
      message: 'Are you sure to delete this news?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            if (isAdmin()) {
              deleteNews(news?.id)
                .then(({ data }) => {
                  toast.success('The news was removed successfully!')
                  router.push('/news')
                })
                .catch((error) => {
                  toast.error('Deleting the news was failed!')
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
      <Head>
        <meta charSet='utf-8' />
        <title>Public Figures News. Career, Wealth And Death</title>
        <link rel='canonical' href={`${APP_URL}/news/${router.query.id}`} />
        <meta property='og:title' content={news?.title} />
        <meta
          property='og:image'
          content={news?.photo || `${APP_URL}/default_user.png`}
        />
        <meta property='og:type' content='article' />
        <meta
          property='og:url'
          content={`${APP_URL}/news/${router.query.id}`}
        />
        <meta property='og:description' content={text} />
        <meta key='twitter-title' name='twitter:title' content={news?.title} />
        <meta
          key='twitter-description'
          name='twitter:description'
          content={text}
        />
        <meta
          name='twitter:image'
          content={news?.photo || `${APP_URL}/default_user.png`}
        />
      </Head>
      <div className='container mx-auto flex justify-center'>
        <div className='p-4 max-w-[1000px] w-full'>
          <span className='text-4xl font-bold mb-5'>{news?.title}</span>
          <ShareButtons title={news?.title} hashtags={news?.hashtags || ''} />
          {hashtagList && (
            <div className='flex mt-2'>
              {hashtagList?.map((tag, index) => (
                <span className='pr-3' key={index}>
                  #{tag}
                </span>
              ))}
            </div>
          )}
          <div className='flex gap-1 pt-1 text-base items-center'>
            <span>By</span>
            <span className='text-lg text-[#e3128e]'>{news?.username}</span>
            <span className='px-1'>|</span>
            <span>{moment(news?.published_at).format('MMMM DD YYYY')}</span>
            {news?.Comment && (
              <span className='px-2'>
                |&nbsp;&nbsp;{news.Comment.length}&nbsp;comments
              </span>
            )}
          </div>
          <Image
            loader={myLoader}
            className='w-full p-3 h-auto'
            src={news?.photo}
            width={500}
            height={300}
            alt='photo'
          />
          <ins
            className='adsbygoogle h-full'
            style={{ display: 'inline-block', width: '728px', height: '90px' }}
            data-ad-client='ca-pub-4007300633906997'
            data-ad-slot='6271394721'
          ></ins>
          <div className='text-[#6c6c6c] mt-2'>
            <span
              dangerouslySetInnerHTML={{ __html: news?.description }}
            ></span>
          </div>
          <div className={isAdmin() ? 'flex justify-end mt-4' : 'hidden'}>
            <Link
              className='p-2 px-5 border border-[#30d700] rounded-full text-[#30d700] hover:bg-[#30d700] hover:text-white flex mr-4'
              href={`/news/${news?.id}/edit`}
            >
              <FontAwesomeIcon className='mr-2 w-4 h-full' icon={faEdit} />
              <p>Edit</p>
            </Link>
            <button
              className='p-2 px-5 border border-[#f73000] rounded-full text-[#f73000] hover:bg-[#f73000] hover:text-white flex'
              onClick={handleDelete}
            >
              <FontAwesomeIcon className='mr-2 w-4' icon={faTrash} />
              <p>Delete</p>
            </button>
          </div>
          <ins
            className='adsbygoogle h-full'
            style={{ display: 'inline-block', width: '728px', height: '90px' }}
            data-ad-client='ca-pub-4007300633906997'
            data-ad-slot='6271394721'
          ></ins>
          <div className='mt-5'>
            <Comments
              comments={comments}
              flag={commentFlag}
              setFlag={setCommentFlag}
            />
            <CommentInput
              newsId={news?.id}
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
    const { id } = context.query
    const res = await fetch(`${BASE_URL}/news/${id}`)
    const news = await res.json()
    const resComments = await fetch(`${BASE_URL}/comments/dead/${id}`)
    const comments = await resComments.json()
    const token = hasCookie('admin_token', {
      req: context.req,
      res: context.res,
    })

    return {
      props: {
        data: {
          news: news?.article,
          comments: comments?.comments,
        },
        token,
      },
    }
  } catch (error) {
    return {
      props: {
        data: {
          news: null,
          comments: null,
        },
      },
    }
  }
}

export default NewsDetail
