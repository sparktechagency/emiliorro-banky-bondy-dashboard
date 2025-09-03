import { Suspense } from "react";
import Title from "@/components/ui/Title";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, SquarePen, Trash } from "lucide-react";
import { audioTopic } from "@/data/data";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import CustomPagination from "@/components/common/CustomPagination";
import { useState } from "react";
import PageLayout from "@/components/main-layout/PageLayout";

const AudioTopic = () => {
    // const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    // const [pageSize] = useState(12);

    const totalPages = 2;

    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center h-64">
                    Loading Topic...
                </div>
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
                <ScrollArea className="w-[calc(100vw-32px)] md:w-full rounded-lg overflow-hidden whitespace-nowrap">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>S.No</TableHead>
                                <TableHead>Topic Name</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {audioTopic.map((topic, index) => (
                                <TableRow key={topic._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{topic.topic_name}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="outline" size="icon">
                                            <SquarePen className="h-5 w-5" />
                                        </Button>
                                        <Button variant="outline" size="icon" className="text-red-500">
                                            <Trash className="h-5 w-5" />
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

export default AudioTopic;
