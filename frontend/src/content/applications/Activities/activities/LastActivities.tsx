import { CeateNftMint, LastActivitiesNft } from 'src/components/Nfts';

function LastActivities({ data }) {  

  return (
    <> 
    <CeateNftMint/>
    <LastActivitiesNft data={data}/>
    </>
  );
}

export default LastActivities;
