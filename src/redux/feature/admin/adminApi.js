
import { baseApi } from "../baseApi";

const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET ALL ADMIN 
        getAllAdmin: builder.query({
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
                    url: "/admin/all-admins",
                    method: "GET",
                    params,
                }
            },
            providesTags: ["ADMIN"],
        }),

    })
})

export const { useGetAllAdminQuery } = adminApi