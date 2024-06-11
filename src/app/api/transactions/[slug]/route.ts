import { doc, updateDoc, getDoc } from "firebase/firestore"
import { db } from "../../db"
import { Status } from "../../../../type"
import { tryCatch } from "../../../../helpers";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  return tryCatch(async () => {
    const slug = params.slug;
  
    const transactionRef = doc(db, 'transactions', slug);
  
    const transaction = (await getDoc(transactionRef)).data();
  
    return Response.json({ data: transaction })
  })
}

export async function PATCH(
  request: Request,
  { params }: { params: { slug: string } }
) {
  return tryCatch(async () => {
    const slug = params.slug
  
    const res = await request.json()
  
    const transactionRef = doc(db, 'transactions', slug);
  
    await updateDoc(transactionRef, {
      status: Status[res.status?.toUpperCase() as keyof typeof Status]
    });
  
    return Response.json({ data: transactionRef.id, message: 'Transaction Status Updated!' })
  })
}