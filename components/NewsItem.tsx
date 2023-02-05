import React from 'react'
import moment from 'moment'
import Image from 'next/image'
import { News } from '../pages/types'

interface Props {
  news: News
}

const imageLoader = ({ src, width }: { src: string; width: number }) => {
  return `${src}?w=${width}`
}

const NewsItem: React.FC<Props> = (props) => {
  const { news } = props
  const commentLength = news.Comment?.length
  let hashtagList: string[] = []
  if (typeof news.hashtags === 'string' && news.hashtags) {
    hashtagList = news.hashtags.split(',')
  }
  const hashtagsLength = hashtagList?.length

  return (
    <div className='sm:flex'>
      <div className='w-full p-3 sm:p-0 sm:w-[180px] sm:min-w-[180px] sm:h-[160px] flex'>
        <Image
          className={'w-full object-cover'}
          src={news?.photo}
          loader={imageLoader}
          width={200}
          height={200}
          alt='photo'
        />
      </div>
      <div className='p-4 text-[#6c6c6c]'>
        <span className='text-xl font-bold text-[#424242]'>{news?.title}</span>
        {hashtagsLength ? (
          <div className='flex'>
            {hashtagList.map((tag, index) => (
              <span className='pr-3' key={index}>
                #{tag}
              </span>
            ))}
          </div>
        ) : (
          <br />
        )}
        <div className='flex gap-1 pt-1 text-base'>
          <span>By</span>
          <span className='text-lg text-[#e3128e]'>{news?.username}</span>
          <span className='px-1'>|</span>
          <span>{moment(news?.published_at).format('MMMM DD YYYY')}</span>
          {commentLength && (
            <span className='px-2'>
              |&nbsp;&nbsp;{commentLength}&nbsp;comments
            </span>
          )}
        </div>
        <div
          className='pt-1 overflow-hidden max-h-[50px]'
          dangerouslySetInnerHTML={{ __html: news?.description }}
        ></div>
      </div>
    </div>
  )
}

export default NewsItem
