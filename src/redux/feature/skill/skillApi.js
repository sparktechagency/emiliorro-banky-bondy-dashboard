import { baseApi } from "../baseApi"
import { setSkills } from "./skillSlice";

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

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;
                    const skills = data?.data?.result?.map(cv => ({
                        _id: cv._id,
                        name: cv.name,
                    })) || [];
                    dispatch(setSkills(skills));
                } catch (error) {
                    console.log(error);
                }
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