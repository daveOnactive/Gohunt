import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../db';

export async function GET() {
  const querySnapshot = await getDocs(collection(db, 'assets'));
  const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  return Response.json({ data })
}

export async function PATCH(request: Request) {

  const res = await request.json()

  const assetRef = doc(db, 'assets', res.id)

  await updateDoc(assetRef, {
    assetAddress: res.assetAddress,
    rate: {
      buy: res.buy,
      sell: res.sell
    }
  });


  return Response.json({ message: 'Asset updated!' });
}