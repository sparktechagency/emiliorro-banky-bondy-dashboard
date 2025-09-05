import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { SquarePen, Trash } from "lucide-react";

const TopicTable = ({ topics, onEdit, onDelete, currentPage, limit }) => {
    return (
        <ScrollArea className="w-[calc(100vw-32px)] overflow-hidden overflow-x-auto md:w-full rounded-lg whitespace-nowrap">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>S.No</TableHead>
                        <TableHead>Topic Name</TableHead>
                        <TableHead>Topic Image</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {topics.map((topic, index) => (
                        <TableRow key={topic._id}>
                            <TableCell>{(currentPage - 1) * limit + index + 1}</TableCell>
                            <TableCell>{topic.name}</TableCell>
                            <TableCell>
                                <img
                                    src={topic.topic_image}
                                    alt={topic.name}
                                    className="rounded-lg w-16 h-16"
                                />
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => onEdit && onEdit(topic)}
                                >
                                    <SquarePen className="h-5 w-5" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="text-red-500"
                                    onClick={() => onDelete && onDelete(topic)}
                                >
                                    <Trash className="h-5 w-5" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </ScrollArea>
    );
};

export default TopicTable;
