import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { confirmAlert } from 'react-confirm-alert'
import moment from 'moment'
import { toast } from 'react-toastify'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import 'react-confirm-alert/src/react-confirm-alert.css'

import { deleteDeadPerson } from '../pages/api/apiCaller'
import { DeadPerson } from '../pages/types'

interface Props {
  token: boolean
  list: DeadPerson[]
  refresh: boolean
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}

const getDuration = (date: string) => {
  const m1 = moment(date)
  const m2 = moment(new Date())

  const duration = moment.duration(m2.diff(m1))
  const days = duration.days(),
    months = duration.months(),
    years = duration.years()

  if (years) {
    return `${years} years ago`
  } else if (months) {
    return `${months} months ago`
  } else if (days > 1) {
    return `${days} days ago`
  } else if (days === 1) {
    return 'yesterday'
  } else if (days < 1) {
    return 'today'
  }
}

const imageLoader = ({ src, width }: { src: string; width: number }) => {
  return `${src}?w=${width}`
}

const Table: React.FC<Props> = (props) => {
  const { token, list, refresh, setRefresh } = props
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

  const router = useRouter()
  const handleDelete = (urlname: string | undefined) => {
    confirmAlert({
      title: 'Delete',
      message: 'Are you sure to delete this person?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            if (urlname) {
              deleteDeadPerson(urlname)
                .then(() => {
                  setRefresh(!refresh)
                  toast.success('Deleted successfully!')
                })
                .catch(() => {
                  toast.error('Deleting is failed')
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
    <div className='my-8 min-w-[350px]'>
      <div className='w-full mx-auto bg-white rounded-sm'>
        <header className='px-5 py-4 border-b border-gray-100 flex justify-between'>
          <div className='flex'>
            <button
              type='button'
              className={
                'p-2 pl-4 pr-4 bg-[#009ef7] flex text-white rounded-lg mr-2 font-semibold ' +
                (token ? '' : 'hidden')
              }
              onClick={() => {
                router.push('/add')
              }}
            >
              <FontAwesomeIcon className='mr-1 flex w-5' icon={faPlus} />
              <p className='shrink-0 flex items-center'>Add</p>
            </button>
          </div>
        </header>
        <ins
          className='adsbygoogle h-full'
          style={{ display: 'block', maxHeight: '280px' }}
          data-ad-client='ca-pub-4007300633906997'
          data-ad-slot='6271394721'
        ></ins>
        <div className='p-3'>
          <div className='overflow-x-auto'>
            {list?.length ? (
              <table className='table-auto w-full'>
                <thead className='mb-5 font-semibold text-[#009ef7]'>
                  <tr>
                    <th className='p-2 whitespace-nowrap'>
                      <div className='table-header'>Name</div>
                    </th>
                    <th className='p-2 whitespace-nowrap'>
                      <div className='table-header'>Age</div>
                    </th>
                    <th className='p-2 whitespace-nowrap hidden sm:block'>
                      <div className='table-header'>Where</div>
                    </th>
                    <th className='p-2 whitespace-nowrap'>
                      <div className='table-header'>When</div>
                    </th>
                    <th
                      className={
                        'p-2 whitespace-nowrap ' + (token ? '' : 'hidden')
                      }
                    >
                      <div className='table-header'></div>
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
                                width={80}
                                height={80}
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
                            {item?.age}
                          </div>
                        </Link>
                      </td>
                      <td className='table-content hidden sm:table-cell'>
                        <Link
                          className='h-[80px] w-full flex'
                          href={`/${item?.urlname}`}
                        >
                          <div className='text-left flex items-center'>
                            {item?.deadPlace}
                          </div>
                        </Link>
                      </td>
                      <td className='table-content'>
                        <Link
                          className='h-[80px] w-full flex'
                          href={`/${item?.urlname}`}
                        >
                          <div className='text-left flex items-center'>
                            {getDuration(item?.deadDay)}
                          </div>
                        </Link>
                      </td>
                      <td
                        className={'table-content ' + (token ? '' : 'hidden')}
                      >
                        <Link
                          className='h-[80px] w-full flex'
                          href={`/${item?.urlname}`}
                        >
                          <div
                            className='hover:cursor-pointer flex items-center'
                            onClick={(e) => {
                              e.stopPropagation()
                              e.preventDefault()
                              handleDelete(item?.urlname)
                            }}
                          >
                            <FontAwesomeIcon
                              className='mr-1 w-4'
                              icon={faTrash}
                            />
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
