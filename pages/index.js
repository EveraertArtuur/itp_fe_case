import { request } from '../lib/datocms'
import { Image, renderMetaTags } from 'react-datocms'
import Head from 'next/head'

const HOMEPAGE_QUERY = `
query MyQuery {
  homepage {
    title
    welcometext
  }
}
`

export async function getStaticProps() {
  const data = await request({
    query: HOMEPAGE_QUERY
  })

  return {
    props: {
      data
    }
  }
}

export default function Home({ data }) {
  return (
    <div>
      {data.homepage.title}
    </div>
  )
}