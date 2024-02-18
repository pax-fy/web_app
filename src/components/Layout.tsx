//@ts-nocheck
import React, {useState} from 'react'
import { Inter } from 'next/font/google'
import Header from './TopNav/Header'
import {
  createReactClient,
  studioProvider,
  LivepeerConfig,
  ThemeConfig,
} from "@livepeer/react";
import { LIVEPEER_KEY } from '@/assets/constant';
import { Sidebar } from '@/sidebar';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/graphql/apolloClient';
import BottomNav from './TopNav/BottomNav';
import { UserContextProvider } from '@/providers/UserContext';
const inter = Inter({ subsets: ['latin'] })

type layoutProps = {
  children : React.ReactNode
}

   // LIVEPEER THEME
   const livepeerTheme: ThemeConfig = {
    colors: {
      accent: "#4f46e5",
      containerBorderColor: "#6366f1",
    },
    fonts: {
      display: "Inter",
    },
    radii : {
      containerBorderRadius : "10px"
    }
  };
  //LIVEPEER_CONFIGURATIONS
  const client = createReactClient({
    provider: studioProvider({ apiKey : LIVEPEER_KEY }),
  });
export default function Layout({children}: layoutProps) {
  const [isShowFull, setisShowFull] = useState(false)

    const toggleShowModal = () => {
       setisShowFull(!isShowFull)
    }
  return (
    <html lang="en">
      <LivepeerConfig client={client} theme={livepeerTheme} >
        <ApolloProvider client={apolloClient}>
<UserContextProvider>
    <body  className={` ${inter.className} w-full `}>
    <Header isShowFull={isShowFull} toggleSidebar={toggleShowModal} />
    <div className='flex gap-1 '>
       <Sidebar isShowFull={isShowFull} toggleSidebar={toggleShowModal} />
       <div className='w-full min-h-screen   md:max-w-[96%] sm:px-2 md:pl-5 lg:px-0.5 '>
      {children}
      <BottomNav  />
      </div>
      </div>
    </body>
    </UserContextProvider>
    </ApolloProvider>
    </LivepeerConfig>

  </html>
  )
}
