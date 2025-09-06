
import { baseApi } from "../baseApi";

const legalApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET ABOUT
        getAbout: builder.query({
            query: () => ({
                url: "/legal/get-about",
                method: "GET",
            }),
            providesTags: ["LEGAL"],
        }),

        // GET TERMS
        getTerms: builder.query({
            query: () => ({
                url: "/legal/get-terms",
                method: "GET",
            }),
            providesTags: ["LEGAL"],
        }),

        // GET PRIVACY POLICY
        getPrivacyPolicy: builder.query({
            query: () => ({
                url: "/legal/get-privacy-policy",
                method: "GET",
            }),
            providesTags: ["LEGAL"],
        }),

        // GET CONTACT
        getContact: builder.query({
            query: () => ({
                url: "/legal/get-contact",
                method: "GET",
            }),
            providesTags: ["LEGAL"],
        }),

        // ADD ABOUT
        addAbout: builder.mutation({
            query: (data) => ({
                url: "/legal/add-about",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["LEGAL"],
        }),

        // ADD TERMS
        addTerms: builder.mutation({
            query: (data) => ({
                url: "/legal/add-terms",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["LEGAL"],
        }),

        // ADD PRIVACY POLICY
        addPrivacyPolicy: builder.mutation({
            query: (data) => ({
                url: "/legal/add-privacy-policy",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["LEGAL"],
        }),

        // ADD CONTACT
        addContact: builder.mutation({
            query: (data) => ({
                url: "/legal/add-contact",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["LEGAL"],
        }),
    })
})

export const { useGetTermsQuery, useGetPrivacyPolicyQuery, useAddTermsMutation, useAddPrivacyPolicyMutation, useAddAboutMutation, useGetAboutQuery, useGetContactQuery, useAddContactMutation } = legalApi