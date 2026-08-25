import { describe, expect, it } from "vitest";
import { nextExpandedProjectId } from "./projects";

describe("project expansion", () => {
  it("opens a selected project", () => {
    expect(nextExpandedProjectId(null, "creative-worker")).toBe("creative-worker");
  });

  it("closes the currently selected project", () => {
    expect(nextExpandedProjectId("creative-worker", "creative-worker")).toBeNull();
  });

  it("switches directly to a different project", () => {
    expect(nextExpandedProjectId("creative-worker", "brand-insight")).toBe("brand-insight");
  });
});
