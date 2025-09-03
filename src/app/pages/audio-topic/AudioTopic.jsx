import { Suspense } from "react";
import Title from "@/components/ui/Title";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";    
import CustomPagination from "@/components/common/CustomPagination";
import { useState } from "react";
import PageLayout from "@/components/main-layout/PageLayout";
import { useGetAllTopicQuery } from "@/redux/feature/topic/topicApi";
import TopicTable from "@/components/audio-topic/table/TopicTable";
import TableSkeleton from "@/components/skeleton/TableSkeleton";

const AudioTopic = () => {
        const [currentPage, setCurrentPage] = useState(1);
        const [limit] = useState(10);
    
        const { data, isLoading } = useGetAllTopicQuery({
            page: currentPage,
            limit,
        });
    
    
        const topics = data?.data?.result || [];
        const totalPages = data?.data?.meta?.totalPage || 1;

    return (
        <Suspense
            fallback={
                <TableSkeleton columns={6} rows={10} />
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
                    <Title title="All Topic" />
                    <div className="relative w-full md:w-auto">
                        <Button>
                            <Plus />
                            Add Topic
                        </Button>
                    </div>
                </div>
                {/* Table */}
                {
                    isLoading ? (
                        <TableSkeleton columns={6} rows={10} />
                    ) : (
                        <TopicTable topics={topics} />
                    )
                }
            </PageLayout>
        </Suspense>
    );
};

export default AudioTopic;
