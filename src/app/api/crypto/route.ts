import { tryCatch } from "@/helpers";
import { CryptoData } from "@/type/CryptoData";
import axios from "axios";

export async function GET() {

  return tryCatch(async () => {
    const response = await axios.get<{ data: CryptoData[] }>('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY,
        
      }
    })

    return Response.json(response.data.data)
  });
}