import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { hasCookie } from 'cookies-next'

import Header from '../../components/Header'
import SearchForm from '../../components/SearchForm'
import Table from '../../components/Table'
import Footer from '../../components/Footer'
import Pagination from '../../components/Pagination'
import { BASE_URL, SERVER_URL } from '../../config'
import { DeadPerson } from '../types'
import CookieModal from '../../components/CookieModal'

interface Props {
  data: {
    people: DeadPerson[]
    total: number
  }
  token: boolean
  cookie?: boolean
}

const List: React.FC<Props> = ({ data, token, cookie = false }) => {
  const router = useRouter()
  const [people, setPeople] = useState(data?.people)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [total, setTotal] = useState(data?.total || 1)
  const [refresh, setRefresh] = useState(false)
  const [open, setOpen] = useState(!cookie)
  const size = 10

  useEffect(() => {
    setPeople(data?.people)
    const to = Number((Number(data?.total) - 1) / size + 1)
    setTotal(to)
    if (page > to) setPage(1)
  }, [data, page])

  useEffect(() => {
    const currentPath = router.pathname
    const currentQuery = router.query
    currentQuery.page = (page && page.toString()) || '1'
    currentQuery.search = search

    router.push({
      pathname: currentPath,
      query: currentQuery,
    })
  }, [search, page, refresh])

  return (
    <>
      <Header token={token} />
      <div className='container mx-auto flex justify-center'>
        <div className='mt-[50px] w-full max-w-[1000px] ml-auto mr-auto '>
          <Head>
            <meta charSet='utf-8' />
            <title>Public Figures News. Career, Wealth And Death</title>
            <link rel='canonical' href={`${SERVER_URL}/list`} />
            <meta property='og:title' content='Dead People' />
            <meta
              property='og:description'
              content='Find out who and why has died'
            />
          </Head>
          <SearchForm search={search} setSearch={setSearch} />
          <Table
            token={token}
            list={people}
            refresh={refresh}
            setRefresh={setRefresh}
          />
          <Pagination page={page} setPage={setPage} total={total} />
        </div>
      </div>
      <Footer />
      <CookieModal open={open} setOpen={setOpen} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const search = context.query['search'] || '',
      page = context.query['page'] || '',
      size = context.query['size'] || ''

    const people = await fetch(
      `${BASE_URL}/deadpeople?search=${search}&page=${page}&size=${size}`
    )
    const data = await people.json()
    const token = hasCookie('admin_token', {
      req: context.req,
      res: context.res,
      maxAge: 1000 * 3600 * 24 * 365,
    })
    const cookie = hasCookie('cookie', {
      req: context.req,
      res: context.res,
      maxAge: 1000 * 3600 * 24 * 365,
    })

    return { props: { data, token, cookie } }
  } catch (error) {
    return { props: { data: null, token: null, cookie: null } }
  }
}

export default List
