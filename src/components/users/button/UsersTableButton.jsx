import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useBlockUserMutation } from '@/redux/feature/user/userApi';
import { Eye, Ban } from 'lucide-react';
import ConfirmationModal from '@/components/common/ConfirmationModal';

const UsersTableButton = ({ handleViewUser, user }) => {
    const [toggleBanUserMutation, { isLoading }] = useBlockUserMutation();
    const [confirmOpen, setConfirmOpen] = useState(false);

    const toggleBanUser = async (userId) => {
        try {
            await toggleBanUserMutation(userId);
        } finally {
            setConfirmOpen(false);
        }
    };
    return (
        <>
            <Button variant="outline" size="icon" onClick={() => handleViewUser(user)}>
                <Eye className="h-5 w-5" />
            </Button>
            <Button disabled={isLoading} onClick={() => setConfirmOpen(true)} variant="outline" size="icon" className="text-red-500">
                <Ban className="h-5 w-5" />
            </Button>

            <ConfirmationModal
                isOpen={confirmOpen}
                onOpenChange={setConfirmOpen}
                title={`Confirm ${user?.user?.isBlocked ? 'Unblock' : 'Block'} User`}
                description={user?.name ? `Are you sure you want to ${user?.user?.isBlocked ? 'unblock' : 'block'} (${user.name})?` : `Are you sure you want to ${user?.user?.isBlocked ? 'unblock' : 'block'} this user?`}
                confirmText={user?.user?.isBlocked ? 'Unblock' : 'Block'}
                loading={isLoading}
                onConfirm={() => toggleBanUser(user.user._id)}
            />
        </>
    );
};

export default UsersTableButton;