import { baseApi } from "../baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET MY PROFILE
        getAllUser: builder.query({
            query: () => ({
                url: "/user/get-all-user",
                method: "GET",
            }),
            providesTags: ["USER"],
        }),
    })
})

export const { useGetAllUserQuery } = userApi