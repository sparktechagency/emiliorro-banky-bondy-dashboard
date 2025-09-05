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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Trash, X } from "lucide-react";

export default function UserReportTable({ rows = [] }) {
  const fmtDate = (d) => {
    try {
      return d ? new Date(d).toLocaleDateString() : "";
    } catch {
      return "";
    }
  };

  return (
    <ScrollArea className="w-[calc(100vw-32px)] overflow-hidden overflow-x-auto md:w-full rounded-lg whitespace-nowrap">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S no.</TableHead>
            <TableHead>Reported By</TableHead>
            <TableHead>Report Against</TableHead>
            <TableHead>Report Type</TableHead>
            {/* <TableHead>Message</TableHead> */}
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r, i) => {
            const byName = r.reportedBy?.name ?? r.report_by ?? "Unknown";
            const byImg = r.reportedBy?.image;
            const agName = r.reportedAgainst?.name ?? r.report_against ?? "Unknown";
            const agImg = r.reportedAgainst?.image;
            const type = r.type ?? r.report_type ?? "";
            // const message = r.report_message ?? "";
            const date = r.report_date ?? "";
            return (
              <TableRow key={String(i)}>
                <TableCell className="text-muted-foreground">{String(i + 1)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-8 border">
                      {byImg ? (
                        <AvatarImage src={byImg} alt={String(byName)} />
                      ) : null}
                      <AvatarFallback>{String(byName)?.[0] ?? "U"}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{String(byName)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-8 border">
                      {agImg ? (
                        <AvatarImage src={agImg} alt={String(agName)} />
                      ) : null}
                      <AvatarFallback>{String(agName)?.[0] ?? "U"}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium truncate max-w-[240px] inline-block align-middle">{String(agName)}</span>
                  </div>
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
