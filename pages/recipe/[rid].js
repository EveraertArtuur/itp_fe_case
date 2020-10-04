import { request } from "../../lib/datocms";
import styles from "../../styles/recipe.module.scss";
import Head from "next/head";
import { Image } from "react-datocms";


const RECIPE_QUERY = `
query MyQuery($id:ItemId) {
  recipe(filter: {id: {eq: $id}}) {
    
    tags
    title
    servers
    skilllevel
    id
    cookingtimeminutes
    methodesteps {
      id
      steptext
      istitle
    }
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
`;

export async function getServerSideProps({ params }) {
  const data = await request({
    query: RECIPE_QUERY,
    variables: { id: params.rid },
  });
  return {
    props: {
      data,
    },
  };
}

const Recipe = (prop) => {
  const rec = prop.data.recipe;
  const hour = Math.floor(rec.cookingtimeminutes / 60);
  const min = rec.cookingtimeminutes % 60;
  var tags =  rec.tags.split(', ');

  return (
    <div>
      <Head>
        <title>ITP recipe {rec.title} </title>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
          crossOrigin="anonymous"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>
      </Head>
      <div className={styles.recipepage}>
        <div className="container">
          <div className={styles.header}>
            <div className="row align-items-center">
              <div className="col-sm-5">
                <Image
                  data={rec.bannerimage.responsiveImage}
                  className={styles.imageCard}
                />
              </div>
              <div className="col-sm">
                <h1>{rec.title}</h1>
                <h2>Aantal personen: {rec.servers}</h2>
               
                <h2>
                  {hour > 0 ? `${hour} uur` : ""} {min} minuten{" "}
                </h2>
                
                <div className={styles.tags}>
                <div className= "row justify-content-center">{
                    tags.map((tag) => (
                      <div key={tag}  className="col-xs">
                        <p className={styles.tag}>{tag}</p>
                      </div>
                       
                    ))             
                  }</div>
                  </div>  
                
               
              </div>
            </div>
          </div>
          <div className={styles.recipeBody}>
            <div className="row">
              <div className="col-3">
                <div className={styles.ingredientsList}>
                  <h2>Ingredienten</h2>
                  {rec.ingredients.map((ing) => (
                    <p key={ing.name} >
                      {ing.amount} {ing.unite} {ing.name}
                    </p>
                  ))}
                </div>
              </div>
              <div className="col-md">
                <h2>Bereiding</h2>
                {
                  rec.methodesteps.map((step) => (
                  <div key={step.id} >
                    {step.istitle != true ? <p>{step.steptext}  </p> : <p className={styles.stepSubTitle}>{step.steptext} </p>}
                  </div>

                    )
                  )
                }
              </div>
            </div>
            <div className={styles.subimages}>
              <div className="row justify-content-center ">
                {rec.subimages.map((subimage) => (
                  <div key={subimage.id} className="col-auto">
                    <Image
                      data={subimage.responsiveImage}
                      className={styles.subImageCard}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
