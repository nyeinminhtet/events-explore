import { describe, it, expect, beforeEach, vi } from "vitest";

import EventCard from "../shared/event-card";
import { mockEvent } from "../../test/mocks/mock-data";
import { render, screen, fireEvent } from "../../test/utils/test-utils";

describe("EventCard", () => {
  const mockOnClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render event information correctly", () => {
    render(<EventCard event={mockEvent} onClick={mockOnClick} />);

    expect(screen.getByText("Test Concert Event")).toBeInTheDocument();
    expect(
      screen.getByText(/This is a test concert event/),
    ).toBeInTheDocument();
    expect(screen.getByText("San Francisco, CA")).toBeInTheDocument();
    expect(screen.getByText("Music")).toBeInTheDocument();
    expect(screen.getByText("View Details")).toBeInTheDocument();
  });

  it("should format date and time correctly", () => {
    render(<EventCard event={mockEvent} onClick={mockOnClick} />);

    // Check for formatted date (Mar 16, 2024)
    expect(screen.getByText(/Mar 16, 2024/)).toBeInTheDocument();
    // Check for formatted time (1:30 AM)
    expect(screen.getByText(/1:30 AM/)).toBeInTheDocument();
  });

  it("should call onClick when card is clicked", () => {
    render(<EventCard event={mockEvent} onClick={mockOnClick} />);

    const card = screen.getByRole("button", { name: /view details/i });
    fireEvent.click(card);

    expect(mockOnClick).toHaveBeenCalledTimes(2);
  });

  it("should truncate long descriptions", () => {
    const longDescriptionEvent = {
      ...mockEvent,
      description: "A".repeat(150), // 150 characters
    };

    render(<EventCard event={longDescriptionEvent} onClick={mockOnClick} />);

    const description = screen.getByText(/A+\.\.\./);
    expect(description.textContent).toHaveLength(123); // 120 chars + "..."
  });

  it("should handle missing image with placeholder", () => {
    const eventWithoutImage = {
      ...mockEvent,
      imageUrl: undefined,
    };

    render(<EventCard event={eventWithoutImage} onClick={mockOnClick} />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("placeholder.svg"),
    );
  });

  it("should apply correct event type colors", () => {
    render(<EventCard event={mockEvent} onClick={mockOnClick} />);

    const badge = screen.getByText("Music");
    expect(badge).toHaveClass("bg-purple-100", "text-purple-800");
  });

  it("should handle image load errors", () => {
    render(<EventCard event={mockEvent} onClick={mockOnClick} />);

    const image = screen.getByRole("img");
    fireEvent.error(image);

    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("placeholder.svg"),
    );
  });
});
