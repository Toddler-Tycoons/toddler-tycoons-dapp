// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./IAuctionHouse.sol";

contract ToddlerTycoons is ERC721, Ownable {
    IERC20 USDC;
    IAuctionHouse zoraAuctionHouse; // 0x6953190AAfD8f8995e8f47e8F014d0dB83E92300
    uint256 auctionDuration;

    uint256 mintFee;
    uint256 funds;
    struct royalty {
        address account;
        uint256 value;
    }
    royalty[] royalties;

    uint256[] private rewards;
    mapping(address => uint256) private claimed;

    uint256[] private auctionQueue;

    string private uriPrefix =
        "https://gateway.pinata.cloud/ipfs/QmX7aGBddgUTGBc1FfnPDuxgGZ1Sr4FLTzFs7epExRxsMs/";
    string private uriSuffix = ".json";

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    constructor(address _USDC, address _zoraAuctionHouse)
        ERC721("ToddlerTycoons", "TYCOONS")
    {
        USDC = IERC20(_USDC);
        zoraAuctionHouse = IAuctionHouse(_zoraAuctionHouse);
        royalties.push(royalty(msg.sender, 250));
        auctionDuration = 60 * 60 * 24 * 7;
        _setApprovalForAll(address(this), address(zoraAuctionHouse), true);
        _tokenIdCounter.increment();
        mintFee = 50 * 10**18;
    }

    function setUSDC(address _USDC) public onlyOwner {
        USDC = IERC20(_USDC);
    }

    function setZoraAuctionHouse(address _zoraAuctionHouse) public onlyOwner {
        zoraAuctionHouse = IAuctionHouse(_zoraAuctionHouse);
    }

    function setMintFee(uint256 _mintFee) public onlyOwner {
        mintFee = _mintFee;
    }

    function setUri(string memory _uriPrefix, string memory _uriSuffix)
        public
        onlyOwner
    {
        uriPrefix = _uriPrefix;
        uriSuffix = _uriSuffix;
    }

    function setRoyalties(address[] memory _accounts, uint256[] memory _values)
        public
        onlyOwner
    {
        require(_accounts.length == _values.length);
        delete royalties;
        for (uint256 i = 0; i < _accounts.length; i++) {
            royalties.push(royalty(_accounts[i], _values[i]));
        }
    }

    function setAuctionDuration(uint256 _auctionDuration) public onlyOwner {
        auctionDuration = _auctionDuration;
    }

    function safeMint(address _to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(_to, tokenId);
        funds += mintFee;
    }

    function safeBatchMint(address _to, uint256 _count) public onlyOwner {
        for (uint256 index = 0; index < _count; index++) {
            safeMint(_to);
        }
        funds += _count * mintFee;
    }

    function mintNFT(address _to, uint256 _qty) public {
        require(_to != address(0));
        require(_qty > 0);
        require(
            USDC.transferFrom(msg.sender, address(this), _qty * mintFee),
            "USDC transfer failed"
        );
        funds += _qty * mintFee;
        for (uint256 index = 0; index < _qty; index++) {
            uint256 tokenId = _tokenIdCounter.current();
            _tokenIdCounter.increment();
            _safeMint(_to, tokenId);
        }
    }

    function withdrawFunds(uint256 _amount) public onlyOwner {
        USDC.transfer(msg.sender, _amount);
    }

    function withdrawOtherTokens(address _token, uint256 _amount)
        public
        onlyOwner
    {
        IERC20(_token).transfer(msg.sender, _amount);
    }

    function depositFunds(uint256 _amount) public onlyOwner {
        funds += _amount;
        USDC.transferFrom(msg.sender, address(this), _amount);
    }

    function newReward(uint256 _reward) public onlyOwner {
        require(_reward > 0);
        rewards.push(_reward);
    }

    function rewardBalance(address _account) public view returns (uint256) {
        uint256 balance = 0;
        for (
            uint256 index = claimed[_account];
            index < rewards.length;
            index++
        ) {
            balance += (balanceOf(_account) * rewards[index]) / 10000;
        }
        return balance;
    }

    function _claimRewards(address _account) public {
        uint256 balance = rewardBalance(_account);
        if (balance > 0) {
            USDC.transfer(_account, balance);
            claimed[_account] = rewards.length;
        }
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {
        if (from != address(0)) _claimRewards(from);
        _claimRewards(to);
    }

    function refund(uint256 _tokenId) public {
        safeTransferFrom(msg.sender, address(this), _tokenId, "");
        USDC.transfer(msg.sender, funds / _tokenIdCounter.current());
        auctionQueue.push(_tokenId);
    }

    function putForAuction() public onlyOwner {
        require(auctionQueue.length > 0);
        uint256 tokenId = auctionQueue[0];
        auctionQueue[0] = auctionQueue[auctionQueue.length - 1];
        auctionQueue.pop();
        zoraAuctionHouse.createAuction(
            tokenId,
            address(this),
            auctionDuration,
            0,
            payable(address(0)),
            0,
            address(USDC)
        );
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(
                    uriPrefix,
                    Strings.toString(tokenId),
                    uriSuffix
                )
            );
    }

    function getRaribleV2Royalties(uint256 id)
        external
        view
        returns (royalty[] memory)
    {
        return royalties;
    }

    function onERC721Received(
        address _operator,
        address _from,
        uint256 _tokenId,
        bytes memory _data
    ) external returns (bytes4 value) {
        return IERC721Receiver.onERC721Received.selector;
    }
}
