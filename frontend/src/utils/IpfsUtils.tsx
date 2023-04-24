import React, { useState } from "react";
import axios from "axios";
import axiosRetry from "axios-retry";

import { create } from 'ipfs-http-client'
import { Buffer } from 'buffer'

export function useIpfsUploader(){
  const [uploadResult, setUploadResult] = useState({});

  async function uploadToInfura(file: File): Promise<{ cid: { }, path: string, size: number }> {
    /* configure Infura auth settings */
    const projectId = process.env.INFURA_PROJECT_ID;
    const projectSecret = process.env.INFURA_API_KEY_SECRET;
    const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
    /* Create an instance of the client */
    const clientIpfs = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
          authorization: auth,
      }
    });    
    const addResult = await clientIpfs.add(file); 
    return addResult;        
  }

  async function uploadToPinata(file: File): Promise<{ cid: { }, path: string, size: number }> {
    /* configure pinata auth settings */
    const JWT = process.env.PINATA_AUTH;
    console.log("JWT", JWT)
    const formData = new FormData();
    formData.append('file', file)
    const metadata = JSON.stringify({
      name: file.name,
    });
    formData.append('pinataMetadata', metadata);
    const options = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', options);
    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData}`,
          Authorization: JWT
        }
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
    return null;        
  }

  return { uploadToInfura, uploadToPinata, uploadResult, setUploadResult };
}
