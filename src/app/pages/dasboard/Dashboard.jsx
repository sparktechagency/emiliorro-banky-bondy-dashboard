
import AudioDistributionChart from "@/components/dashboard/AudioDistributionChart";
import BondOverview from "@/components/dashboard/BondOverview";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DonorGrowthChart from "@/components/dashboard/DonorGrowthChart";
import EarningGrowthChart from "@/components/dashboard/EarningGrowthChart";
import InstitutionOverview from "@/components/dashboard/InstitutionOverview";
import UserGrowthChart from "@/components/dashboard/UserGrowthChart";
import PageLayout from "@/components/main-layout/PageLayout";

const Dashboard = () => {
    return (
        <PageLayout>
            {/* Stats */}
            <DashboardStats />
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                <UserGrowthChart />
                <DonorGrowthChart />
                <EarningGrowthChart />
                <AudioDistributionChart />
                <BondOverview />
                <InstitutionOverview />
            </div>
        </PageLayout>
    );
};

export default Dashboard;
