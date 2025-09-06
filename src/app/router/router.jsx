import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/app/layout/MainLayout";
import AuthLayout from "@/app/layout/AuthLayout";
import Dashboard from "@/app/pages/dasboard/Dashboard.jsx";
import Users from "@/app/pages/users/Users";
import Donors from "@/app/pages/donors/Donors";
import About from "@/app/pages/settings/about-us/About";
import Terms from "@/app/pages/settings/terms/Terms";
import Privacy from "@/app/pages/settings/privacy/Privacy";
import Skills from "@/app/pages/skills/Skills";
import AudioTopic from "@/app/pages/audio-topic/AudioTopic";
import Notification from "@/app/pages/notifications/Notification";
import Profile from "@/app/pages/settings/profile/Profile";
import Login from "@/app/pages/auth/login/Login.jsx";
import ForgetPassword from "@/app/pages/auth/forget-password/ForgetPassword";
import ResetPassword from "@/app/pages/auth/reset-password/ResetPassword";
import VerifyOtp from "@/app/pages/auth/verify-otp/VerifyOtp";
import MakeAdmin from "@/app/pages/make-admin/MakeAdmin";
import Contact from "@/app/pages/settings/contact/Contact";
import Report from "@/app/pages/report/Report";

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
            {
                path: "settings/contact-us",
                element: <Contact />
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