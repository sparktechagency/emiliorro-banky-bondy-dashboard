import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { SquarePen, Trash } from "lucide-react";

const TopicTable = ({ topics }) => {
    return (
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
                    {topics.map((topic, index) => (
                        <TableRow key={topic._id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{topic.name}</TableCell>
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
    );
};

export default TopicTable;
