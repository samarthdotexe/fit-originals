export function getCheckoutState(cart, providerMode = "demo") {
  if (!cart?.lines?.length) return { canContinue: false, mode: "empty", paymentUrl: null };
  return {
    canContinue: true,
    mode: providerMode === "shopify" ? "shopify" : "demo",
    paymentUrl: null,
  };
}

