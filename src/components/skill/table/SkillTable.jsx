import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SquarePen, Trash } from "lucide-react";


const SkillTable = ({ skills, onEdit, onDelete, updateLoading, deleteLoading, currentPage, limit }) => {
    return (
        <ScrollArea className="w-[calc(100vw-32px)] overflow-hidden overflow-x-auto md:w-full rounded-lg whitespace-nowrap">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>S.No</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {skills.map((skill, index) => (
                        <TableRow key={skill._id}>
                            <TableCell>{(currentPage - 1) * limit + index + 1}</TableCell>
                            <TableCell><Badge variant="outline">{skill.name}</Badge></TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button onClick={() => onEdit?.(skill)} variant="outline" size="icon" disabled={updateLoading}>
                                    <SquarePen />
                                </Button>
                                <Button onClick={() => onDelete?.(skill)} variant="outline" size="icon" className="text-red-500" disabled={deleteLoading}>
                                    <Trash />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </ScrollArea>
    );
};

export default SkillTable;