import { useState } from 'react';
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

export function useWalletAddress() {
    function walletAddress(length = 5): string {
      const { data: accountData } = useAccount();

      return accountData?.address;
    }
  
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

  