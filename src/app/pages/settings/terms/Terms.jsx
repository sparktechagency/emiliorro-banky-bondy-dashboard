import { Suspense } from "react";
import Title from "@/components/ui/Title";

const Terms = () => {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-64">Loading Terms...</div>}>
            <div>
                <Title title="Terms" />
                this is Terms page
            </div>
        </Suspense>
    );
};

export default Terms;