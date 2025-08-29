import { vi } from "vitest";
import "@testing-library/jest-dom";

// Mock environment variables
process.env.NEXT_PUBLIC_TICKETMASTER_API_KEY =
  "ACM4ux1jrhVwP68TxiJ0XgVADrYp8yWp";

// Mock fetch with proper Response structure
global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  status: 200,
  json: vi.fn().mockResolvedValue({}),
  text: vi.fn().mockResolvedValue(""),
  headers: new Map(),
} as unknown as Response);

// Mock window.location
const mockLocation = {
  pathname: "/",
  search: "",
  hash: "",
  href: "http://localhost:3000/",
  origin: "http://localhost:3000",
  host: "localhost:3000",
  hostname: "localhost",
  port: "3000",
  protocol: "http:",
  assign: vi.fn(),
  reload: vi.fn(),
  replace: vi.fn(),
};

Object.defineProperty(window, "location", {
  value: mockLocation,
  writable: true,
});

// Mock window.history
Object.defineProperty(window, "history", {
  value: {
    pushState: vi.fn(),
    replaceState: vi.fn(),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    length: 0,
    state: {},
  },
  writable: true,
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor(
    private callback: IntersectionObserverCallback,
    private options?: IntersectionObserverInit,
  ) {}

  disconnect() {}
  observe(element: Element) {}
  unobserve(element: Element) {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor(private callback: ResizeObserverCallback) {}

  disconnect() {}
  observe(target: Element, options?: ResizeObserverOptions) {}
  unobserve(target: Element) {}
};

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock scrollTo
window.scrollTo = vi.fn();

// Suppress specific console warnings in tests
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

console.warn = (...args) => {
  if (
    typeof args[0] === "string" &&
    args[0].includes("React Router Future Flag Warning")
  ) {
    return;
  }
  originalConsoleWarn(...args);
};

console.error = (...args) => {
  originalConsoleError(...args);
};

// Cleanup mocks after each test
export const resetAllMocks = () => {
  vi.resetAllMocks();
  vi.clearAllMocks();

  // Reset fetch mock to default
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: vi.fn().mockResolvedValue({}),
    text: vi.fn().mockResolvedValue(""),
    headers: new Map(),
  } as unknown as Response);
};
