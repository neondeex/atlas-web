<wizard-report>
# PostHog post-wizard report

The wizard completed a deep integration of the Atlas website. The project already had a solid foundation: `instrumentation-client.ts`, reverse-proxy rewrites in `next.config.ts`, a server-side PostHog client, and event captures in all major components. The wizard audited every file, upgraded the server client to a singleton pattern, added error-event capture in both API route catch blocks, fixed a TypeScript lint error (`error: any` → `error: unknown` in the checkout route), and confirmed all environment variables are set with the correct values.

| Event | Description | File |
|---|---|---|
| `waitlist_joined` | User successfully submitted the hero waitlist form with their email. | `src/components/Hero.tsx` |
| `pre_order_clicked` | User clicked the pre-order button to open the Early Beta modal. | `src/components/Hero.tsx`, `src/components/Navbar.tsx` |
| `community_clicked` | User clicked the Discord community link in the navbar. | `src/components/Navbar.tsx` |
| `early_beta_modal_opened` | The Early Beta purchase modal was opened. | `src/components/EarlyBeta.tsx` |
| `checkout_initiated` | User clicked the Buy Early Access button to start the Polar checkout flow. | `src/components/EarlyBeta.tsx` |
| `faq_question_expanded` | User expanded a FAQ item to read the answer. | `src/components/FAQ.tsx` |
| `footer_pre_order_clicked` | User clicked the pre-order CTA in the footer section. | `src/components/Footer.tsx` |
| `checkout_session_created` | Server successfully created a Polar checkout session for a product. | `src/app/api/checkout/route.ts` |
| `waitlist_signup_completed` | Server processed a valid waitlist signup and forwarded it to Discord. | `src/app/api/waitlist/route.ts` |
| `checkout_error` | Server encountered an error while creating a Polar checkout session. | `src/app/api/checkout/route.ts` |
| `waitlist_error` | Server encountered an error while processing a waitlist signup. | `src/app/api/waitlist/route.ts` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/505741/dashboard/1834685)
- [Purchase funnel (wizard)](https://us.posthog.com/project/505741/insights/8r6mLVLH)
- [Waitlist signups over time (wizard)](https://us.posthog.com/project/505741/insights/nz557Uxf)
- [Pre-order clicks by source (wizard)](https://us.posthog.com/project/505741/insights/wAnFe13I)
- [FAQ engagement (wizard)](https://us.posthog.com/project/505741/insights/HscFynJr)
- [Waitlist vs checkout conversion (wizard)](https://us.posthog.com/project/505741/insights/isBLZQId)

## Verify before merging

- [ ] Run a full production build (`npm run build`) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.example` (and any monorepo/bootstrap scripts) so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify in PostHog Error Tracking.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
