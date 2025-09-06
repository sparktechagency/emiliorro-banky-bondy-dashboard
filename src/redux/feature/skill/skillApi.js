import { baseApi } from "../baseApi"

const skillApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET ALL SKILL
        getAllSkill: builder.query({
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
                    url: "/skill/all-skills",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["SKILL"],
        }),

        // ADD SKILL
        addSkill: builder.mutation({
            query: (data) => ({
                url: "/skill/create-skill",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["SKILL"],
        }),

        // UPDATE SKILL
        updateSkill: builder.mutation({
            query: ({id, data}) => ({
                url: `/skill/update-skill/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["SKILL"],
        }),

        // DELETE SKILL
        deleteSkill: builder.mutation({
            query: (id) => ({
                url: `/skill/delete-skill/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["SKILL"],
        }),

    })
})

export const { useGetAllSkillQuery, useAddSkillMutation, useUpdateSkillMutation, useDeleteSkillMutation } = skillApi