import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube,
  faTiktok,
} from '@fortawesome/free-brands-svg-icons'

const Footer: React.FC = () => {
  return (
    <footer className='footer p-5'>
      <div className='container mx-auto border-t'>
        <div className='flex gap-8 justify-center my-4'>
          <Link href='https://www.facebook.com/profile.php?id=100087984703466&mibextid=LQQJ4d'>
            <FontAwesomeIcon className='text-2xl w-4' icon={faFacebookF} />
          </Link>
          <Link href='https://www.instagram.com/rip_alert/'>
            <FontAwesomeIcon className='text-2xl w-5' icon={faInstagram} />
          </Link>
          <Link href='https://twitter.com/ripalert1?s=21&t=1_FYll7kU2ZCdARcyS-tBQ'>
            <FontAwesomeIcon className='text-2xl w-5' icon={faTwitter} />
          </Link>
          <Link href='https://www.tiktok.com/@alert.rip'>
            <FontAwesomeIcon className='text-2xl w-5' icon={faTiktok} />
          </Link>
          <Link href='/'>
            <FontAwesomeIcon className='text-2xl w-5' icon={faYoutube} />
          </Link>
        </div>
        <div className='flex flex-wrap wrap gap-4 justify-center mx-auto mt-2 lg:mx-24'>
          <Link className='mr-5' href='/policy'>
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
