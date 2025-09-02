import { Suspense } from "react";
import Title from "@/components/ui/Title";

const Payments = () => {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-64">Loading Payments...</div>}>
            <div>
                <Title title="Payments" />
                this is Payments page
            </div>
        </Suspense>
    );
};

export default Payments;