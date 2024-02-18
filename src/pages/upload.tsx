import Uploadpage from '@/components/uploadPage/Uploadpage'
import { NextSeo } from 'next-seo'
import React from 'react'

export default function upload() {
  return (
      <>
      <NextSeo
    title='upload'
    description='upload to decentralized video sharing platform '
      />
       <Uploadpage  />
      </>
     
   
  )
}
