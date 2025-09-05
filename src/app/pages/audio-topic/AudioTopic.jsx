'use client';
import React, { useState, Suspense } from 'react';
import { Plus, Search } from 'lucide-react';

import Title from '@/components/ui/Title';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PageLayout from '@/components/main-layout/PageLayout';
import CustomPagination from '@/components/common/CustomPagination';
import TableSkeleton from '@/components/skeleton/TableSkeleton';
import TopicTable from '@/components/audio-topic/table/TopicTable';
import AddTopicModal from '@/components/audio-topic/modal/AddTopicModal';
import EditTopicModal from '@/components/audio-topic/modal/EditTopicModal';
import ConfirmationModal from '@/components/common/ConfirmationModal';

import {
    useAddTopicMutation,
    useDeleteTopicMutation,
    useGetAllTopicQuery,
    useUpdateTopicMutation,
} from '@/redux/feature/topic/topicApi';

const AudioTopic = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(10);

    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState(null);

    const [addTopicMutation, { isLoading: addLoading }] = useAddTopicMutation();
    const [updateTopicMutation, { isLoading: updateLoading }] = useUpdateTopicMutation();
    const [deleteTopicMutation, { isLoading: deleteLoading }] = useDeleteTopicMutation();

    const { data, isLoading, isFetching } = useGetAllTopicQuery({
        page: currentPage,
        limit,
        searchTerm,
    });

    const topics = data?.data?.result || [];
    const totalPages = data?.data?.meta?.totalPage || 1;

    // Modal Handlers
    const handleAddTopic = async (data) => {
        const formData = new FormData();
        if (data?.topic_image) {
            formData.append('topic_image', data.topic_image);
        }
        formData.append('data', JSON.stringify({ name: data?.name }));
        try {
            await addTopicMutation(formData).unwrap();
            setAddOpen(false);
        } catch (err) {
            console.error('Add topic failed:', err);
        }
    };

    const handleEditTopic = async (data) => {
        if (!selectedTopic?._id) return;
        const formData = new FormData();
        if (data?.topic_image) {
            formData.append('topic_image', data.topic_image);
        }
        formData.append(
            'data',
            JSON.stringify({ id: selectedTopic._id, name: data?.name })
        );
        try {
            await updateTopicMutation({ id: selectedTopic._id, data: formData }).unwrap();
            setEditOpen(false);
            setSelectedTopic(null);
        } catch (err) {
            console.error('Update topic failed:', err);
        }
    };

    const handleDeleteTopic = async () => {
        if (!selectedTopic?._id) return;
        try {
            await deleteTopicMutation(selectedTopic._id).unwrap();
            setConfirmOpen(false);
            setSelectedTopic(null);
        } catch (err) {
            console.error('Delete topic failed:', err);
        }
    };

    return (
        <>
            <Suspense fallback={<TableSkeleton columns={4} rows={10} />}>
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
                        <div className="flex flex-col md:flex-row md:items-center gap-3 w-full md:w-auto">
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search topics..."
                                    className="pl-9"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Button onClick={() => setAddOpen(true)}>
                                <Plus />
                                Add Topic
                            </Button>
                        </div>
                    </div>

                    {/* Table */}
                    {isLoading || isFetching ? (
                        <TableSkeleton columns={4} rows={10} />
                    ) : (
                        <TopicTable
                            currentPage={currentPage}
                            limit={limit}
                            topics={topics}
                            onEdit={(topic) => {
                                setSelectedTopic(topic);
                                setEditOpen(true);
                            }}
                            onDelete={(topic) => {
                                setSelectedTopic(topic);
                                setConfirmOpen(true);
                            }}
                        />
                    )}
                </PageLayout>
            </Suspense>

            {/* Add Topic Modal */}
            <AddTopicModal
                isOpen={addOpen}
                onOpenChange={setAddOpen}
                onSubmit={handleAddTopic}
                loading={addLoading}
            />

            {/* Edit Topic Modal */}
            <EditTopicModal
                isOpen={editOpen}
                onOpenChange={setEditOpen}
                topic={selectedTopic}
                onSubmit={handleEditTopic}
                loading={updateLoading}
            />

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={confirmOpen}
                onOpenChange={setConfirmOpen}
                title="Confirm Delete Topic"
                description="Are you sure you want to delete this topic?"
                confirmText="Delete"
                loading={deleteLoading}
                onConfirm={handleDeleteTopic}
            />
        </>
    );
};

export default AudioTopic;