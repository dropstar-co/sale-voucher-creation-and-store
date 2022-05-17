require('dotenv').config();

const { STAGING_DATABASE_URL: DATABASE_URL } = process.env;

const { Pool, Client } = require('pg');

const ONE_DAY = 60 * 60 * 24;

async function main() {
  const nftId = 3;
  const paymentAddress = '';

  const client = new Client({
    connectionString: DATABASE_URL,
  });
  client.connect();
  const { rowCount, rows } = await client.query(
    `SELECT 
        *,
        u."walletAddress" as "userWallet",
        a."walletAddress" as "artistWallet" 
    from 
        "Bids" as b,
        "Users" as u,
        "Nfts" as n,
        "Artists" as a 
    where 
        b."userID"= u.id 
        and "nftID" = ${nftId} 
        and n.id=b."nftID" 
    order by "DateBid" desc`,
  );

  const firstRow = rows[0];
  console.log({ firstRow, rowCount });

  rows.map(row => {
    console.log(`${row.DateBid}/${row.walletAddress} --> ${row.AmountETH}`);
  });

  const startDate = Math.floor(Date.now() / 1000);
  const endDate = startDate + ONE_DAY;

  console.log({ now: Date.now(), startDate, endDate });

  const saleVoucher = {
    _id: '1',
    _tokenAddress: firstRow.PolygonAddress,
    _tokenId: firstRow.tokenId,
    _holderAddress: firstRow.artistWallet,
    _price: firstRow.minimumBidETH - 0.03,
    _bidWinnerAddress: firstRow.userWallet,
    _paymentRecipientAddress: 'aa',
    _startDate: startDate,
    _deadline: endDate,
  };

  console.log({ saleVoucher });

  //'epoch'::timestamptz;
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
