import { Suspense } from "react";
import Title from "@/components/ui/Title";

const Profile = () => {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-64">Loading Profile...</div>}>
            <div>
                <Title title="Profile" />
                this is profile
            </div>
        </Suspense>
    );
};

export default Profile;