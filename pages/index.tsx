import React from 'react'
import { GetServerSideProps } from 'next'

import List from './list'
import { BASE_URL } from '../config'
import { DeadPerson } from './types'
import { hasCookie } from 'cookies-next'

interface Props {
  data: {
    people: DeadPerson[]
    total: number
  }
  token: boolean
}

const Home: React.FC<Props> = ({ data, token }) => {
  return <List data={data} token={token}></List>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const search = context.query['search'] || '',
    page = context.query['page'] || '',
    size = context.query['size'] || ''
  const people = await fetch(
    `${BASE_URL}/deadpeople?search=${search}&page=${page}&size=${size}`
  )
  const data = await people.json()
  const token = hasCookie('admin_token', { req: context.req, res: context.res })

  return { props: { data, token } }
}

export default Home
