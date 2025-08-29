import { describe, it, expect, beforeEach, vi } from "vitest";

import userEvent from "@testing-library/user-event";

import { SearchFilters } from "../shared";
import { render, screen } from "../../test/utils/test-utils";

describe("SearchFilters", () => {
  const defaultProps = {
    searchQuery: "",
    onSearchChange: vi.fn(),
    locationQuery: "",
    onLocationChange: vi.fn(),
    selectedEventType: "",
    onEventTypeChange: vi.fn(),
    dateRange: { from: null, to: null },
    onDateRangeChange: vi.fn(),
    onClearFilters: vi.fn(),
    loading: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render all filter inputs", () => {
    render(<SearchFilters {...defaultProps} />);

    expect(
      screen.getByPlaceholderText("Search by title..."),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/City, State/)).toBeInTheDocument();
    // expect(screen.getByLabelText("Event Type")).toBeInTheDocument();
    expect(screen.getAllByText("Select date")).toHaveLength(2);
  });

  it("should call onSearchChange when search input changes", async () => {
    const user = userEvent.setup();
    render(<SearchFilters {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText("Search by title...");
    await user.type(searchInput, "concert");

    await new Promise((resolve) => setTimeout(resolve, 600));

    expect(defaultProps.onSearchChange).toHaveBeenCalledWith("concert");
  });

  it("should call onLocationChange when location input changes", async () => {
    const user = userEvent.setup();
    render(<SearchFilters {...defaultProps} />);

    const locationInput = screen.getByPlaceholderText(/City, State/);
    await user.type(locationInput, "San Francisco, CA");

    await new Promise((resolve) => setTimeout(resolve, 600));

    expect(defaultProps.onLocationChange).toHaveBeenCalledWith(
      "San Francisco, CA",
    );
  });

  it("should show clear filters button when filters are active", () => {
    render(<SearchFilters {...defaultProps} searchQuery="test" />);

    expect(screen.getByText("Clear All")).toBeInTheDocument();
  });

  it("should not show clear filters button when no filters are active", () => {
    render(<SearchFilters {...defaultProps} />);

    expect(screen.queryByText("Clear All")).not.toBeInTheDocument();
  });

  it("should call onClearFilters when clear button is clicked", async () => {
    const user = userEvent.setup();
    render(<SearchFilters {...defaultProps} searchQuery="test" />);

    const clearButton = screen.getByText("Clear All");
    await user.click(clearButton);

    expect(defaultProps.onClearFilters).toHaveBeenCalledTimes(1);
  });

  it("should disable inputs when loading", () => {
    render(<SearchFilters {...defaultProps} loading={true} />);

    expect(screen.getByPlaceholderText("Search by title...")).toBeDisabled();
    expect(screen.getByPlaceholderText(/City, State/)).toBeDisabled();
  });

  it("should display current filter values", () => {
    render(
      <SearchFilters
        {...defaultProps}
        searchQuery="concert"
        locationQuery="San Francisco, CA"
        selectedEventType="music"
      />,
    );

    expect(screen.getByDisplayValue("concert")).toBeInTheDocument();
    expect(screen.getByDisplayValue("San Francisco, CA")).toBeInTheDocument();
  });
});
