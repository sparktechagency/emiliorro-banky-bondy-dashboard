import { Suspense } from "react";
import Title from "@/components/ui/Title";

const Orders = () => {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-64">Loading Orders...</div>}>
            <div>
                <Title title="Orders" />
                this is orders page
            </div>
        </Suspense>
    );
};

export default Orders;