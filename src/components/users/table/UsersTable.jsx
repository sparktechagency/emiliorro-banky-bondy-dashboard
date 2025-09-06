import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import UserDetailsModal from '../modal/UserDetailsModal';
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from '@/lib/utils';
import { useGetAllSkillQuery } from '@/redux/feature/skill/skillApi';
import { Badge } from '@/components/ui/badge';
import UsersTableButton from '../button/UsersTableButton';

const UsersTable = ({ users, currentPage, limit }) => {
    useGetAllSkillQuery();
    const { skills } = useSelector((state) => state.skill);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleViewUser = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
        setIsModalOpen(false);
    };

    return (
        <>
            <ScrollArea className="w-[calc(100vw-32px)] overflow-hidden overflow-x-auto md:w-full rounded-lg whitespace-nowrap">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>S.N</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone Number</TableHead>
                            <TableHead>Address</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users?.map((user, index) => (
                            <TableRow key={user.email}>
                                <TableCell>{(currentPage - 1) * limit + index + 1}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="border">
                                            <AvatarImage src={user.profile_image} alt={user.name} />
                                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium">{user.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{user.address}</TableCell>
                                <TableCell>
                                    <Badge variant={user.user.isBlocked ? "destructive" : "default"}>
                                        {user.user.isBlocked ? "Blocked" : "Active"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    <UsersTableButton
                                        handleViewUser={handleViewUser}
                                        user={user}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollArea>
            {selectedUser && (
                <UserDetailsModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    user={selectedUser}
                    skills={skills}
                />
            )}
        </>
    );
};

export default UsersTable;