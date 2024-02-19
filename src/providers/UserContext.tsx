
//@ts-nocheck
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useEthereum, useConnect, useAuthCore } from '@particle-network/auth-core-modal';
import { Avalanche, AvalancheTestnet, Ethereum } from '@particle-network/chains';
import { AAWrapProvider, SendTransactionMode, SmartAccount } from '@particle-network/aa';
import { ethers, Contract } from 'ethers';
import { GET_USER_PROFILES_BY_ADDRESS } from '@/graphql/fragments/getUserProfiles';
import { apolloClient } from '@/graphql/apolloClient';


 type providerProps = {
     smartAccount : any
     primaryProfile :any
     userAddress : any
     userProfile : any
     signer : any
     toggleHandleModal: any
     isShowHandleModal : any
 } 
// Create a context
const UserContext = createContext<providerProps | undefined>(undefined);

export const useUserContext = (): providerProps => {
    const context = useContext(UserContext)

    if(!context){
        throw new Error ("must be used in providers")
    }
    return context
}

  type ContextProps = {
    children : React.ReactNode
  }
export const UserContextProvider =({children} : ContextProps) => {
   const [userAddress, setuserAddress] = useState()
   const [userProfile, setuserProfile] = useState()
   const { provider } = useEthereum();
   const { userInfo } = useAuthCore();
   const { connect, disconnect } = useConnect();
   const [isShowHandleModal, setisShowHandleModal] = useState(false)

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

      const toggleHandleModal = () => {
        setisShowHandleModal(!isShowHandleModal)
      }

    const handleFetchUserInfo = async () => {
        if(userAddress){
          const {data, loading, error, errors} = await apolloClient.query({
              query : GET_USER_PROFILES_BY_ADDRESS,
              variables : {
                  "where": {
                      "creator":  userAddress
                    }
              }
              })
              setuserProfile(data)
        }

       
   }
  
  const customProvider = new ethers.providers.Web3Provider(new AAWrapProvider(smartAccount, SendTransactionMode.Gasless), "any");
  const signer = customProvider.getSigner();
  useEffect(() => {
    if (userInfo) {
      fetchAddress()
      handleFetchUserInfo()
    }
  }, [userInfo, smartAccount, customProvider]);
  
 
  const handleLogin = async (authType) => {
    if (!userInfo) {
      await connect({
        socialType: authType,
        chain: AvalancheTestnet,
      });
    }
  };

  let primaryProfile =  userProfile && userProfile?.profiles[0]
   const value = {
      smartAccount,
      userAddress,
      handleLogin,
      primaryProfile,
      userProfile,
      signer,
      toggleHandleModal,
      isShowHandleModal
   }

   return(
    <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
   )

}