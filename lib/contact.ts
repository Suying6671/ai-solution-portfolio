export function buildMailtoHref(email: string, subject: string) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

export async function copyWithFallback(
  value: string,
  writeText?: ((text: string) => Promise<void>) | null,
) {
  const nativeWriter =
    typeof navigator === "undefined"
      ? undefined
      : navigator.clipboard?.writeText.bind(navigator.clipboard);
  const writer = writeText ?? nativeWriter;

  if (!writer) {
    throw new Error("clipboard-unavailable");
  }

  await writer(value);
}
