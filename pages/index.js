import { request } from '../lib/datocms'

import Link from 'next/link'

const HOMEPAGE_QUERY = `
query MyQuery {
  homepage {
    title
    welcometext
    recipelist {
      id
      updatedAt
      tags
      title
      id
      bannerimage {
        id
       responsiveImage(imgixParams: { fit: crop, w: 300, h: 300, auto: format }) {
        srcSet
        webpSrcSet
        sizes
        src
        width
        height
        aspectRatio
        alt
        title
        base64
      }
    }
  }
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
      <div>{data.homepage.title}</div>
      <div>{data.homepage.welcometext}</div>
      {
        
        data.homepage.recipelist.map(recipe => (
          <article key={recipe.id}>
            <Link href={ `/recipe/${recipe.id}`} as={`recipe/${recipe.id}`}>
          <a>{recipe.title}</a>
              </Link>
           
        </article>
        ))
      }
    </div>
  )
} 