export async function tryCatch(callback: () => Promise<Response>) {
  try {
    return await callback();
  } catch (e: any) {
    console.log(e)
    return Response.json({ message: e.message }, {
      status: e.statusCode || 500
    });
  }
}

