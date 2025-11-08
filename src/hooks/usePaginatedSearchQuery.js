import { useState } from "react";
import useDebounce from "./usedebounce";

export default function usePaginatedSearchQuery(queryHook, { limit = 10, debounceMs = 600 } = {}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search
  const debouncedSearch = useDebounce(searchTerm, debounceMs, setCurrentPage);

  // Call the query hook dynamically
  const { data, isLoading, isError } = queryHook({
    page: currentPage,
    limit,
    searchTerm: debouncedSearch,
  });

  // Extract data safely
  const items = data?.data?.result || [];
  const totalPages = data?.data?.meta?.totalPages || 1;
  const page = data?.data?.meta?.page || 1;

  return {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    items,
    totalPages,
    page,
    isLoading,
    isError,
  };
}
