import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header';

import fs from 'fs/promises'

import { Container, Card, Row, Text } from "@nextui-org/react";
import Link from 'next/link';

export default function Home({ latestComics }) {
  return (
    <>
      <Head>
        <title>xkcd - Comics for developers</title>
        <meta name="description" content="Comics for developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <h2 
        className='text-3xl font-bold text-center mb-2'>Latest Comics</h2>
        <section 
          className='grid grid-cols-2 gap-2 max-w-md m-auto sm:grid-cols-2 md:grid-cols-3'>
        {
          latestComics.map(comic => {
            return (
            <Link href={`/comic/${comic.id}`} key={comic.id}>
              <a 
                className='mb-4 pb-4 m-auto'>
                <h3 
                  className='font-semibold'>{comic.safeTitle}</h3>
                <Image 
                  width='300' 
                  height='300' 
                  layout='intrinsic'
                  objectFit='contain'
                  src={comic.img} 
                  alt={comic.alt} 
                />
              </a>
            </Link>
          )})
        }
        </section>
      </main>

    </>
  )
}


export async function getStaticProps(context) {
  const files = await fs.readdir('./comics')
  const latestComicsFiles = files.slice(-8, files.length)

  const promisesReadFiles = latestComicsFiles.map(async (file) => {
    const content = await fs.readFile(`./comics/${file}`, 'utf-8')
    return JSON.parse(content)
  })

  const latestComics =  await Promise.all(promisesReadFiles)
  console.log(latestComics);

  return {
    props: {
      latestComics
    }
  }
}