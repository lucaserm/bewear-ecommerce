import { loadStripe } from "@stripe/stripe-js";

import { env } from "@/env";

const configValue: string = env.NEXT_PUBLIC_STRIPE_KEY as string;
export async function getStripeJs() {
  return await loadStripe(configValue);
}
