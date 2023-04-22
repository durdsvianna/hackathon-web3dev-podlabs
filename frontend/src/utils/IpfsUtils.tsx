import React, { useState } from "react";
import axios from "axios";
import axiosRetry from "axios-retry";

import { create } from 'ipfs-http-client'
import { Buffer } from 'buffer'

// const projectId = process.env.INFURA_PROJECT_ID;
// const projectSecret = process.env.INFURA_API_KEY_SECRET;
const projectId = "2O1ovA2NQXFj27lDaTmBrvU3T2v";
const projectSecret = "ebadc15ff9f8ca6c8971c7e208ffc1c3";

const JWT = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1MzBlZjNhMy03N2VkLTQxNzEtYmUzNy1kZTM1ODJmMzNiNGIiLCJlbWFpbCI6ImR1cmRzLnZpYW5uYUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNzViNGM3NWE5MTAxZWYyNTk5N2IiLCJzY29wZWRLZXlTZWNyZXQiOiJlNzQwMGI2NGNlOWQ2ZmIzOWU1NTUzNTQ3ODEzMGJmZjEzYTYwY2EwOTgwMmEwY2ExOTk5YmE3Yjg2NmIxNWYzIiwiaWF0IjoxNjgwMjEwODYxfQ.IupimJof9irUhQn66z8M1HT8hIO8EDzPyN4rXEqXavQ'

export function useInfuraUploader(){
  const [uploadResult, setUploadResult] = useState({});

  async function uploadToInfura(file: File): Promise<{ cid: { }, path: string, size: number }> {
    /* configure Infura auth settings */
    // const projectId = process.env.INFURA_PROJECT_ID;
    // const projectSecret = process.env.INFURA_API_KEY_SECRET;
    const projectId = "2O1ovA2NQXFj27lDaTmBrvU3T2v";
    const projectSecret = "ebadc15ff9f8ca6c8971c7e208ffc1c3";
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
  return { uploadToInfura, uploadResult, setUploadResult };
}

export function usePinataUploader(sourceUrl){
  const [uploaded, setUploaded] = useState<boolean>(false);
  
  async function uploadToPinata(sourceUrl: string): Promise<boolean> {
    const axiosInstance = axios.create();
    axiosRetry(axiosInstance, { retries: 5 });
    const data = new FormData();

    const response = await axiosInstance(sourceUrl, {
      method: "GET",
      responseType: "stream",
    });
    data.append(`file`, response.data);

    try {
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
        maxContentLength: 100000000,
        maxBodyLength: 1000000000,
        headers: {
            'Content-Type': `multipart/form-data;`,
            'Authorization': JWT,
            'pinata_api_key': "75b4c75a9101ef25997b",
            'pinata_secret_api_key': "e7400b64ce9d6fb39e55535478130bff13a60ca09802a0ca1999ba7b866b15f3"
        }
      });
      console.log(res.data);
      return true;
    } catch (error) {
      console.log(error)
      return false;
    }
  }
  return { uploadToPinata, uploaded, setUploaded };
}

