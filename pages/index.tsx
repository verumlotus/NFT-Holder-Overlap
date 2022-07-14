import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import Footer from '../components/Footer'
import CustomizedVennDiagram from '../components/CustomizedVennDiagram'
import DataTable from '../components/DataTable'

const Home: NextPage = () => {
  const [contractAddresses, setContractAddresses] = useState('')
  // This should really be an empty list ([]), but this causes SSR vs client side differences
  // and Next.js complains
  const [vennDiagramSetData, setVennDiagramSetData] = useState(null)
  const [dataForTable, setDataForTable] = useState(null)
  const [intersectionName, setIntersectionName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  async function processContractAddresses() {
    // Clear any previous selection if there were any
    setDataForTable(null)
    setErrorMessage('')

    // Assumes that we have a string of the form 
    // "0x123, 0abc,    0xsomethingElse"
    // Let's clear the whitespace, and then split by commas
    const parsedContractAddresses = contractAddresses.replace(/\s+/g, '').split(',')
    // Make request to serverless func
    try {
      const rawCollectionHolderData = await axios.post(
        'api/holderData', 
        {
          data: {
            'contractAddresses': parsedContractAddresses
          }
        }
      )
      setVennDiagramSetData(rawCollectionHolderData.data)
    } catch (error) {
        setErrorMessage('Oops! Looks like we got an error, please check that your contract addresses \
        are correct and lives on Ethereum!')
    }
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
        Enter the contract addresses of NFT Collections on Ethereum (split by commas). Click on an intersection 
        inside the Venn Diagram to get all addresses at that intersection.
      </p>

      <input
        placeholder={`0x123, 0xabc, 0xefg`}
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
      {errorMessage &&
        <p>{errorMessage}</p>
      }
      {vennDiagramSetData &&
        <CustomizedVennDiagram
        vennDiagramSetData={vennDiagramSetData}
        setDataForTable={setDataForTable}
        setIntersectionName={setIntersectionName}
        />
      }
      {dataForTable &&
        <DataTable
          intersectionName={intersectionName}
          dataForTable={dataForTable}
        />
      }
      <Footer/>

    </main>
  </div>
  )
}

export default Home
