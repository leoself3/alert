import React, { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { getCookie, hasCookie, setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowRotateLeft,
  faArrowRightToBracket,
} from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import { deleteCookie } from 'cookies-next'

import Header from '../../components/Header'
import { login } from '../api/apiCaller'

const Admin = () => {
  const [password, setPassword] = useState('')
  const router = useRouter()

  useEffect(() => {
    deleteCookie('admin_token', { maxAge: 1000 * 3600 * 24 * 365 })
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login(password)
      .then(({ data }) => {
        const cookie = hasCookie('cookie') && getCookie('cookie')
        if (cookie) {
          setCookie('admin_token', data?.token, {
            maxAge: 1000 * 3600 * 24 * 365,
          })
        }
        router.push('/list')
        toast.success('Logged in successfully!')
      })
      .catch((error) => {
        toast.error(error?.message)
      })
  }

  return (
    <>
      <Header token={false} />
      <Head>
        <title>Public Figures News. Career, Wealth And Death</title>
      </Head>
      <div className='container mx-auto flex justify-center'>
        <div className='shadow-lg w-full flex justify-center mt-10 md:max-w-lg p-10'>
          <div className='space-y-2 w-full'>
            <h3 className='text-3xl font-semibold flex justify-center mb-6'>
              Login
            </h3>
            <form onSubmit={handleSubmit}>
              <div className='form-group mb-5'>
                <label
                  htmlFor='name'
                  className='form-label inline-block mb-2 text-gray-700'
                >
                  Password
                </label>
                <input
                  type='password'
                  className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                  id='password'
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  aria-describedby='password'
                  placeholder='Enter password'
                ></input>
              </div>
              <div className='flex justify-between'>
                <Link href='/list' className='p-2 flex'>
                  <FontAwesomeIcon
                    className='mr-2 w-5 flex items-center'
                    icon={faArrowRotateLeft}
                  />
                  <p className='shrink-0 flex items-center'>To List</p>
                </Link>
                <button
                  type='submit'
                  className='p-2 bg-[#009ef7] text-white rounded flex'
                >
                  <FontAwesomeIcon
                    className='text-white mr-2 mt-1 w-5 flex items-center'
                    icon={faArrowRightToBracket}
                  />
                  <p className='shrink-0 flex items-center'>Login</p>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  library.add(fab)
  library.add(fas)

  return { props: {} }
}

export default Admin
