import { toast } from "sonner";
import { setAccessToken } from "../auth/authSlice";
import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET ADMIN PROFILE
        getAdminProfile: builder.query({
            query: () => ({
                url: "/user/get-my-profile",
                method: "GET",
            }),
            providesTags: ["PROFILE"],
        }),

        // UPDATE ADMIN PROFILE
        updateAdminProfile: builder.mutation({
            query: (data) => ({
                url: "/normal-user/update-profile",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["PROFILE"],
        }),

        // Login Endpoint (Mutation) 
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const accessToken = data?.data?.accessToken;
                    if (accessToken) {
                        dispatch(setAccessToken(accessToken));
                    }
                    toast.success("Login successful!");
                } catch (error) {
                    toast.error(error?.error?.data?.message || "Login failed.");
                }
            },
        }),

        // RESEND OTP
        resendOTP: builder.mutation({
            query: (email) => ({
                url: '/user/resend-verify-code',
                method: 'POST',
                body: { email }
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                    toast.success("New OTP sent to your email!");
                } catch (error) {
                    toast.error(error?.error?.data?.message || "Failed to send new OTP.");
                }
            },
        }),

        // FORGET PASSWORD
        forgetPassword: builder.mutation({
            query: (email) => {
                return {
                    url: '/auth/forget-password',
                    method: 'POST',
                    body: { email }
                }
            }
        }),

        // RESET PASSWORD
        resetPassword: builder.mutation({
            query: (data) => {
                return {
                    url: '/auth/reset-password',
                    method: 'POST',
                    body: data,
                }
            }
        }),

        // OTP VERIFY FOR RESET PASSWORD
        verifyOTPForResetPassword: builder.mutation({
            query: (data) => ({
                url: '/auth/verify-reset-otp',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                    toast.success("OTP verification successful!");
                } catch (error) {
                    toast.error(error?.error?.data?.message || "OTP verification failed.");
                }
            },
        }),

        // RESEND RESET OTP
        resendResetOTP: builder.mutation({
            query: (email) => ({
                url: '/auth/resend-reset-code',
                method: 'POST',
                body: { email }
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                    toast.success("New OTP sent to your email!");
                } catch (error) {
                    toast.error(error?.error?.data?.message || "Failed to send new OTP.");
                }
            },
        }),

        // CHANGE PASSWORD
        changePassword: builder.mutation({
            query: (data) => {
                return {
                    url: "/auth/change-password",
                    method: 'POST',
                    body: data
                }
            }
        }),


    })
})

export const { useLoginMutation, useResendOTPMutation, useResendResetOTPMutation, useGetAdminProfileQuery, useUpdateAdminProfileMutation, useChangePasswordMutation, useForgetPasswordMutation, useResetPasswordMutation } = authApi;