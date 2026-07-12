import { NextResponse } from 'next/server';
import { getPostHogClient } from '@/lib/posthog-server';

export async function POST(req: Request) {
  try {
    const { email, turnstileToken, honeypot } = await req.json();

    // 1. Honeypot Check
    // If the invisible honeypot field is filled, it's a bot. We silently return success to trick them.
    if (honeypot) {
      return NextResponse.json({ success: true, message: "Joined waitlist!" });
    }

    if (!email) {
      return NextResponse.json({ success: false, error: "Missing email" }, { status: 400 });
    }

    // 2. Cloudflare Turnstile Verification
    const secretKey = process.env.TURNSTILE_SECRET_KEY;
    if (secretKey && turnstileToken) {
      const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${secretKey}&response=${turnstileToken}`,
      });
      const verifyData = await verifyRes.json();

      if (!verifyData.success) {
        return NextResponse.json({ success: false, error: "Failed security check" }, { status: 400 });
      }
    } else if (secretKey && !turnstileToken) {
      return NextResponse.json({ success: false, error: "Please complete the captcha" }, { status: 400 });
    } else {
      console.warn("TURNSTILE_SECRET_KEY is not set. Skipping Turnstile verification.");
    }

    // 3. Save the Email (Send to Discord via Webhook)
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
    
    if (discordWebhookUrl) {
      const res = await fetch(discordWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `🎉 **New Atlas Waitlist Signup!**\n📧 Email: \`${email}\``,
        }),
      });
      
      if (!res.ok) {
        console.error("Failed to send to Discord webhook:", await res.text());
      }
    } else {
      // Fallback if Discord webhook is not set
      console.log(`[Waitlist] New signup received: ${email} (Configure DISCORD_WEBHOOK_URL to send to Discord)`);
    }

    const distinctId = req.headers.get('X-POSTHOG-DISTINCT-ID') || 'anonymous';
    const sessionId = req.headers.get('X-POSTHOG-SESSION-ID');
    const posthog = getPostHogClient();
    posthog.capture({
      distinctId,
      event: 'waitlist_signup_completed',
      properties: {
        source: 'hero_form',
        ...(sessionId ? { $session_id: sessionId } : {}),
      },
    });
    await posthog.flush();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist API error:", error);
    const errorDistinctId = req.headers.get('X-POSTHOG-DISTINCT-ID') || 'anonymous';
    const posthog = getPostHogClient();
    posthog.capture({ distinctId: errorDistinctId, event: 'waitlist_error', properties: { error: String(error) } });
    await posthog.flush();
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
