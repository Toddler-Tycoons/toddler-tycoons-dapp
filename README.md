# Toddler Tycoons

Li'l investors trying to take over the world economy. NFT's that own a treasury and reward their holders. #NFTthatPays

![Alt Text](https://cdn.discordapp.com/attachments/931244674876846124/932244169148203038/Toddler_Tycoons.gif)

### What does it offers

Toddler Tycoons is an NFT project where the money accumulated by minting is first stored in the treasury and then the treasury invests the sum into stable DeFi Protocols. The NFT holders are rewarded by distributing the returns on the investments made by the treasury. Apart from the minting revenue, the treasury is also funded by the royalties from each consecutive trade of the NFTs, which is again invested in the DeFi Protocols.

All the NFTs will be backed by the amount in the treasury and will have a definitive floor price. The NFT holders can return these NFTs if they want to withdraw from the community. When returning an NFT the Treasury will pay back the NFT holder the floor price at that point in time. All the NFTs collected by the treasury (acquired, returned, etc.) will be auctioned.

### How is it made

**Smart Contracts:** 
Toddler Tycoons is an ERC721 standard smart contract. This smart contract provides all the features to mint the NFT in minimum gas as possible, checking users' NFT Balance, managing treasury, etc. It is written in solidity, tested on remix, and deployed using Hardhat.

**Front-end:**
The UI of the app is made using React.js. And the front-end is connected to the Smart Contracts using web3.js. The wallet connections and management is done using web3Modal. The state in the react app is managed using ContextAPI. The Dapp is deployed on Netlify.

**Generative Art:**
For the generative art, I used Hashlips Art Engine, which programmatically generates the images by layering different layers. The art was then uploaded to Pinata and once cid was generated I updated the utils of the file. 
