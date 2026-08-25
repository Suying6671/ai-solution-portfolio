import { describe, expect, it, vi } from "vitest";
import { buildMailtoHref, copyWithFallback } from "./contact";

describe("contact helpers", () => {
  it("builds an encoded recruiting email link", () => {
    expect(
      buildMailtoHref("shuchangfr@163.com", "聊聊企业 AI / Agent 岗位"),
    ).toBe(
      "mailto:shuchangfr@163.com?subject=%E8%81%8A%E8%81%8A%E4%BC%81%E4%B8%9A%20AI%20%2F%20Agent%20%E5%B2%97%E4%BD%8D",
    );
  });

  it("uses the supplied clipboard writer", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    await copyWithFallback("wsc02116801", writeText);
    expect(writeText).toHaveBeenCalledWith("wsc02116801");
  });

  it("reports when no clipboard writer is available", async () => {
    await expect(copyWithFallback("wsc02116801", null)).rejects.toThrow(
      "clipboard-unavailable",
    );
  });
});
