import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../db';
import { tryCatch } from '../../../helpers';

export async function GET() {

  return tryCatch(async () => {
    const querySnapshot = await getDocs(collection(db, 'bank'));
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return Response.json(data)
  });
}

export async function PATCH(request: Request) {

  return tryCatch(async () => {
    const res = await request.json()

    const bankRef = doc(db, 'bank', res.id)

    await updateDoc(bankRef, {
      bankName: res.bankName,
      accountNumber: res.accountNumber,
      holdersName: res.holdersName
    });


    return Response.json({ message: 'Bank updated!' });
  });
}