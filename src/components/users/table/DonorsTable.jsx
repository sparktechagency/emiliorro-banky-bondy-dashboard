import React from 'react';
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils';
import { useGetAllSkillQuery } from '@/redux/feature/skill/skillApi';

const DonorsTable = ({ donors, currentPage, limit, onViewDetails }) => {
    useGetAllSkillQuery();
    return (
        <ScrollArea className="w-[calc(100vw-32px)] overflow-hidden overflow-x-auto md:w-full rounded-lg whitespace-nowrap">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>S.N</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {donors.map((user, index) => (
                        <TableRow key={user?._id}>
                            <TableCell>{(currentPage - 1) * limit + index + 1}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="border">
                                        <AvatarImage src={user?.user?.profile_image} alt={user?.user?.name} />
                                        <AvatarFallback>{getInitials(user?.user?.name)}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium">{user?.user?.name}</span>
                                </div>
                            </TableCell>
                            <TableCell>{user?.user?.email}</TableCell>
                            <TableCell>{user?.user?.phone}</TableCell>
                            <TableCell>{user?.user?.address}</TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 p-0"
                                    onClick={() => onViewDetails(user.user)}
                                >
                                    <Eye className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </ScrollArea>
    );
};

export default DonorsTable;