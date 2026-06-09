import { ChevronsLeft, ChevronsRight } from "lucide-react";

type PaginationProps = {
  favorites: number;
  stationsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const Pagination = ({
  favorites,
  stationsPerPage,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(favorites / stationsPerPage); i++) {
    pages.push(i);
  }

  function getPageWindow(current: number, total: number): number[] {
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

    let start = Math.max(1, current - 2);
    let end = start + 4;

    if (end > total) {
      end = total;
      start = total - 4;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
  const total = Math.ceil(favorites / stationsPerPage);
  pages = getPageWindow(currentPage, total);

  return (
    <div className="flex flex-row gap-2 items-center justify-center">
      <button
        onClick={() => setCurrentPage((currentPage = 1))}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-8 h-8 rounded-md border text-md  cursor-pointer hover:opacity-70 dark:text-background text-foreground font-semibold disabled:cursor-not-allowed disabled:opacity-70"
      >
        <ChevronsLeft size={16} />
      </button>
      {pages.map((page, index) => {
        return (
          <button
            className={`flex items-center justify-center w-10 rounded-md border text-md h-10 px-4.5 cursor-pointer hover:opacity-70 ${currentPage === page ? "bg-foreground dark:bg-background text-background dark:text-foreground font-semibold" : ""}`}
            key={index}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        );
      })}
      <button
        onClick={() => setCurrentPage((currentPage = total))}
        disabled={currentPage === total}
        className="flex items-center justify-center w-8 h-8 rounded-md border text-md  cursor-pointer hover:opacity-70 dark:text-background text-foreground font-semibold disabled:cursor-not-allowed disabled:opacity-70"
      >
        <ChevronsRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
