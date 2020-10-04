import { request } from '../../lib/datocms'

const RECIPE_QUERY = `
query MyQuery($id:ItemId) {
  recipe(filter: {id: {eq: $id}}) {
    id
    title
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
    
    
  return <p>{prop.data.recipe.title}</p>
  }

export default Recipe