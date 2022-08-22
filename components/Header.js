import { Text, Container } from '@nextui-org/react'
import Link  from 'next/link'

export default function Header () {
  return (
    <Container 
      as='header'
      responsive 
      display='flex' 
      justify='space-between'
      gap={4}
      alignContent='center'
    >
    <nav>
      <Container 
        as='ul' 
        display='flex' 
        responsive 
        direction='row'
        justify='space-between'
        style={{ listStyle: 'none' }}
      >
        <li><Link href='/'><a>Home</a></Link></li>
        <li><Link href='/about'><a>About</a></Link></li>
        <li><Link href='/search'><a>Search</a></Link></li>
      </Container>
    </nav>
  </Container>
  )
}