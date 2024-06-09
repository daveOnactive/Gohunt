import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../db';

export async function GET() {
  const querySnapshot = await getDocs(collection(db, 'bank'));
  const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  return Response.json({ data })
}

export async function PATCH(request: Request) {

  try {
    const res = await request.json()

    const bankRef = doc(db, 'bank', res.id)

    await updateDoc(bankRef, {
      bankName: res.bankName,
      accountNumber: res.accountNumber,
      holdersName: res.holdersName
    });


    return Response.json({ message: 'Bank updated!' });
  } catch (err: any) {
    return Response.json({ message: err.message });
  }
}