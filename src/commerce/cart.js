export const CART_STORAGE_KEY = "fit-originals-cart-v1";

export function createCartState() {
  return { lines: [] };
}

function lineKey(productId, size) {
  return `${productId}::${size}`;
}

function normalizeQuantity(quantity) {
  const parsed = Number.parseInt(quantity, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export function addCartLine(state, product, size, quantity = 1) {
  if (!product?.available) throw new Error("This jersey is sold out.");
  if (!size || !product.sizes?.includes(size)) throw new Error("Select a size before adding to cart.");

  const key = lineKey(product.id, size);
  const amount = normalizeQuantity(quantity);
  const existing = state.lines.find((line) => line.key === key);
  const lines = existing
    ? state.lines.map((line) =>
        line.key === key ? { ...line, quantity: line.quantity + amount } : line,
      )
    : [
        ...state.lines,
        {
          key,
          productId: product.id,
          slug: product.slug,
          title: product.title,
          price: product.price,
          image: product.image,
          alt: product.alt,
          size,
          quantity: amount,
        },
      ];
  return { lines };
}

export function updateCartLine(state, key, quantity) {
  const amount = normalizeQuantity(quantity);
  return {
    lines: state.lines.map((line) => (line.key === key ? { ...line, quantity: amount } : line)),
  };
}

export function removeCartLine(state, key) {
  return { lines: state.lines.filter((line) => line.key !== key) };
}

export function cartTotals(state) {
  return state.lines.reduce(
    (totals, line) => ({
      itemCount: totals.itemCount + line.quantity,
      subtotal: totals.subtotal + line.price * line.quantity,
    }),
    { itemCount: 0, subtotal: 0 },
  );
}

export function parseStoredCart(raw) {
  if (!raw) return createCartState();
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.lines)) return createCartState();
    const validLines = parsed.lines.filter(
      (line) =>
        typeof line?.key === "string" &&
        typeof line?.productId === "string" &&
        typeof line?.slug === "string" &&
        typeof line?.title === "string" &&
        Number.isInteger(line?.price) &&
        line.price >= 0 &&
        typeof line?.size === "string" &&
        Number.isInteger(line?.quantity) &&
        line.quantity > 0,
    );
    return validLines.length === parsed.lines.length ? { lines: validLines } : createCartState();
  } catch {
    return createCartState();
  }
}

