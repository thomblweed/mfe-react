import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it } from "vitest";

import { App } from "./App";

describe("when the App renders", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("should display the title", () => {
    expect(
      screen.getByRole("heading", { name: "header app" })
    ).toBeInTheDocument();
  });
});
