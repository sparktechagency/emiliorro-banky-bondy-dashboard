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
import { Ban, Eye } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils';

const DonorsTable = ({ donors }) => {
    return (
        <ScrollArea className="w-[calc(100vw-32px)] md:w-full rounded-lg overflow-hidden whitespace-nowrap">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>S.No</TableHead>
                        <TableHead>Name</TableHead>
                        {/* <TableHead>Email</TableHead> */}
                        {/* <TableHead>Phone Number</TableHead> */}
                        {/* <TableHead>Address</TableHead> */}
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {donors.map((user, index) => (
                        <TableRow key={user?._id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="border">
                                        <AvatarImage src={user?.user?.profile_image} alt={user?.user?.name} />
                                        <AvatarFallback>{getInitials(user?.user?.name)}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium">{user?.user?.name}</span>
                                </div>
                            </TableCell>
                            {/* <TableCell>{user.user.email}</TableCell> */}
                            {/* <TableCell>{user.phone}</TableCell> */}
                            {/* <TableCell>{user.address}</TableCell> */}
                            <TableCell className="text-right space-x-2">
                                <Button variant="outline" size="icon">
                                    <Eye className="h-5 w-5" />
                                </Button>
                                <Button variant="outline" size="icon" className="text-red-500">
                                    <Ban className="h-5 w-5" />
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