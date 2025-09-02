import { Suspense } from "react";
import Title from "@/components/ui/Title";

const About = () => {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-64">Loading About...</div>}>
            <div>
                <Title title="About" />
                this is About page
            </div>
        </Suspense>
    );
};

export default About;