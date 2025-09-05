import { Suspense, useState } from "react";
import Title from "@/components/ui/Title";
import PageLayout from "@/components/main-layout/PageLayout";
import CustomPagination from "@/components/common/CustomPagination";
import { Plus, Search } from "lucide-react";
import useDebounce from "@/hooks/usedebounce";
import { useGetAllAdminQuery } from "@/redux/feature/admin/adminApi";
import { Input } from "@/components/ui/input";
import AdminTable from "@/components/admin/table/AdminTable";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { Button } from "@/components/ui/button";

const MakeAdmin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);

  const debouncedSearch = useDebounce(searchTerm, 400);
  const { data, isLoading } = useGetAllAdminQuery({
    page: currentPage,
    limit,
    searchTerm: debouncedSearch,
  });

  const admins = data?.data?.result || [];
  const totalPages = data?.data?.meta?.totalPage || 1;

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
          <Title title="All Skills" />
          <div className="flex flex-col md:flex-row md:items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search admin..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button>
              <Plus />
              Make Admin
            </Button>
          </div>
        </div>

        {/* Table */}
        {
          isLoading ? (
            <TableSkeleton />
          ) : (
            <AdminTable admins={admins} />
          )
        }
      </PageLayout>
    </Suspense>
  );
};

export default MakeAdmin;