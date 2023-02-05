import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Header: React.FC<{ token: boolean }> = ({ token }) => {
  const [admin, setAdmin] = useState(token)
  useEffect(() => {
    setAdmin(token)
  }, [token])

  return (
    <div className='box-content bg-[#f8f8f8]'>
      <div className='flex justify-between h-28 w-full'>
        <Link
          className='logo ml-4 w-[150px] md:ml-[90px] md:min-w-[180px] relative'
          href={{
            pathname: '/list',
          }}
        >
          <Image src='/logo.png' alt='logo' width={200} height={50} priority />
        </Link>
        <div className='flex'>
          <Link
            className='news-btn py-5 px-5 my-7 sm:px-12 ml-2 sm:mx-8 mx-0 sx:mr-8 md:mr-12'
            href='/news'
          >
            News
          </Link>
          <Link
            className='candle-btn py-5 px-5 my-7 ml-2 sm:mr-8 md:mr-12'
            href='/candles'
          >
            Candles
          </Link>
          <Link
            className={
              `mx-4 md:mr-[90px] text-lg flex items-center ` +
              (admin ? '' : 'hidden')
            }
            href='/admin'
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
