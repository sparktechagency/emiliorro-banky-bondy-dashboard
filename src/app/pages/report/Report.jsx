import Title from "@/components/ui/Title";
import { useState } from "react";
import PageLayout from "@/components/main-layout/PageLayout";
import CustomPagination from "@/components/common/CustomPagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserReportTable from "@/components/report/user-report/UserReportTable";
import MediaReportTable from "@/components/report/media-report/MediaReportTable";
import AIReportTable from "@/components/report/ai-report/AIReportTable";
import { userReports, mediaReports, aiReports } from "@/data/data";

const Report = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;

  return (
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
      <Tabs defaultValue="user" className="w-full">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-2">
            <Title title="Report management" />
            <TabsList>
              <TabsTrigger value="user">User Reports</TabsTrigger>
              <TabsTrigger value="media">Media Reports</TabsTrigger>
              <TabsTrigger value="ai">AI Reports</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="user">
            <UserReportTable rows={userReports} />
          </TabsContent>
          <TabsContent value="media">
            <MediaReportTable rows={mediaReports} />
          </TabsContent>
          <TabsContent value="ai">
            <AIReportTable rows={aiReports} />
          </TabsContent>
        </div>
      </Tabs>
    </PageLayout>
  );
};

export default Report;