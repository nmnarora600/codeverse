import Image from 'next/image'
import styles from "../styles/page.module.css"
import Head from 'next/head'
import * as fs from 'fs/promises'
import Link from 'next/link'

export default function Home(props) {

  return (
    <div className='cont'>
<Head>
  <title>CodeVerse</title>
</Head>
    <main className={styles.main}>
     

      <div className={styles.center} style={{display:'inline', padding:'4rem', paddingTop:0}}>
        <h1 > &lt; CodeVerse/ &gt;</h1>
        <div style={{textAlign:'center'}}>
          
        <img  src="/homeimg.jpg" className={styles.myImg} alt="" width={250} height={250} />
        </div>
      <p className={styles.subhead}>Connect to Code without errors.</p></div>
    

      <div className={styles.blogs}>
        <h2>Latest Blogs</h2><br/>{
          props.allBlogs.map((item)=>{
            return <div className={styles.blogItem} key={item.slug}>
            <h3>{item.title}</h3>
            <p>{item.metadesc}</p>
            <button className={styles.btn} ><Link href={`/blogposts/${item.slug}`}>Read more</Link></button>
          </div>
          })

        }
       
        
      </div>
    </main>
    </div>
  )
}
export async function getServerSideProps(context){
  // const result= await fetch("http://localhost:3000/api/blogs")
  // const allBlogs= await result.json();
  const allBlogs=[];
  const files= await fs.readdir("blogdata");
  for (let index = 0; index < 3; index++) {
    const item = files[index];
  let file2= await fs.readFile(("blogdata/"+item),'utf-8')
   let file= await JSON.parse(file2);
    allBlogs.push(file);
  
  }
  console.log(allBlogs)
  return{
    props:{
      allBlogs
    }
  }
}