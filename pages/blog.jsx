import React, { useEffect, useState } from 'react'
import styles from "../styles/Blog.module.css"
import Link from 'next/link'
import * as fs from 'fs/promises'
import InfiniteScroll from 'react-infinite-scroll-component'


const Blog = (props) => {

  const [Blogs, setBlogs] = useState(props.startcount)
  const [count, setcount] = useState(6)

  const fetchData = async() => {

let d= await fetch(`http://localhost:3000/api/blogs?count=${count+2}`)
let data= await d.json();
setBlogs(data);

setcount(count+2);

   
  };

  return (
    <div className={styles.container}>
      <div className={styles.blogs}>
        <main className={styles.main}>



        <InfiniteScroll className={styles.padclass}
  dataLength={Blogs.length} //This is important field to render the next data
  next={fetchData}
  hasMore={Blogs.length!==props.allBlogs.length}
  loader={<p style={{ textAlign: 'center' }}>
  <b>Loading . . .</b>
</p>}
  endMessage={(props.datacount>7)&&
    <p style={{ textAlign: 'center' }}>
      <b>Yay! You have seen it all</b>
    </p>
  }
 
>
  {
              Blogs.map((item)=>{
                return(
                  <div className={styles.blogItem}  key={item.slug}>
                  <Link href={`/blogposts/${item.slug}`}>
                  <h3>{item.title}</h3></Link>
                  <p>{item.metadesc.substr(0,150)} . . .</p>
                  <button className={styles.btn} ><Link href={`/blogposts/${item.slug}`}>Read more</Link></button>
                </div>
                )
              })
            }
</InfiniteScroll>






          <div>
           
          </div>
       
      
        </main>
        </div>
    </div>
  )
}
export async function getStaticProps(context){
  // const result= await fetch("http://localhost:3000/api/blogs")
  // const allBlogs= await result.json();
  const allBlogs=[];
  const files= await fs.readdir("blogdata");
  
  for (let index = 0; index < files.length; index++) {
    const item = files[index];
  let file2= await fs.readFile(("blogdata/"+item),'utf-8')
   let file= await JSON.parse(file2);
    allBlogs.push(file);
  
  }
  let datacount=allBlogs.length;
  let x=allBlogs;
  let startcount=x.slice(0,6)
  return{
    props:{
      allBlogs,datacount, startcount
    }
  }
}

export default Blog