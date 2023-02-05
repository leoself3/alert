import { setCookie } from 'cookies-next'
import React from 'react'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CookieModal: React.FC<Props> = (props) => {
  const { open, setOpen } = props
  const handleAccept = () => {
    setOpen(false)
    setCookie('cookie', true, { maxAge: 1000 * 3600 * 24 * 365 })
  }
  const handleReject = () => {
    setOpen(false)
    setCookie('cookie', false, { maxAge: 1000 * 3600 * 24 * 365 })
  }

  return (
    <>
      {open && (
        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div
            className='fixed inset-0 w-full h-full bg-black opacity-40'
            onClick={() => setOpen(false)}
          ></div>
          <div className='flex items-top px-4 py-8'>
            <div className='relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg'>
              <div className='mt-3 sm:flex'>
                <div className='mt-2 text-center sm:ml-4 sm:text-left'>
                  <h4 className='text-xl font-medium text-gray-800 flex justify-center'>
                    Cookie Setting
                  </h4>
                  <p className='mt-2 text-[15px] leading-relaxed text-gray-500'>
                    We use cookies to improve your online experience, analyse
                    how our site is performing and offer personalised ads and
                    content. Please let us know if you are happy to accept all
                    cookies.
                  </p>
                  <div className='items-center gap-2 mt-3 sm:flex'>
                    <button
                      className='w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2'
                      onClick={handleReject}
                    >
                      Reject All Cookies
                    </button>
                    <button
                      className='w-full mt-2 p-2.5 flex-1 text-white bg-green-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2'
                      onClick={handleAccept}
                    >
                      Accept All Cookies
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CookieModal
