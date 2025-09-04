'use client';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from '../ui/skeleton';

const HeaderSkeleton = ({ columns = 6 }) => (
  <TableRow>
    {Array.from({ length: columns }).map((_, idx) => (
      <TableHead
        key={idx}
        className={idx === columns - 1 ? 'text-right' : ''}
      >
        <Skeleton
          className={idx === columns - 1 ? 'h-4 w-16 rounded ml-auto' : 'h-4 w-24 rounded'}
        />
      </TableHead>
    ))}
  </TableRow>
);

const RowSkeleton = ({ columns = 6 }) => (
  <TableRow>
    {Array.from({ length: columns }).map((_, idx) => (
      <TableCell key={idx}>
        <div
          className={`${idx === 1
            ? 'flex items-center gap-3'
            : idx === columns - 1
              ? 'flex justify-end gap-2'
              : 'h-4 w-full max-w-[160px]'
            }`}
        >
          {idx === 1 ? (
            <>
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-32 rounded" />
            </>
          ) : idx === columns - 1 ? (
            <>
              <Skeleton className="h-8 w-8 rounded" /> {/* View */}
              <Skeleton className="h-8 w-8 rounded" /> {/* Delete */}
            </>
          ) : (
            <Skeleton className="h-4 w-full max-w-[160px] rounded" />
          )}
        </div>
      </TableCell>
    ))}
  </TableRow>
);

const TableSkeleton = ({ columns = 6, rows = 10 }) => {
  return (
    <ScrollArea className="w-[calc(100vw-32px)] md:w-full rounded-lg whitespace-nowrap border">
        <Table>
          <TableHeader>
            <HeaderSkeleton columns={columns} />
          </TableHeader>
          <TableBody>
            {Array.from({ length: rows }).map((_, idx) => (
              <RowSkeleton key={idx} columns={columns} />
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation='horizontal'/>
    </ScrollArea>

  );
};

export default TableSkeleton;