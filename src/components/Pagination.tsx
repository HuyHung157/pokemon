interface PaginationProps {
  currentPage: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  total,
  pageSize,
  onChange,
}: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);

  if (total === 0 || totalPages <= 1) {
    return null;
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="flex justify-center gap-4 py-4">
      {!isFirstPage && (
        <button
          className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          onClick={() => onChange(currentPage - 1)}
        >
          Previous
        </button>
      )}
      {!isLastPage && (
        <button
          className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          onClick={() => onChange(currentPage + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
}
