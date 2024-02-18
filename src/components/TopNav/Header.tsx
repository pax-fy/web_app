import React, {useState, useEffect} from 'react'
import {useTheme} from 'next-themes'
import { Button } from '../ui/button'
import { CharacterAvatar } from "@crossbell/ui";
import { ConnectButton } from "@crossbell/connect-kit";
import { extractCharacterName } from "@crossbell/util-metadata";
import Image from 'next/image';
import Search from './Search';
import Authenticated from './Authenticated';
import Authenticate from './Authenticate';
import Link from 'next/link';
import SearchVids from './Search';
import { useEthereum, useConnect, useAuthCore } from '@particle-network/auth-core-modal';
import { Avalanche, AvalancheTestnet, Ethereum } from '@particle-network/chains';
import { AAWrapProvider, SendTransactionMode, SmartAccount } from '@particle-network/aa';
import { ethers, Contract } from 'ethers';
import { useGetUserProfiles } from '@/hooks/useGetUserProfiles';
import { GET_USER_PROFILES_BY_ADDRESS } from '@/graphql/fragments/getUserProfiles';
import { useQuery } from '@apollo/client';
import { apolloClient } from '@/graphql/apolloClient';
import { useUserContext } from '@/providers/UserContext';
type headerprops  = {
	isShowFull? : boolean
	 toggleSidebar? : any
}
export default function Header({isShowFull, toggleSidebar} : headerprops) {
  const {theme, setTheme} = useTheme()
  
  const { provider } = useEthereum();
  const { connect, disconnect } = useConnect();
  const { userInfo } = useAuthCore();
  const [balance, setBalance] = useState(null);
  const [userAddress, setuserAddress] = useState()
  const [userProfiles, setuserProfiles] = useState()
  const {primaryProfile, userProfile,} = useUserContext()

   const profileData = userProfiles?.profiles[0]
console.log("the user profile", userProfiles?.profiles[0])
  const smartAccount = new SmartAccount(provider, {
    projectId: "5d8ff4b5-9f56-42b9-94a9-3e571dd76971",
    clientKey: "coEAg8IqDkfoJRvQEs7E77VQo2TMEoXaCmwAYBGw",
    appId: "2425631a-545c-46b6-8e9f-d57303ce9d68",
    aaOptions: {
      simple: [{ chainId:  AvalancheTestnet.id, version: '1.0.0',  }]
    }
  });

    const  fetchAddress = async () => {
      const address = await smartAccount.getAddress();
      setuserAddress(address)
    }
  
 // const customProvider = new ethers.providers.Web3Provider(new AAWrapProvider(smartAccount, SendTransactionMode.Gasless), "any");


    // handle fetch  profile

	 const handleFetchUserInfo = async () => {
		  if(userAddress){
			const {data, loading, error, errors} = await apolloClient.query({
				query : GET_USER_PROFILES_BY_ADDRESS,
				variables : {
					"where": {
						"creator": "0x2db6a5b44bc3cbff245cfa086733d1fa0a57b4b4"
					  }
				}
				})
				setuserProfiles(data)
		  }

		 
	 }
  useEffect(() => {
    if (userInfo) {
      //fetchBalance();
      fetchAddress()
	  handleFetchUserInfo();
    }
  }, [userInfo, smartAccount, userAddress]);
  
  /*const fetchBalance = async () => {
    const address = await smartAccount.getAddress();
    const balanceResponse = await customProvider.getBalance(address);
    setBalance(ethers.utils.formatEther(balanceResponse));
  };*/

  const handleLogin = async (authType) => {
    if (!userInfo) {
      await connect({
        socialType: authType,
        chain: AvalancheTestnet,
      });
    }
  };

    
  return (
    <div className='flex justify-between h-[50px] md:h-[60px] items-center px-2 md:px-4 dark:bg-background-light sticky top-0 bg-sky-100 z-10 mx-auto   '>
		 <div className=' gap-2 items-center flex '>
			<div className='dark:bg-gray-800/90 cursor-pointer hidden md:flex hover:bg-gray-400/40 bg-gray-300/60 w-9 h-9 rounded-full  items-center justify-center' onClick={toggleSidebar}>
              {!isShowFull ? (
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
				<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
			  </svg>
			  
			  ) : (
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

			  )
			  
			  }
			</div>
			<div className='flex items-center gap-2'>
		 <Link href={`/`}>
		<Image  src={`/img/logo.jpg`}  width={150} height={150} alt='logo' 
  className='w-7 h-7 rounded-full cursor-pointer'
/>	</Link></div>
<p className='text-xs font-semibold text-rose-500'>BETA</p>
		 </div>
	


 {/*} <SearchVids  />*/}
{/*<ConnectButton>
		{(status, { connect, selectCharacters }) => {
			if (status.isConnected) {
				const { character } = status.account;
				const displayName =
					extractCharacterName(character) ?? status.displayAddress;
          const userAddress = status?.displayAddress
 
				return (
				<Authenticated  handle={displayName} address={userAddress} profile={character} />
				);
			} else {
				return  <Authenticate   />
			}
		}}
	</ConnectButton>
	*/}
	  

   {
	userInfo  ? (
		<Authenticated     handle='kabugu'  address={userAddress} profile={profileData} disconnect={disconnect}  />
	) : (
		<Authenticate  authenticate={handleLogin}  />
	)
   }
    </div>
  )
}
