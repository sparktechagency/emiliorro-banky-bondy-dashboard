
import AudioDistributionChart from "@/components/dashboard/AudioDistributionChart";
import BondOverview from "@/components/dashboard/BondOverview";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DonorGrowthChart from "@/components/dashboard/DonorGrowthChart";
import InstitutionOverview from "@/components/dashboard/InstitutionOverview";
import UserGrowthChart from "@/components/dashboard/UserGrowthChart";
import PageLayout from "@/components/main-layout/PageLayout";
import {
    useGetDashboardAudioChartQuery,
    useGetDashboardBondChartQuery,
    useGetDashboardDonorChartQuery,
    useGetDashboardInstitutionChartQuery,
    useGetDashboardUserChartQuery
} from "@/redux/feature/dashboard/dashboardApi";
import { Suspense, useState } from "react";

const Dashboard = () => {
    // User Growth Chart
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const { data: userGrowthData, refetch: refetchUserGrowth } = useGetDashboardUserChartQuery({
        year: selectedYear
    });
    const userGrowthChartData = userGrowthData?.data;
    const handleUserYearChange = (year) => {
        setSelectedYear(parseInt(year));
        refetchUserGrowth();
    };

    // Donor Growth Chart
    const [selectedDonorYear, setSelectedDonorYear] = useState(new Date().getFullYear());
    const { data: donorGrowthData, refetch: refetchDonorGrowth } = useGetDashboardDonorChartQuery({
        year: selectedDonorYear
    });
    const donorGrowthChartData = donorGrowthData?.data;
    const handleDonorYearChange = (year) => {
        setSelectedDonorYear(parseInt(year));
        refetchDonorGrowth();
    };

    // Earning Growth Chart
    // const { data: earningGrowthData } = useGetDashboardEarningChartQuery();
    // const earningGrowthChartData = earningGrowthData?.data?.chartData?.map((item) => ({
    //     month: item.month,
    //     totalEarning: item.totalEarning,
    // }));

    // Audio Distribution Chart
    const { data: audioDistributionData } = useGetDashboardAudioChartQuery();
    const audioDistributionChartData = audioDistributionData?.data;

    // Bond Overview Chart
    const [selectedBondYear, setSelectedBondYear] = useState(new Date().getFullYear());
    const { data: bondOverviewData, refetch: refetchBondData } = useGetDashboardBondChartQuery({
        year: selectedBondYear
    });
    const bondOverviewChartData = bondOverviewData?.data;
    const handleBondYearChange = (year) => {
        setSelectedBondYear(parseInt(year));
        refetchBondData();
    };

    // Institution Overview Chart
    const [selectedInstitutionYear, setSelectedInstitutionYear] = useState(new Date().getFullYear());
    const { data: institutionOverviewData, refetch: refetchInstitutionData } = useGetDashboardInstitutionChartQuery({
        year: selectedInstitutionYear
    });
    const institutionOverviewChartData = institutionOverviewData?.data;
    const handleInstitutionYearChange = (year) => {
        setSelectedInstitutionYear(parseInt(year));
        refetchInstitutionData();
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PageLayout>

                {/* Stats */}
                <DashboardStats />

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                    <UserGrowthChart
                        userGrowthChartData={userGrowthChartData}
                        onYearChange={handleUserYearChange}
                    />
                    <DonorGrowthChart
                        donorGrowthChartData={donorGrowthChartData}
                        onYearChange={handleDonorYearChange}
                    />
                    {/* <EarningGrowthChart earningGrowthChartData={earningGrowthChartData} /> */}
                    <AudioDistributionChart audioDistributionChartData={audioDistributionChartData} />
                    <BondOverview
                        bondOverviewData={bondOverviewChartData}
                        onYearChange={handleBondYearChange}
                    />
                    <InstitutionOverview
                        institutionOverviewData={institutionOverviewChartData}
                        onYearChange={handleInstitutionYearChange}
                    />
                </div>
                
            </PageLayout>
        </Suspense>
    );
};

export default Dashboard;
