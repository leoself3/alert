import React, { useState } from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'react-toastify'
import { hasCookie } from 'cookies-next'
import {
  faArrowRotateLeft,
  faFloppyDisk,
} from '@fortawesome/free-solid-svg-icons'
import 'react-toastify/dist/ReactToastify.css'

import Header from '../../components/Header'
import DatePicker from '../../components/DatePicker'
import TextInput from '../../components/TextInput'
import TextareaField from '../../components/TextareaField'
import Footer from '../../components/Footer'
import { updateDeadPerson } from '../api/apiCaller'
import { BASE_URL } from '../../config'
import { DeadPerson } from '../types'

const Edit: React.FC<{ token: boolean; detail: DeadPerson }> = ({
  token,
  detail,
}) => {
  const [photo, setPhoto] = useState<File>()
  const [fullname, setFullname] = useState(detail?.fullname || '')
  const [age, setAge] = useState(detail?.age.toString() || '')
  const [birthday, setBirthday] = useState(detail?.birthday || '')
  const [birthplace, setBirthplace] = useState(detail?.birthplace || '')
  const [deadDay, setDeadDay] = useState(detail?.deadDay || '')
  const [deadPlace, setDeadPlace] = useState(detail?.deadPlace || '')
  const [career, setCareer] = useState(detail?.career || '')
  const [death, setDeath] = useState(detail?.death || '')
  const [reason, setReason] = useState(detail?.reason || '')
  const [netWorth, setNetWorth] = useState(detail?.netWorth || '')
  const [facebook, setFacebook] = useState(detail?.facebook || '')
  const [twitter, setTwitter] = useState(detail?.twitter || '')
  const [instagram, setInstagram] = useState(detail?.instagram || '')
  const [youtube, setYoutube] = useState(detail?.youtube || '')

  const router = useRouter()

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target?.files
    if (!fileList) return
    setPhoto(fileList[0])
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()
    photo && formData.append('photo', photo, photo.name)
    formData.append('fullname', fullname)
    formData.append('age', age)
    formData.append('birthday', birthday || new Date().toString())
    formData.append('birthplace', birthplace)
    formData.append('deadDay', deadDay || new Date().toString())
    formData.append('deadPlace', deadPlace)
    formData.append('career', career.replaceAll('\n', '<br />'))
    formData.append('death', death.replaceAll('\n', '<br />'))
    formData.append('reason', reason)
    formData.append('netWorth', netWorth)
    formData.append('facebook', facebook)
    formData.append('twitter', twitter)
    formData.append('instagram', instagram)
    formData.append('youtube', youtube)

    updateDeadPerson(formData, detail?.urlname || '')
      .then((data) => {
        router.push('/list')
        toast.success('The person was added successfully!')
      })
      .catch((error) => {
        toast.error(error?.message)
      })
  }

  return (
    <>
      <Header token={token} />
      <Head>
        <title>Public Figures News. Career, Wealth And Death</title>
      </Head>
      <div className='container mx-auto flex justify-center'>
        <div className='mt-10'>
          <form onSubmit={handleSubmit}>
            <div className='grid md:grid-cols-2 md:gap-6'>
              <div className='form-group mb-5'>
                <input
                  className='form-control block w-full px-3 text-base font-normal h-full text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  :border-blue-600 focus:outline-none'
                  type='file'
                  id='formFile'
                  onChange={onFileChange}
                />
              </div>
            </div>
            <div className='grid md:grid-cols-2 md:gap-6'>
              <TextInput
                name='fullname'
                label='Full name'
                type='text'
                value={fullname}
                setValue={setFullname}
              />
              <TextInput
                name='age'
                label='Age'
                type='number'
                value={String(age)}
                setValue={setAge}
              />
            </div>
            <div className='grid md:grid-cols-2 md:gap-6'>
              <DatePicker
                label='Birthday'
                value={birthday}
                setValue={setBirthday}
              />
              <TextInput
                name='birthplace'
                label='Birthplace'
                type='text'
                value={birthplace}
                setValue={setBirthplace}
              />
            </div>
            <div className='grid md:grid-cols-2 md:gap-6'>
              <DatePicker
                label='Dead day'
                value={deadDay}
                setValue={setDeadDay}
              />
              <TextInput
                name='deadPlace'
                label='Dead place'
                type='text'
                value={deadPlace}
                setValue={setDeadPlace}
              />
            </div>
            <div className='grid md:grid-cols-2 md:gap-6'>
              <TextInput
                name='reason'
                label='Cause of death'
                type='text'
                value={reason}
                setValue={setReason}
              />
              <TextInput
                name='netWorth'
                label='Net Worth'
                type='text'
                value={netWorth}
                setValue={setNetWorth}
              />
            </div>
            <div className='grid grid-cols'>
              <TextareaField
                name='career'
                label='Career'
                value={career}
                setValue={setCareer}
              />
            </div>
            <div className='grid grid-cols'>
              <TextareaField
                name='death'
                label='Death'
                value={death}
                setValue={setDeath}
              />
            </div>
            <div className='grid md:grid-cols-2 md:gap-6'>
              <TextInput
                name='facebook'
                label='Facebook'
                type='text'
                value={facebook}
                setValue={setFacebook}
              />
              <TextInput
                name='twitter'
                label='Twitter'
                type='text'
                value={twitter}
                setValue={setTwitter}
              />
            </div>
            <div className='grid md:grid-cols-2 md:gap-6'>
              <TextInput
                name='instagram'
                label='Instagram'
                type='text'
                value={instagram}
                setValue={setInstagram}
              />
              <TextInput
                name='youtube'
                label='Youtube'
                type='text'
                value={youtube}
                setValue={setYoutube}
              />
            </div>
            <div className='flex justify-between'>
              <Link
                href='/list'
                className='p-2 flex focus:ring-4 focus:outline-none font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                <FontAwesomeIcon
                  className='mr-2 w-5'
                  icon={faArrowRotateLeft}
                />
                <p className='flex items-center'>To List</p>
              </Link>
              <button
                type='submit'
                className='text-white flex bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                <FontAwesomeIcon
                  className='text-white mr-2 w-5'
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

    const { urlname } = context.query

    const res = await fetch(`${BASE_URL}/deadpeople/${urlname}`)
    const detail = await res.json()

    return {
      props: {
        token,
        detail,
      },
    }
  } catch (error) {
    return {
      props: {
        token: null,
        detail: null,
      },
    }
  }
}

export default Edit
