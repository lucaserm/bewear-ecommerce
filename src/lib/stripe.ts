import { loadStripe } from "@stripe/stripe-js";

import { env } from "@/env";

const configValue = env.NEXT_PUBLIC_STRIPE_KEY;
export async function getStripeJs() {
  return await loadStripe(configValue);
}
