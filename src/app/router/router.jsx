import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/app/layout/MainLayout";
import AuthLayout from "@/app/layout/AuthLayout";
import { lazy } from "react";

const Dashboard = lazy(() => import("@/app/pages/dasboard/Dashboard.jsx"));
const Users = lazy(() => import("@/app/pages/users/Users"));
const About = lazy(() => import("@/app/pages/settings/about-us/About"));
const Terms = lazy(() => import("@/app/pages/settings/terms/Terms"));
const Privacy = lazy(() => import("@/app/pages/settings/privacy/Privacy"));
const Orders = lazy(() => import("@/app/pages/orders/Orders"));
const Payments = lazy(() => import("@/app/pages/payments/Payments"));
const Notification = lazy(() => import("@/app/pages/notifications/Notification"));
const Profile = lazy(() => import("@/app/pages/settings/profile/Profile"));
const Login = lazy(() => import("@/app/pages/auth/login/Login.jsx"));
const ForgetPassword = lazy(() => import("@/app/pages/auth/forget-password/ForgetPassword"));
const ResetPassword = lazy(() => import("@/app/pages/auth/reset-password/ResetPassword"));
const VerifyOtp = lazy(() => import("@/app/pages/auth/verify-otp/VerifyOtp"));


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
                path: "orders",
                element: <Orders />
            },
            {
                path: "payments",
                element: <Payments />
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
