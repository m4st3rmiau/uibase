"use client"

import { useState } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface EditablePaginationProps {
  props: {
    totalPages: number
    currentPage: number
    showPrevNext: boolean
    showEllipsis: boolean
  }
}

export function EditablePagination({ props }: EditablePaginationProps) {
  const { totalPages, currentPage: initialPage, showPrevNext, showEllipsis } = props
  const [currentPage, setCurrentPage] = useState(initialPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <Pagination>
      <PaginationContent>
        {showPrevNext && (
          <PaginationItem>
            <PaginationPrevious href="#" onClick={() => handlePageChange(Math.max(1, currentPage - 1))} />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink href="#" onClick={() => handlePageChange(1)} isActive={currentPage === 1}>
            1
          </PaginationLink>
        </PaginationItem>
        {showEllipsis && currentPage > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {Array.from({ length: 3 }, (_, i) => currentPage + i - 1)
          .filter((page) => page > 1 && page < totalPages)
          .map((page) => (
            <PaginationItem key={page}>
              <PaginationLink href="#" onClick={() => handlePageChange(page)} isActive={currentPage === page}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
        {showEllipsis && currentPage < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {totalPages > 1 && (
          <PaginationItem>
            <PaginationLink href="#" onClick={() => handlePageChange(totalPages)} isActive={currentPage === totalPages}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}
        {showPrevNext && (
          <PaginationItem>
            <PaginationNext href="#" onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}
