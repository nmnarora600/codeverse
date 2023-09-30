import React, { useEffect, useState } from 'react'
import styles from "../../styles/Blogpost.module.css"
import * as fs from 'fs/promises'
const Slug = (props) => {
  function createMarkup(content) {
    return {__html: content};
  }

 const [Blog, setBlog] = useState(props.myBlog)

 


  return (
    <div className={styles.container}>
            <main className={styles.main}>
    <h1 style={{margin:'10px 0', marginBottom:'20px'}}>{Blog && Blog.title}</h1>  
    <hr />
     {Blog && <div dangerouslySetInnerHTML={createMarkup(Blog.content)}>
    </div>}
    </main>
    </div>
  )
}
export async function getStaticPaths(){
  return{
    paths:[
      {params:{slug:'how-to-learn-java' }},
      {params:{slug:'how-to-learn-javascript' }},
      {params:{slug:'how-to-learn-python' }}
    ],
    fallback:true
  };
}
export async function getStaticProps(context){
 const {slug}=context.params;
let blg= await fs.readFile(`blogdata/${slug}.json`,'utf-8')
  const myBlog= await JSON.parse(blg);
  return{
    props:{myBlog}
  }
}

export default Slug