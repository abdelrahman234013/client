import { apiSlice } from "../api/apiSlice";


export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        getAllUsers : builder.query({
            query: () => ({
             url: "/users/get-users",
             method: "GET",
             credentials: "include" as const,
            }),
        }),
        AddAdmin : builder.mutation({
            query: ({email}) => ({
             url: "/users/add-admin",
             method: "PUT",
             body: {email},
             credentials: "include" as const,
            }),
        }),
        removeAdmin : builder.mutation({
            query: ({email}) => ({
             url: "/users/remove-admin",
             method: "PUT",
             body: {email},
             credentials: "include" as const,
            }),
        }),
        deleteUser : builder.mutation({
            query: (id) => ({
             url: `/users/delete-user/${id}`,
             method: "DELETE",
             credentials: "include" as const,
            }),
        }),
    })
})


export const {
    useGetAllUsersQuery,
    useAddAdminMutation,
    useRemoveAdminMutation,
    useDeleteUserMutation,
} = userApi;