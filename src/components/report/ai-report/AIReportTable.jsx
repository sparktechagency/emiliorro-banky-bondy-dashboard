import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Trash, X } from "lucide-react";

export default function AIReportTable({ rows = [] }) {
  const fmtDate = (d) => {
    try {
      return d ? new Date(d).toLocaleDateString() : "";
    } catch {
      return "";
    }
  };

  return (
    <ScrollArea className="w-[calc(100vw-32px)] md:w-full rounded-lg overflow-hidden whitespace-nowrap">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S no.</TableHead>
            <TableHead>Report Against</TableHead>
            <TableHead>Report Type</TableHead>
            {/* <TableHead>Message</TableHead> */}
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r, i) => {
            const id = r.id ?? r._id;
            const against = r.reportedAgainst?.name ?? r.report_against ?? "Unknown";
            const type = r.type ?? r.report_type ?? "";
            // const message = r.report_message ?? "";
            const date = r.report_date ?? "";
            return (
              <TableRow key={String(id)}>
                <TableCell className="text-muted-foreground">{String(i + 1)}</TableCell>
                <TableCell>
                  <span className="font-medium truncate max-w-[320px] inline-block align-middle">{String(against)}</span>
                </TableCell>
                <TableCell className="text-muted-foreground">{String(type)}</TableCell>
                {/* <TableCell className="text-muted-foreground max-w-[360px] truncate">{String(message)}</TableCell> */}
                <TableCell className="text-muted-foreground">{fmtDate(date)}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="icon" aria-label="View details">
                    <Eye/>
                  </Button>
                  <Button variant="outline" size="icon" aria-label="Decline">
                    <X/>
                  </Button>
                  <Button variant="destructive" size="icon" aria-label="Remove">
                    <Trash/>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
