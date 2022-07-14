# NFT Holder Overlap
Render a Venn Diagram to display the overlap between holders of different NFT Collections. 

# Background
Many NFT collections form small communities with their own quirks and personalities. Almost all collectors hold multiple NFTs, and I thought it would be interesting to see which communities have the most overlap in terms of shared holders. A Venn Diagram was the natural visualization to render this data.

![nft-holder-overlap](https://user-images.githubusercontent.com/97858468/179078533-854e1dc8-4de4-4e91-8f56-424e76644b4b.gif)

# Architecture
Our website is built using [Next.js](https://nextjs.org/) and is hosted by [Vercel](https://vercel.com/). A user submits a list of contract addresses that is then sent to a [Vercel Serveless Function](https://vercel.com/docs/concepts/functions/serverless-functions) which then determines the owners of the NFT collection using [Alchemy's enhanced API](https://docs.alchemy.com/alchemy/). For our front-end visualization, we use [Upset.js](https://upset.js.org/)

# Improvements
This webiste is a quick hack and fairly simple by design. It's designed for desktop first, so future improvements can improve the mobile experience. It'd also be interesting to add more analytics to better understand how these different NFT communities intersect. 
