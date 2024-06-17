import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../db';
import { tryCatch } from '../../../helpers';

export async function GET() {
  return tryCatch(async() => {
    const querySnapshot = await getDocs(collection(db, 'assets'));
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return Response.json(data)
  })
}