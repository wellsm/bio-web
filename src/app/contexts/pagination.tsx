import { useMemo } from "react";

const range = (start: number, end: number) => {
  const length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
};

const DOTS = "...";

type PaginationProps = {
  onEachSide?: number;
  currentPage: number;
  lastPage: number;
};

export const usePagination = ({
  onEachSide = 1,
  currentPage,
  lastPage,
}: PaginationProps) => {
  return useMemo(() => {
    const pages = onEachSide + 5;
    
    if (pages >= lastPage) {
      return range(1, lastPage);
    }
    
    const firstPage = 1;
    const leftSide = Math.max(currentPage - onEachSide, 1);
    const rightSide = Math.min(currentPage + onEachSide, lastPage);

    const shouldShowLeftDots = leftSide > 2;
    const shouldShowRightDots = rightSide < lastPage - 2;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * onEachSide;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, lastPage];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * onEachSide;
      const rightRange = range(lastPage - rightItemCount + 1, lastPage);
      return [firstPage, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSide, rightSide);
      return [firstPage, DOTS, ...middleRange, DOTS, lastPage];
    }
  }, [onEachSide, currentPage, lastPage]);
};
