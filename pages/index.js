import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header';

import fs from 'fs/promises'

import { Container, Card, Row, Text } from "@nextui-org/react";
import Link from 'next/link';

export default function Home({ latestComics }) {
  return (
    <div>
      <Head>
        <title>XKCD APP</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <h2 className='text-3xl font-bold text-center'>Latest Comics</h2>
        {
          latestComics.map(comic => {
            return (
            <Link href={`/comic/${comic.id}`} key={comic.id}>
              <a>
                <img src={comic.img} alt={comic.alt} />
              </a>
            </Link>
          )})
        }  
      </main>

    </div>
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