import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY

type SetData = {
    name: string,
    elems: string[]
}

export default async function getNftHolderData(req: NextApiRequest, res: NextApiResponse<SetData[]>) {
    // The request should contain a list of contract addresses corresponding to NFT collections
    const {contractAddresses = []} = req.query

    // Now for every contract address, let's query alchemy for the owners of this nft collection
    const ownerCollectionBaseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${ALCHEMY_API_KEY}/getOwnersForCollection`;
    const contractMetadataBaseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${ALCHEMY_API_KEY}/getContractMetadata`;
    const result: SetData[] = []

    for (const contractAddress of contractAddresses) {
        let url = `${ownerCollectionBaseURL}?contractAddress=${contractAddress}`
        const rawOwnerCollectionRes = await axios.get(url)
        url = `${contractMetadataBaseURL}?contractAddress=${contractAddress}`
        const rawContractMetadataRes = await axios.get(url)

        result.push({
            'name': rawContractMetadataRes.data['contractMetadata']['symbol'],
            'elems': rawOwnerCollectionRes.data['owners']
        })
    }

    return res.send(result)
}