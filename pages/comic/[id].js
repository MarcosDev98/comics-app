import Head from 'next/head'
import { Header } from 'components/Header'
import Image from 'next/image'



export default function Comic({ id, img, alt, title, width, height }) {
  return <>
    <Head>
        <title>xkcd - Comics for developers</title>
        <meta name="description" content="Comics for developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main>
        <h1>Comic ...</h1>
        <Image 
          width={width} 
          height={height}
          alt={alt}
          src={img}

        />

      </main>
  </>
}

export async getStaticPaths() {
  return 
}

export async function getStaticProps({ params }) {

  const promiseReadFiles = latest

  return {
    props: {

    }
  }

}