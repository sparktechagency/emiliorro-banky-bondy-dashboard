import { Suspense } from "react";
import Title from "@/components/ui/Title";

const AudioTopic = () => {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-64">Loading Audio Topic...</div>}>
            <div>
                <Title title=" Add Audio Topic" />
                this is AudioTopic page
            </div>
        </Suspense>
    );
};

export default AudioTopic;