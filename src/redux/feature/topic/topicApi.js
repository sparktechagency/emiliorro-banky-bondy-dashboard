import { baseApi } from "../baseApi"

const topicApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET ALL TOPIC
        getAllTopic: builder.query({
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
                    url: "/topic/all-topics",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["TOPIC"],
        }),

        // ADD TOPIC
        addTopic: builder.mutation({
            query: (data) => ({
                url: "/topic/add-topic",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["TOPIC"],
        }),

        // UPDATE TOPIC
        updateTopic: builder.mutation({
            query: (data) => ({
                url: "/topic/update-topic",
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["TOPIC"],
        }),

        // DELETE TOPIC
        deleteTopic: builder.mutation({
            query: (id) => ({
                url: `/topic/delete-topic/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["TOPIC"],
        }),

    })
})

export const { useGetAllTopicQuery, useAddTopicMutation, useUpdateTopicMutation, useDeleteTopicMutation } = topicApi