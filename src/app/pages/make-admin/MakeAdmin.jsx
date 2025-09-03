import { Suspense, useState } from "react";
import Title from "@/components/ui/Title";
import PageLayout from "@/components/main-layout/PageLayout";
import CustomPagination from "@/components/common/CustomPagination";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { users } from "@/data/data";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const MakeAdmin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;

  return (
    <Suspense fallback={<div className="flex items-center justify-center h-64">Loading Make Admin...</div>}>
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
        {/* Header: Title and Action Button */}
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
          <Title title="Make Admin" />
          <Button className="md:self-start shadow-md">Make Admin</Button>
        </div>

        {/* Table */}
        <ScrollArea className="w-[calc(100vw-32px)] md:w-full rounded-lg overflow-hidden whitespace-nowrap">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S.ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>User Type</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={`${user.email}-${index}`}>
                  <TableCell>#{12333 + index}</TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>Admin</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="icon" className="text-red-500 hover:text-red-600">
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </PageLayout>
    </Suspense>
  );
};

export default MakeAdmin;