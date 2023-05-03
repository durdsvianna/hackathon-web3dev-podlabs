import { useWalletAddress } from 'src/utils/Web3Utils';
import { useContract, useSigner } from 'wagmi';
import NftERC721Artifact from "src/contracts/NftERC721.json";
import contractAddress from "src/contracts/contract-nfterc721-address.json";

export default async function CheckMember() {
  
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