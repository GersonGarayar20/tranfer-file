
export async function GET(request:Request) {
  return new Response(JSON.stringify({ message: '¡Hola desde la estructura app!' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
