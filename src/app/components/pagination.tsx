import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePagination } from "../contexts/pagination";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

type PaginateProps = React.ComponentPropsWithoutRef<React.ElementType> & {
  current_page: number;
  last_page: number;
  from: number;
  total: number;
  onEachSide: number;
  per_page: number;
  onPageChange(page: number): void;
};

export function Paginate({
  current_page: currentPage,
  last_page: lastPage,
  total,
  per_page: perPage,
  onEachSide = 2,
  onPageChange,
  ...props
}: PaginateProps) {
  const { t } = useTranslation();
  const range = usePagination({
    currentPage,
    lastPage,
    onEachSide,
  });

  const showPaginate = total / perPage > 1;

  return (
    showPaginate && (
      <Pagination {...props} className="mt-3">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              size="default"
              buttonText={t('Previous')}
              onClick={() => onPageChange(currentPage - 1)}
              className={cn(
                "cursor-pointer",
                currentPage === 1 &&
                  "pointer-events-none text-muted select-none"
              )}
            />
          </PaginationItem>
          <div className="flex gap-1">
            {range?.map((page: number | string, index: number) => {
              return page == "..." ? (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={index}>
                  <PaginationLink
                    size="default"
                    isActive={page === currentPage}
                    onClick={() => onPageChange(Number(page))}
                    className={cn(
                      "cursor-pointer",
                      page === currentPage && "pointer-events-none select-none"
                    )}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
          </div>
          <PaginationItem>
            <PaginationNext
              size="default"
              buttonText={t('Next')}
              onClick={() => onPageChange(currentPage + 1)}
              className={cn(
                "cursor-pointer",
                currentPage === lastPage &&
                  "pointer-events-none text-muted select-none"
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  );
}
