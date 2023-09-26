import React, { useMemo } from 'react'

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"

import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"

import { GlowWalletAdapter, PhantomWalletAdapter, SlopeWalletAdapter  } from "@solana/wallet-adapter-wallets"

import { clusterApiUrl } from "@solana/web3.js"


export const WalletConnectProvider = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet

  const endpoint = useMemo(() => {
    // if (network === WalletAdapterNetwork.Devnet) {
    //   return 'https://capable-attentive-snowflake.solana-devnet.discover.quiknode.pro/f1ea93ae5a9cbf585aeec7b18a71f427d9040bc6/'
    // }

    return clusterApiUrl(network)
  }, [network])

  const wallets = useMemo(() => [new PhantomWalletAdapter()], [network])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default WalletConnectProvider