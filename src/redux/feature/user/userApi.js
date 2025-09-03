import { baseApi } from "../baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET ALL USER
        getAllUser: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    Object.entries(args).forEach(([key, value]) => {
                        if (value) {
                            params.append(key, value);
                        }
                    });
                }
                return {
                    url: "/normal-user/get-all-user",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["USER"],
        }),

        // GET ALL DONOR
        getAllDonor: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    Object.entries(args).forEach(([key, value]) => {
                        if (value) {
                            params.append(key, value);
                        }
                    });
                }
                return {
                    url: "/donate/get-all-donner",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["USER"],
        }),
        
    })
})

export const { useGetAllUserQuery, useGetAllDonorQuery } = userApi