import { NextRequest } from 'next/server';
import { tokenTest } from '../../lib/tokenTest';

export async function GET(req: NextRequest): Promise<Response> {
  try {
    const data = tokenTest();
    return new Response(JSON.stringify(data));
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ status: `Error: ${error}` }));
  }
}
