import { request } from '../../lib/datocms'
import styles from '../../styles/recipe.module.scss'

const RECIPE_QUERY = `
query MyQuery($id:ItemId) {
  recipe(filter: {id: {eq: $id}}) {
    methode
    tags
    title
    servers
    skilllevel
    id
    cookingtimeminutes
    bannerimage {
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
    ingredients {
      amount
      name
      unite
    }
    subimages {
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
`;

export async function getServerSideProps({params }) {
  
 
   const data = await request({
    query: RECIPE_QUERY, 
    variables: { id: params.rid }
  })
    return {  
    props: {  
      data  
    },  
   };  
  } 

  const Recipe = (prop) => {
    
    
  return <div>
    <h1>
      
    </h1>
  </div>
  }

export default Recipe