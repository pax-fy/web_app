import React from 'react'
import { ConnectButton } from '@crossbell/connect-kit'
import {useTheme} from 'next-themes'
import { disconnect } from '@particle-network/auth-core'

 type Props = {
   authenticate : any
 }
export default function Authenticate({authenticate} : Props) {
    const {theme} = useTheme()
  return (
   <div className={`bg-black text-white px-1 md:px-2 py-1 md:py-1.5 cursor-pointer dark:bg-white dark:text-black rounded-xl font-semibold`} onClick={() => authenticate()}>
    	{/*<ConnectButton >
		{(status, { connect, disconnect }) => (
			<button onClick={status.isConnected ? disconnect : connect} className='text-sm md:text-lg'>
				{!status.isConnected && "Connect"}
			</button>
		)}
		</ConnectButton>*/}

		 <p>connect</p>
   </div>
  )
}
