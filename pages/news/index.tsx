import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { hasCookie } from 'cookies-next'

import Header from '../../components/Header'
import SearchForm from '../../components/SearchForm'
import Pagination from '../../components/Pagination'
import NewsBoard from '../../components/NewsBoard'
import Footer from '../../components/Footer'
import { BASE_URL } from '../../config'
import { News } from '../types'

interface Props {
  data: {
    articles: News[]
    total: Number
  }
  token: boolean
}

const NewsList: React.FC<Props> = ({ data, token }) => {
  const router = useRouter()
  const [news, setNews] = useState<News[]>(data?.articles)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(data?.total || 1)
  const size = 10

  useEffect(() => {
    setNews(data?.articles)
    const to = Number((Number(data?.total) - 1) / size + 1)
    setTotal(to)
    if (page > to) setPage(1)
  }, [data, page])

  useEffect(() => {
    const currentPath = router.pathname
    const currentQuery = router.query
    currentQuery.page = String(page || 1)
    currentQuery.search = search

    router.push({
      pathname: currentPath,
      query: currentQuery,
    })
  }, [search, page])

  return (
    <>
      <Header token={token} />
      <div className='container mx-auto flex justify-center'>
        <div className='w-full mt-[50px] max-w-[1000px]'>
          <Head>
            <title>Public Figures News. Career, Wealth And Death</title>
            <meta id='og-title' property='og:title' content='News' />
            <meta
              property='og:description'
              content='Look news title and detail'
            />
          </Head>
          <SearchForm search={search} setSearch={setSearch} />
          <NewsBoard news={news} token={token} />
          <Pagination page={page} setPage={setPage} total={total} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const search = context.query['search'] || '',
      page = context.query['page'] || ''

    const res = await fetch(`${BASE_URL}/news?search=${search}&page=${page}`)
    const data = await res.json()
    const token = hasCookie('admin_token', {
      req: context.req,
      res: context.res,
      maxAge: 1000 * 3600 * 24 * 365,
    })

    return { props: { data, token } }
  } catch (error) {
    return { props: { data: null, token: null } }
  }
}

export default NewsList
