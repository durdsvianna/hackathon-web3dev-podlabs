import { User } from 'src/models/user';
import { useShortenAddressOrEnsName, useWalletAddress } from 'src/utils/Web3Utils';
import { useContract, useSigner } from 'wagmi';
import NftERC721Artifact from "src/contracts/NftERC721.json";
import contractAddress from "src/contracts/contract-nfterc721-address.json";

export function UserProfile(): User {
  
  const { shortenAddressOrEnsName } = useShortenAddressOrEnsName();
  const shortenedAddressOrName = shortenAddressOrEnsName();
  
  const user: User = {
    name: shortenedAddressOrName,
    coverImg: '/static/images/placeholders/covers/5.jpg',
    avatar: '/static/images/avatars/4.jpg',
    description: "Description Profile",
    jobTitle: 'Web Developer',
    location: 'Barcelona, Spain',
    social: '465',
  };

  return user;
}

export async function CheckMember() {
  
  const { walletAddress } = useWalletAddress();
  const wallet = walletAddress();
  const { data: signer  } = useSigner();

  const contractReadConfig = {
    addressOrName: contractAddress.NftERC721,
    contractInterface: NftERC721Artifact.abi,
  }
  const contractConfig = {
    ...contractReadConfig,
    signerOrProvider: signer,
  };
  
  const contract = useContract(contractConfig);
  const checkMember = await contract.checkAddressMember(wallet);

  console.log('Address Account', wallet);
  console.log('Check Member  = ', checkMember);
  if(checkMember == true){
    return true;
  }else{
    return false;
  }
}