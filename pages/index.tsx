import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import Footer from '../components/Footer'
import Faq from '../components/Faq'

const Home: NextPage = () => {
  const [contractAddresses, setContractAddresses] = useState('')
  const [vennDiagramSetData, setVennDiagramSetData] = useState([])

  async function processContractAddresses() {
    // Assumes that we have a string of the form 
    // "0x123, 0abc,    0xsomethingElse"
    // Let's clear the whitespace, and then split by commas
    const parsedContractAddresses = contractAddresses.replace(/\s+/g, '').split(',')
    // Make request to serverless func
    const rawCollectionHolderData = await axios.get(
      'api/holderData', 
      {
        params: {
          'contractAddresses': parsedContractAddresses
        }
      }
    )

    setVennDiagramSetData(rawCollectionHolderData.data)
  }

  return (
    <div className={styles.container}>
    <Head>
      <title>NFT Holder Overlap</title>
      <meta name="description" content="See NFT Collection Holder Overlap via a Venn Diagram" />
      <link rel="icon" type="image/png" sizes="16x16" href="/images/VennDiagram.png" />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>
      NFT Holder Overlap
      </h1>

      <p className={styles.description}>
        Enter the contract addresses of NFT Collections on Ethereum (split by commas). A Venn Diagram showing the overlap of collection holders
        will be rendered afterwards.
      </p>

      <input
        placeholder={`0x123, 0xabc, etc`}
        value={contractAddresses}
        onChange={(e) => setContractAddresses(e.target.value)}
        style={{"width": "60vw"}}
      />

      <button 
        onClick={processContractAddresses}
        style={{"height": "6vh", "width": "20vw", "marginTop": "3vh"}}
      >
        Generate Venn Diagram
      </button>

      {/* <p>{returnString}</p>
      {s3BucketLink &&
        <p>View the images <a href={s3BucketLink} style={{color: "blue"}}>here</a></p>
      } */}
      {/* <Faq/> */}
      <Footer/>

    </main>
  </div>
  )
}

export default Home
