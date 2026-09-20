"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

export default function Pagination({ totalCount, pageSize = 10 }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const pageCount = Math.ceil(totalCount / pageSize);
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  function handlePageChange(page) {
    if (page < 1 || page > pageCount || page === currentPage) return;

    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }

  if (pageCount <= 1) return null;

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      {/* Previous Button */}
      <button
        className="icon-button relative disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || isPending}
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {Array.from({ length: pageCount }, (_, index) => {
          const pageNumber = index + 1;
          const isActive = pageNumber === currentPage;

          return (
            <button
              key={pageNumber}
              className={`${
                isActive ? "page-active" : "page-button"
              } relative min-w-10 disabled:cursor-not-allowed`}
              onClick={() => handlePageChange(pageNumber)}
              disabled={isPending}
            >
              {isActive && isPending ? (
                <Loader2 size={16} className="mx-auto animate-spin" />
              ) : (
                pageNumber
              )}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        className="icon-button relative disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === pageCount || isPending}
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
