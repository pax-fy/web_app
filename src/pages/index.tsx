import Image from 'next/image'
import Header from '@/components/TopNav/Header'
import { StarOutline } from '@/components/common/Icons'
import { HomePage } from '@/components/Home'
import {NextSeo} from 'next-seo'

export default function Home() {
  return (
    <>
    <NextSeo
   title='Zenvid'
  description='Zenvid is the  Decentralized video sharing platform Built on crossbell network, in zenvid  you own your social graph, your contents '
/>
    <main
     className='min-h-screen w-full'
    >
    <HomePage   />
      </main>
      </>
  )
}
