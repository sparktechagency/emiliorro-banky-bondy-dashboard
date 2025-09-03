import Title from "@/components/ui/Title";
import { useState } from "react";
import PageLayout from "@/components/main-layout/PageLayout";
import CustomPagination from "@/components/common/CustomPagination";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye } from "lucide-react";
import { users } from "@/data/data";

const Report = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;

  // Build some static report rows from existing users data
  const rows = users.slice(0, 10).map((u, idx) => ({
    id: `#12${330 + idx}`,
    reportedBy: u,
    reportedAgainst: users[(idx + 1) % users.length],
    type: idx % 2 === 0 ? "Spam" : "Harassment",
  }));

  const renderTable = () => (
    <ScrollArea className="w-[calc(100vw-32px)] md:w-full rounded-lg overflow-hidden whitespace-nowrap">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S no.</TableHead>
            <TableHead>Reported By</TableHead>
            <TableHead>Report Against</TableHead>
            <TableHead>Report Type</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="text-muted-foreground">{r.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="size-8">
                    <AvatarImage src={r.reportedBy.image} alt={r.reportedBy.name} />
                    <AvatarFallback>{r.reportedBy.name?.[0] ?? "U"}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{r.reportedBy.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="size-8">
                    <AvatarImage src={r.reportedAgainst.image} alt={r.reportedAgainst.name} />
                    <AvatarFallback>{r.reportedAgainst.name?.[0] ?? "U"}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{r.reportedAgainst.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{r.type}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="icon" aria-label="View details">
                  <Eye className="h-5 w-5" />
                </Button>
                <Button variant="outline">Decline</Button>
                <Button>Remove</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );

  return (
    <PageLayout
      pagination={
        totalPages > 1 && (
          <div className="mt-4">
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )
      }
    >
      <div className="space-y-4">
        <Title title="Report management" />
        <Tabs defaultValue="user" className="w-full">
          <TabsList>
            <TabsTrigger value="user">User Reports</TabsTrigger>
            <TabsTrigger value="media">Media Reports</TabsTrigger>
            <TabsTrigger value="ai">AI Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="user">{renderTable()}</TabsContent>
          <TabsContent value="media">{renderTable()}</TabsContent>
          <TabsContent value="ai">{renderTable()}</TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Report;