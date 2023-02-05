import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import 'react-confirm-alert/src/react-confirm-alert.css'

import { DeadPerson } from '../pages/types'

interface Props {
  list: DeadPerson[]
}

const imageLoader = ({ src, width }: { src: string; width: number }) => {
  return `${src}?w=${width}`
}

const Table: React.FC<Props> = (props) => {
  const { list } = props
  let adsbygoogle = []
  const router = useRouter()

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
    <div className='my-8 min-w-[350px]'>
      <div className='w-full mx-auto bg-white rounded-sm'>
        <div className='p-3'>
          <ins
            className='adsbygoogle h-full'
            style={{ display: 'block', maxHeight: '280px' }}
            data-ad-client='ca-pub-4007300633906997'
            data-ad-slot='6271394721'
          ></ins>
          <div className='overflow-x-auto'>
            {list?.length ? (
              <table className='table-auto w-full'>
                <thead className='mb-5 font-semibold text-[#009ef7]'>
                  <tr>
                    <th className='p-2 whitespace-nowrap'>
                      <div className='table-header'>Name</div>
                    </th>
                    <th className='p-2 whitespace-nowrap'>
                      <div className='table-header'>Candles</div>
                    </th>
                  </tr>
                </thead>
                <tbody className='text-sm divide-y divide-gray-100'>
                  {list.map((item: DeadPerson, index: number) => (
                    <tr
                      className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                      key={index}
                      onClick={() => {
                        router.push(`/${item?.urlname}`)
                      }}
                    >
                      <td className='table-content min-w-[140px]'>
                        <Link
                          className='h-[80px] w-full flex'
                          href={`/${item?.urlname}`}
                        >
                          <div className='flex items-center'>
                            <div className='flex-shrink-0 mr-2 sm:mr-3'>
                              <Image
                                className='rounded-lg '
                                loader={imageLoader}
                                src={item?.photo}
                                width={65}
                                height={65}
                                alt='photo'
                              />
                            </div>
                            <div className='font-medium text-gray-800'>
                              {item?.fullname}
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td className='table-content'>
                        <Link
                          className='h-[80px] w-full flex'
                          href={`/${item?.urlname}`}
                        >
                          <div className='text-left flex items-center'>
                            <Image
                              className='cursor-pointer'
                              src={
                                item?.candles
                                  ? '/images/open-candle.png'
                                  : '/images/close-candle.png'
                              }
                              width={40}
                              height={50}
                              alt='candle'
                            />
                            {item?.candles}
                          </div>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <span className='text-xl flex justify-center'>
                There is no any dead people.
              </span>
            )}
          </div>
          <ins
            className='adsbygoogle h-full'
            style={{ display: 'block', maxHeight: '280px' }}
            data-ad-client='ca-pub-4007300633906997'
            data-ad-slot='6271394721'
          ></ins>
        </div>
      </div>
    </div>
  )
}

export default Table
