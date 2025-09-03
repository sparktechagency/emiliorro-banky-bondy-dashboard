'use client';
import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileSummary from "@/components/profile/ProfileSummary";
import EditProfileForm from "@/components/profile/EditProfileForm";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs";

const Profile = () => {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-64">Loading Profile...</div>}>
            <div className="space-y-4">
                {/* Page Header */}
                <ProfileHeader />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    {/* Left Column */}
                    <div className="lg:col-span-4 space-y-4">
                        <ProfileSummary />
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-8">
                        <Card>
                            <Tabs defaultValue="profile" className="w-full">
                                <div className="px-4 pt-4">
                                    <TabsList className="flex gap-2">
                                        <TabsTrigger value="profile">Edit Profile</TabsTrigger>
                                        <TabsTrigger value="password">Change Password</TabsTrigger>
                                    </TabsList>
                                </div>

                                <div className="p-4 sm:p-6">
                                    <TabsContent value="profile">
                                        <EditProfileForm />
                                    </TabsContent>
                                    <TabsContent value="password">
                                        <ChangePasswordForm />
                                    </TabsContent>
                                </div>
                            </Tabs>
                        </Card>
                    </div>
                </div>
            </div>
        </Suspense>
    );
};

export default Profile;