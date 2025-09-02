import { Suspense } from "react";
import Title from "@/components/ui/Title";

const Privacy = () => {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-64">Loading Privacy...</div>}>
            <div>
                <Title title="Privacy" />
                this is privacy page
            </div>
        </Suspense>
    );
};

export default Privacy;