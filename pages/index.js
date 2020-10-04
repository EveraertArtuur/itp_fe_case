import { request } from '../lib/datocms'
import styles from "../styles/home.module.scss"
import Link from 'next/link'
import Head  from 'next/head'
import { Image } from "react-datocms";

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
     <Head>
       <title>In The Pocket recipe app</title>
       <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossOrigin="anonymous"></link>
     </Head>
     <div className={styles.homepage} >
     <div className="container">
       
       <div className={styles.heading}>
       <h1>{data.homepage.title}</h1>
     <p>{data.homepage.welcometext}</p>
       </div>
       
     
    <div className="row justify-content-center ">
    {
       
       data.homepage.recipelist.map(recipe => (
         
         <div key={recipe.id} className="col-" >
           
           <div className={styles.recipeInfoCard}>
           <Image data={recipe.bannerimage.responsiveImage}  className={styles.imageCard}/>
           <h1>{recipe.title}</h1>
           <Link href={ `/recipe`} as={`recipe/${recipe.id}`}>
           <a>bekijk het recept</a>
           </Link>
          
           </div>
          
       </div>
       
       ))
     }
    </div>
   </div>
     </div>
   </div>
  )
} 