import { NextResponse } from 'next/server';
import { Polar } from '@polar-sh/sdk';
import { getPostHogClient } from '@/lib/posthog-server';

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

    const distinctId = request.headers.get('X-POSTHOG-DISTINCT-ID') || 'anonymous';
    const posthog = getPostHogClient();
    posthog.capture({
      distinctId,
      event: 'checkout_session_created',
      properties: { productId },
    });
    await posthog.flush();

    return NextResponse.json({ url: checkout.url });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Polar Checkout Error:', error);
    const errorDistinctId = request.headers.get('X-POSTHOG-DISTINCT-ID') || 'anonymous';
    const posthog = getPostHogClient();
    posthog.capture({ distinctId: errorDistinctId, event: 'checkout_error', properties: { error: errorMessage } });
    await posthog.flush();
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
