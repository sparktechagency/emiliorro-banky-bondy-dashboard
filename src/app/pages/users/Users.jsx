import { Suspense } from "react";
import Title from "@/components/ui/Title";

const Users = () => {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-64">Loading Users...</div>}>
            <div>
                <Title title="Users" />
                this is users page
            </div>
        </Suspense>
    );
};

export default Users;