import { NextResponse } from 'next/server';
import { Polar } from '@polar-sh/sdk';

const polar = new Polar({
  // The token should be in .env.local
  accessToken: process.env.POLAR_ACCESS_TOKEN || 'YOUR_TOKEN_HERE',
  server: 'production', // Force production since the token is likely from live dashboard
});

export async function POST(request: Request) {
  try {
    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    if (!process.env.POLAR_ACCESS_TOKEN) {
      return NextResponse.json({ 
        error: 'Please add POLAR_ACCESS_TOKEN to your .env.local file' 
      }, { status: 500 });
    }

    const checkout = await polar.checkouts.create({
      products: [productId],
    });

    return NextResponse.json({ url: checkout.url });
  } catch (error: any) {
    console.error('Polar Checkout Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
