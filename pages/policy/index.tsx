import React from 'react'
import { hasCookie } from 'cookies-next'
import { GetServerSideProps } from 'next'

import Header from '../../components/Header'
import PrivacyPolicy from '../../components/PrivacyPolicy'
import Footer from '../../components/Footer'

interface Props {
  token: boolean
}

const Policy: React.FC<Props> = ({ token }) => {
  return (
    <>
      <Header token={token} />
      <div className='container mx-auto flex justify-center'>
        <PrivacyPolicy />
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
      maxAge: 1000 * 3600 * 24 * 365,
    })

    return { props: { token } }
  } catch (err) {
    return {
      props: { token: false },
    }
  }
}

export default Policy
