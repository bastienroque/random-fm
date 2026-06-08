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

  return (
    <div className="flex flex-row gap-2">
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
    </div>
  );
};

export default Pagination;
