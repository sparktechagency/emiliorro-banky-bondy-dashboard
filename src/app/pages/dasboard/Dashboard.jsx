
import AudioDistributionChart from "@/components/dashboard/AudioDistributionChart";
import BondOverview from "@/components/dashboard/BondOverview";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DonorGrowthChart from "@/components/dashboard/DonorGrowthChart";
import InstitutionOverview from "@/components/dashboard/InstitutionOverview";
import UserGrowthChart from "@/components/dashboard/UserGrowthChart";
import AudioDistributionChartSkeleton from "@/components/dashboard/skeleton/AudioDistributionChartSkeleton";
import ChartSkeleton from "@/components/dashboard/skeleton/ChartSkeleton";
import DashboardStatsSkeleton from "@/components/dashboard/skeleton/DashboardStatsSkeleton";
import PageLayout from "@/components/main-layout/PageLayout";
import {
    useGetDashboardAudioChartQuery,
    useGetDashboardBondChartQuery,
    useGetDashboardDonorChartQuery,
    useGetDashboardInstitutionChartQuery,
    useGetDashboardStatsQuery,
    useGetDashboardUserChartQuery
} from "@/redux/feature/dashboard/dashboardApi";
import { Suspense, useState } from "react";

const Dashboard = () => {
    // Year State
    const [userYear, setUserYear] = useState(new Date().getFullYear());
    const [donorYear, setDonorYear] = useState(new Date().getFullYear());
    const [bondYear, setBondYear] = useState(new Date().getFullYear());
    const [institutionYear, setInstitutionYear] = useState(new Date().getFullYear());

    // API Queries
    const { data: dashboardStatsData, isLoading: isStatsLoading } = useGetDashboardStatsQuery();
    const { data: userGrowthData, isLoading: isUserGrowthLoading } = useGetDashboardUserChartQuery({ year: userYear });
    const { data: donorGrowthData, isLoading: isDonorGrowthLoading } = useGetDashboardDonorChartQuery({ year: donorYear });
    const { data: audioDistributionData, isLoading: isAudioDistributionLoading } = useGetDashboardAudioChartQuery();
    const { data: bondOverviewData, isLoading: isBondOverviewLoading } = useGetDashboardBondChartQuery({ year: bondYear });
    const { data: institutionOverviewData, isLoading: isInstitutionOverviewLoading } = useGetDashboardInstitutionChartQuery({ year: institutionYear });

    // Year Change Handlers
    const handleUserYearChange = (year) => setUserYear(parseInt(year));
    const handleDonorYearChange = (year) => setDonorYear(parseInt(year));
    const handleBondYearChange = (year) => setBondYear(parseInt(year));
    const handleInstitutionYearChange = (year) => setInstitutionYear(parseInt(year));

    return (
        <Suspense fallback={
            <>
                <DashboardStatsSkeleton />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                    <ChartSkeleton />
                    <ChartSkeleton />
                    <AudioDistributionChartSkeleton />
                    <ChartSkeleton />
                    <ChartSkeleton />
                </div>
            </>
        }>
            <PageLayout>
                {/* Stats */}
                {isStatsLoading ? <DashboardStatsSkeleton /> : <DashboardStats data={dashboardStatsData?.data} />}

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                    {isUserGrowthLoading ? 
                        <ChartSkeleton /> : 
                        <UserGrowthChart 
                        userGrowthChartData={userGrowthData?.data} 
                        onYearChange={handleUserYearChange} 
                        selectedYear={userYear} 
                        />}
                    {isDonorGrowthLoading ? 
                        <ChartSkeleton /> : 
                        <DonorGrowthChart 
                        donorGrowthChartData={donorGrowthData?.data} 
                        onYearChange={handleDonorYearChange} 
                        selectedYear={donorYear} 
                        />}
                    {isAudioDistributionLoading ? 
                        <AudioDistributionChartSkeleton /> : 
                        <AudioDistributionChart 
                        audioDistributionChartData={audioDistributionData?.data} 
                        />}
                    {isBondOverviewLoading ? 
                        <ChartSkeleton /> : 
                        <BondOverview 
                        bondOverviewData={bondOverviewData?.data} 
                        onYearChange={handleBondYearChange} 
                        selectedYear={bondYear} 
                        />}
                    {isInstitutionOverviewLoading ? 
                        <ChartSkeleton /> : 
                        <InstitutionOverview 
                        institutionOverviewData={institutionOverviewData?.data} 
                        onYearChange={handleInstitutionYearChange} 
                        selectedYear={institutionYear} 
                        />}
                </div>
            </PageLayout>
        </Suspense>
    );
};

export default Dashboard;
