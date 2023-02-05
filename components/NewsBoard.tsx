import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import NewsItem from './NewsItem'
import { News } from '../pages/types'

interface Props {
  news: News[]
  token: boolean
}

const NewsBoard: React.FC<Props> = ({ news, token }) => {
  const router = useRouter()
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

  return (
    <>
      <div className='px-5 my-8 mt-[50px]'>
        <button
          type='button'
          className={
            'p-2 px-4 bg-[#009ef7] text-white rounded-lg mr-2 font-semibold flex ' +
            (!token && 'hidden')
          }
          onClick={() => {
            router.push('/news/add')
          }}
        >
          <FontAwesomeIcon className='mr-1 w-5' icon={faPlus} />
          Add
        </button>
      </div>
      {news && news?.length ? (
        news.map((item, index) => (
          <div
            className='p-3 cursor-pointer'
            onClick={() => {
              router.push(`/news/${item?.id}`)
            }}
            key={item?.id}
          >
            <NewsItem news={item} />
            {index % 2 === 1 && (
              <>
                <ins
                  className='adsbygoogle h-full'
                  style={{ display: 'block', maxHeight: '280px' }}
                  data-ad-client='ca-pub-4007300633906997'
                  data-ad-slot='6271394721'
                ></ins>
              </>
            )}
          </div>
        ))
      ) : (
        <span className='text-xl flex justify-center'>
          There is no any news.
        </span>
      )}
    </>
  )
}

export default NewsBoard
