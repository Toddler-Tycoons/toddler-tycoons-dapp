import React from "react";
import { FetchStaticData } from "@zoralabs/nft-hooks";
import { NFTPreview } from "@zoralabs/nft-components";

const AuctionList = ({ tokens }) => {
	return (
		<div css={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
			{tokens &&
				tokens.map((token) => {
					const tokenInfo = FetchStaticData.getIndexerServerTokenInfo(token);
					return (
						<NFTPreview
							initialData={token}
							key={tokenInfo.tokenId}
							id={tokenInfo.tokenId}
							contract={tokenInfo.tokenContract}
							onClick={(evt) =>
								router.push(
									`/token/${tokenInfo.tokenContract}/${tokenInfo.tokenId}`,
								)
							}
							useBetaIndexer={true}
						/>
					);
				})}
		</div>
	);
};

export default AuctionList;
