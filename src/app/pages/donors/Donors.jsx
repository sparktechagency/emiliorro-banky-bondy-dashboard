import { Suspense, useState, lazy } from "react";
import Title from "@/components/ui/Title";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import CustomPagination from "@/components/common/CustomPagination";
import PageLayout from "@/components/main-layout/PageLayout";
import { useGetAllDonorQuery } from "@/redux/feature/user/userApi";
import DonorsTable from "@/components/users/table/DonorsTable";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
const UserDetailsModal = lazy(() => import("@/components/users/modal/UserDetailsModal"));
import usePaginatedSearchQuery from "@/hooks/usePaginatedSearchQuery";

const Donors = () => {
    const {
        searchTerm,
        setSearchTerm,
        currentPage,
        setCurrentPage,
        items: donors,
        totalPages,
        page,
        isLoading,
    } = usePaginatedSearchQuery(useGetAllDonorQuery);

    const [selectedDonor, setSelectedDonor] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

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
                {isLoading ? (
                    <TableSkeleton />
                ) : (
                    <DonorsTable
                        donors={donors}
                        page={page}
                        limit={10}
                        onView={(donor) => {
                            setSelectedDonor(donor);
                            setIsDetailsOpen(true);
                        }}
                    />
                )}
            </PageLayout>

            {/* Donor Details Modal */}
            <UserDetailsModal
                isOpen={isDetailsOpen}
                onOpenChange={setIsDetailsOpen}
                user={selectedDonor?.user || selectedDonor}
                donors={donors}
            />

        </Suspense>
    );
};

export default Donors;
