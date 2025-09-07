"use client";

import { Suspense, useState } from "react";
import Title from "@/components/ui/Title";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import CustomPagination from "@/components/common/CustomPagination";
import PageLayout from "@/components/main-layout/PageLayout";
import {
  useGetAllSkillQuery,
  useAddSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} from "@/redux/feature/skill/skillApi";
import SkillTable from "@/components/skill/table/SkillTable";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { Input } from "@/components/ui/input";
import AddSkillModal from "@/components/skill/modal/AddSkillModal";
import EditSkillModal from "@/components/skill/modal/EditSkillModal";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import usePaginatedSearchQuery from "@/hooks/usePaginatedSearchQuery";

const Skills = () => {
  const {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    items: skills,
    totalPages,
    page,
    isLoading,
  } = usePaginatedSearchQuery(useGetAllSkillQuery);

  // Modal & Mutation state
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const [addSkillMutation, { isLoading: addLoading }] = useAddSkillMutation();
  const [updateSkillMutation, { isLoading: updateLoading }] = useUpdateSkillMutation();
  const [deleteSkillMutation, { isLoading: deleteLoading }] = useDeleteSkillMutation();

  // Handlers
  const handleAddSkill = async (values) => {
    try {
      await addSkillMutation(values).unwrap();
      setAddOpen(false);
      SuccessToast("Skill added successfully");
    } catch (err) {
      ErrorToast(err?.data?.message);
    }
  };

  const handleEditSkill = async (values) => {
    if (!selectedSkill?._id) return;
    try {
      await updateSkillMutation({
        id: selectedSkill._id,
        data: values,
      }).unwrap();
      setEditOpen(false);
      setSelectedSkill(null);
      SuccessToast("Skill updated successfully");
    } catch (err) {
      ErrorToast(err?.data?.message);
    }
  };

  const handleDeleteSkill = async () => {
    if (!selectedSkill?._id) return;
    try {
      await deleteSkillMutation(selectedSkill._id).unwrap();
      setConfirmOpen(false);
      setSelectedSkill(null);
      SuccessToast("Skill deleted successfully");
    } catch (err) {
      ErrorToast(err?.data?.message);
    }
  };

  return (
    <Suspense fallback={<TableSkeleton columns={3} rows={10} />}>
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
          <Title title="All Skills" />
          <div className="flex flex-col md:flex-row md:items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search skills..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={() => setAddOpen(true)}>
              <Plus />
              Add Skill
            </Button>
          </div>
        </div>

        {/* Table */}
        {isLoading ? (
          <TableSkeleton columns={3} rows={10} />
        ) : (
          <SkillTable
            skills={skills}
            page={page}
            limit={10}
            onEdit={(skill) => {
              setSelectedSkill(skill);
              setEditOpen(true);
            }}
            onDelete={(skill) => {
              setSelectedSkill(skill);
              setConfirmOpen(true);
            }}
            updateLoading={updateLoading}
            deleteLoading={deleteLoading}
          />
        )}
      </PageLayout>

      {/* Add Skill Modal */}
      <AddSkillModal
        isOpen={addOpen}
        onOpenChange={setAddOpen}
        loading={addLoading}
        onSubmit={handleAddSkill}
      />

      {/* Edit Skill Modal */}
      <EditSkillModal
        isOpen={editOpen}
        onOpenChange={setEditOpen}
        skill={selectedSkill}
        loading={updateLoading}
        onSubmit={handleEditSkill}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmOpen}
        onOpenChange={setConfirmOpen}
        title={"Confirm Delete Skill"}
        description={"Are you sure you want to delete this skill?"}
        confirmText={"Delete"}
        loading={deleteLoading}
        onConfirm={handleDeleteSkill}
      />
    </Suspense>
  );
};

export default Skills;
