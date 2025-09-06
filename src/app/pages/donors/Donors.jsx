import { Suspense, useState } from "react";
import Title from "@/components/ui/Title";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import CustomPagination from "@/components/common/CustomPagination";
import PageLayout from "@/components/main-layout/PageLayout";
import { useGetAllDonorQuery } from "@/redux/feature/user/userApi";
import useDebounce from "@/hooks/usedebounce";
import DonorsTable from "@/components/users/table/DonorsTable";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import UserDetailsModal from "@/components/users/modal/UserDetailsModal";

const Donors = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(10);
    const [selectedDonor, setSelectedDonor] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const debouncedSearch = useDebounce(searchTerm, 400, setCurrentPage);
    const { data, isLoading, isFetching } = useGetAllDonorQuery({
        page: currentPage,
        limit,
        searchTerm: debouncedSearch,
    });

    const donors = data?.data?.result || [];
    const totalPages = data?.data?.meta?.totalPage || 1;

    const handleViewDetails = (donor) => {
        setSelectedDonor(donor);
        setIsDetailsOpen(true);
    };

    return (
        <Suspense
            fallback={
                <TableSkeleton />
            }
        >
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
                {/* Title and Search */}
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                    <Title title="Donors" />
                    <div className="relative w-full md:w-auto">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search donors..."
                            className="pl-10 w-full md:w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                {/* Table */}
                {
                    isLoading || isFetching ? (
                        <TableSkeleton />
                    ) : (
                        <DonorsTable 
                            donors={donors} 
                            currentPage={currentPage} 
                            limit={limit}
                            onViewDetails={handleViewDetails}
                        />
                    )
                }
            </PageLayout>

            {/* Donor Details Modal */}
            <UserDetailsModal
                user={selectedDonor}
                isOpen={isDetailsOpen}
                onOpenChange={setIsDetailsOpen}
            />
        </Suspense>
    );
};

export default Donors;
