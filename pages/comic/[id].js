import Head from 'next/head'
import { Header } from 'components/Header'
import Image from 'next/image'
import { readFile, stat } from 'fs/promises'



export default function Comic({ img, alt, title, width, height, nextId, prevId, hasNext, hasPrevious }) {
  return <>
    <Head>
        <title>xkcd - Comics for developers</title>
        <meta name="description" content="Comics for developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main>
        <section className='max-w-lg m-auto'>
          <h1 className='font-bold'>{title}</h1>
          <Image 
            width={width} 
            height={height} 
            src={img} 
            alt={alt}  
          />
          
        </section>
      </main>
  </>
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '2500' } }
    ],
    fallback: false
  };
}

export async function getStaticProps({ params }) {

  const { id } = params

  const content = await readFile(`./comics/${id}.json`, 'utf8')
  const comic = JSON.parse(content)

  const idNumber = +id
  const prevId = idNumber - 1
  const nextId = idNumber + 1
  
  // verificar si existe el previo y el siguiente
  // para navegacion
  const [prevResult, nextResult] = await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nextId}.json`)
  ])
  

  const hasPrevious = prevResult.status === 'fulfilled'
  const hasNext = nextResult.status === 'fulfilled'
  

  return {
    props: {
      ...comic,
      hasPrevious,
      hasNext,
      nextId,
      prevId
    }
  }

}