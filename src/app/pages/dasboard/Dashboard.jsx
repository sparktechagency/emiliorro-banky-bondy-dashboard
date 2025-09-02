import { Suspense } from "react";

const Dashboard = () => {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-64">Loading Dashboard...</div>}>
            <div>
                this is Dashboard
            </div>
        </Suspense>
    );
};

export default Dashboard;