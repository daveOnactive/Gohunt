import { Transaction } from "@/type";

export function emailTemplate(data: Transaction, isConfirmOder: boolean = false) {
  const isBuy = data.transactionType.toLowerCase() === 'buy';
  const buyLi = `<li><b>Wallet Address:</b>${data.walletAddress} (${data.network})</li>`;
  const sellLI = `<li><b>Account Number:</b>${data.bankAccount} - (${data.bankName}) - (${data.holdersName})</li>`;

  const Li = isBuy ? buyLi : sellLI;

  const title = !isConfirmOder ? 'Order Placed' : 'Order Confirmed'

  return (
    `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    html {
      font-family: monospace;
    }
    img {
      width: 300px;
      margin: auto;
      display: flex;
    }
    .header {
      background-color: #0F101E;
      height: 180px;
      width: 100%;
    }
    h2, p {
      text-align: center;
    }
    p {
      font-size: 1rem;
    }
    ul {
      text-decoration: none;
      list-style: none;
    }
    li {
      margin: 1rem 0
    }
    b {
      margin-right: .3rem
    }
    a {
      padding: 1.5rem 2rem;
      background: rgb(2, 183, 2);
      display: flex;
      text-decoration: none;
      border-radius: 8px;
      margin: 2rem auto;
      width: fit-content;
    }
  </style>
  <title>Document</title>
</head>
<body>
  <div class="header">
    <img src="https://res.cloudinary.com/de5uooskb/image/upload/v1733294297/hixqhs3afjgvqvqikgvc.png"/>
  </div>

  <h2>${title}</h2>
  <p>${data.transactionType}</p>

  <div>
    <ul>
      <li><b>Phone Number:</b>${data.phoneNumber}</li>
      <li><b>Amount:</b>$${data.amount}</li>
      ${Li}
    </ul>
  </div>
  ${isConfirmOder ? '' : `<a href="https://www.gohuntfx.com/dashboard" target="_blank" style="color: #ffffff">Approve Order</a>`}
</body>
</html>
    `
  )
}