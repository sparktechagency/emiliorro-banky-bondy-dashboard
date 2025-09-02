import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/app/layout/MainLayout";
import AuthLayout from "@/app/layout/AuthLayout";
import { lazy } from "react";

const Dashboard = lazy(() => import("@/app/pages/dasboard/Dashboard.jsx"));
const Users = lazy(() => import("@/app/pages/users/Users"));
const Donors = lazy(() => import("@/app/pages/donors/Donors"));
const About = lazy(() => import("@/app/pages/settings/about-us/About"));
const Terms = lazy(() => import("@/app/pages/settings/terms/Terms"));
const Privacy = lazy(() => import("@/app/pages/settings/privacy/Privacy"));
const Skills = lazy(() => import("@/app/pages/skills/Skills"));
const AudioTopic = lazy(() => import("@/app/pages/audio-topic/AudioTopic"));
const Notification = lazy(() => import("@/app/pages/notifications/Notification"));
const Profile = lazy(() => import("@/app/pages/settings/profile/Profile"));
const Login = lazy(() => import("@/app/pages/auth/login/Login.jsx"));
const ForgetPassword = lazy(() => import("@/app/pages/auth/forget-password/ForgetPassword"));
const ResetPassword = lazy(() => import("@/app/pages/auth/reset-password/ResetPassword"));
const VerifyOtp = lazy(() => import("@/app/pages/auth/verify-otp/VerifyOtp"));
const MakeAdmin = lazy(() => import("@/app/pages/make-admin/MakeAdmin"));
const Contact = lazy(() => import("@/app/pages/contact/Contact"));
const Report = lazy(() => import("@/app/pages/report/Report"));

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: "users",
                element: <Users />
            },
            {
                path: "donors",
                element: <Donors />
            },
            {
                path: "skills",
                element: <Skills />
            },
            {
                path: "audio-topic",
                element: <AudioTopic />
            },
            {
                path: "report",
                element: <Report />
            },
            {
                path: "contact-us",
                element: <Contact />
            },
            {
                path: "make-admin",
                element: <MakeAdmin />
            },
            {
                path: "notifications",
                element: <Notification />
            },
            {
                path: "settings/profile",
                element: <Profile />
            },
            {
                path: "settings/about",
                element: <About />
            },
            {
                path: "settings/terms",
                element: <Terms />
            },
            {
                path: "settings/privacy",
                element: <Privacy />
            },
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <Login />
            },
            {
                path: "forgot-password",
                element: <ForgetPassword />
            },
            {
                path: "verify-otp",
                element: <VerifyOtp />
            },
            {
                path: "reset-password",
                element: <ResetPassword />
            },
        ]
    }
]);
