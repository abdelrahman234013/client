import { apiSlice } from "../api/apiSlice";

export const eventApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    //   CREATE EVENT
    createEvent: builder.mutation({
      query: (data: any) => ({
        url: "/events/create-event",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    //   EDIT EVENT
    editEvent: builder.mutation({
      query: ({ data, id }: any) => ({
        url: `/events/update-event/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    //   GET EVENT
    getEvent: builder.query({
      query: () => ({
        url: "/events/get-user-event",
        method: "GET",
        credentials: "include",
      }),
    }),

    //   STOP EVENT
    stopEvent: builder.mutation({
      query: (id: any) => ({
        url: `/events/stop-event/${id}`,
        method: "PUT",
        credentials: "include",
      }),
    }),

    // GET ADMIN SINGLE EVENT
    getAdminEvent: builder.query({
      query: (id: any) => ({
        url: `/events/get-admin-event/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    // GET ADMIN EVENTS
    getAllAdminEvents: builder.query({
      query: () => ({
        url: `/events/get-admin-events`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    // DELETE EVENT
    deleteEvent: builder.mutation({
      query: (id: any) => ({
        url: `/events/delete-event/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetEventQuery,
  useStopEventMutation,
  useGetAllAdminEventsQuery,
  useDeleteEventMutation,
  useCreateEventMutation,
  useEditEventMutation,
  useGetAdminEventQuery,
} = eventApi;
