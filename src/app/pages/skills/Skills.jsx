import { Suspense } from "react";
import Title from "@/components/ui/Title";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import CustomPagination from "@/components/common/CustomPagination";
import { useState } from "react";
import PageLayout from "@/components/main-layout/PageLayout";
import { useGetAllSkillQuery } from "@/redux/feature/skill/skillApi";
import useDebounce from "@/hooks/usedebounce";
import SkillTable from "@/components/skill/table/SkillTable";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { Input } from "@/components/ui/input";

const Skills = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(10);

    const debouncedSearch = useDebounce(searchTerm, 400);
    const { data, isLoading } = useGetAllSkillQuery({
        page: currentPage,
        limit,
        searchTerm: debouncedSearch,
    });


    const skills = data?.data?.result || [];
    const totalPages = data?.data?.meta?.totalPage || 1;

    return (
        <Suspense
            fallback={
                <TableSkeleton columns={3} rows={10} />
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
                    <Title title="All Skills" />
                    <div className="flex flex-col md:flex-row md:items-center gap-3 w-full md:w-auto">
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search skills..."
                                className="pl-9"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button>
                            <Plus />
                            Add Skill
                        </Button>
                    </div>

                </div>
                {/* Table */}
                {
                    isLoading ? (
                        <TableSkeleton columns={3} rows={10} />
                    ) : (
                        <SkillTable skills={skills} />
                    )
                }
            </PageLayout>
        </Suspense>
    );
};

export default Skills;
