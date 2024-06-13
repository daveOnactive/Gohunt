import { tryCatch } from "@/helpers";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../db";

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  return tryCatch(async () => {
    const res = await request.json()

    const slug = params.slug

    const assetRef = doc(db, 'assets', slug)

    await updateDoc(assetRef, {
      assetAddress: res.assetAddress,
      rate: {
        buy: res.buy,
        sell: res.sell
      }
    });


    return Response.json({ message: 'Asset updated!' });
  })
}

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  return tryCatch(async () => {

    const slug = params.slug

    const assetsRef = doc(db, 'assets', slug);

    const assets = (await getDoc(assetsRef)).data();

    return Response.json(assets);
  })
}