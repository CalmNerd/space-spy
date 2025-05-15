import { cn } from "@/lib/utils";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  // Only show a window of pages
  const getVisiblePages = () => {
    const windowSize = 3;
    if (totalPages <= windowSize) return pages;
    
    // Current page is close to the start
    if (currentPage <= Math.ceil(windowSize / 2)) {
      return [...pages.slice(0, windowSize), '...', totalPages];
    }
    
    // Current page is close to the end
    if (currentPage >= totalPages - Math.floor(windowSize / 2)) {
      return [1, '...', ...pages.slice(-windowSize)];
    }
    
    // Current page is in the middle
    return [
      1, 
      '...', 
      currentPage - 1, 
      currentPage, 
      currentPage + 1, 
      '...', 
      totalPages
    ];
  };
  
  const visiblePages = getVisiblePages();
  
  return (
    <div className={cn("pagination", className)}>
      <button 
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-item disabled:opacity-50"
      >
        <ChevronLeft size={16} />
      </button>
      
      {visiblePages.map((page, index) => (
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="pagination-item flex items-center justify-center">
            ...
          </span>
        ) : (
          <button
            key={`page-${page}`}
            onClick={() => onPageChange(page as number)}
            className={cn(
              "pagination-item",
              currentPage === page ? "active" : ""
            )}
          >
            {page}
          </button>
        )
      ))}
      
      <button 
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-item disabled:opacity-50"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}