export async function tryCatch(callback: () => Promise<Response>) {
  try {
    return await callback();
  } catch (e: any) {
    return Response.json({ message: e.message });
  }
}

