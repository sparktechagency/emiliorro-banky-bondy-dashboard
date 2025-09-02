import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://10.10.20.9:4000',
    prepareHeaders: (headers, { getState }) => {
        const token = getState()?.auth.accessToken;

        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }

        return headers
    }
})

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery,

    tagTypes: ['USER', "PROFILE"],
    endpoints: () => ({})
})