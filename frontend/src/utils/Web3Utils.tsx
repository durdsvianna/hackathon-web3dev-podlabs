import { useEffect, useState } from 'react';
import { useAccount, useEnsName } from 'wagmi';


  
export function useShortenAddressOrEnsName() {
    function shortenAddressOrEnsName(length = 5): string {
      const { data: accountData } = useAccount();
      const { data: ensNameData } = useEnsName({ address: accountData?.address });

      const prefix = accountData?.address.slice(0, length + 2);
      const suffix = accountData?.address.slice(accountData?.address.length - length);
  
      return ensNameData ?? `${prefix}...${suffix}`;
    }
  
    return { shortenAddressOrEnsName };
  }

  export function useShortenAddressOrEnsNameOfOwner() {
    function shortenAddressOrEnsNameOfOwner(owner, length = 5): string {
      const { data: ensNameData } = useEnsName({ address: owner });

      const prefix = owner.slice(0, length + 2);
      const suffix = owner.slice(owner.length - length);
  
      return ensNameData ?? `${prefix}...${suffix}`;
    }
  
    return { shortenAddressOrEnsNameOfOwner };
  }

export function useWalletAddress() {
    async function walletAddress(length = 5): Promise<string> {
      const { data: accountData } = useAccount();
      console.log('AAAAAAAA', accountData?.address);
      return accountData?.address;
    }
    useEffect(() => {
      walletAddress();
    }, [])
    
    return { walletAddress };
  }

export function useEnsNameOrShortenAddress() {
    function ensNameOrShortenAddress(length = 5): string {
      const { data: accountData } = useAccount();
      const { data: ensNameData } = useEnsName({ address: accountData?.address });
      
      return ensNameData ?? accountData?.address;
    }
  
    return { ensNameOrShortenAddress };
  }

  