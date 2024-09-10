import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //   REGISTER
    register: builder.mutation({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              user: result.data.user,
            }),
          );
        } catch (error: any) {
          console.log(error.message);
        }
      },
    }),

    //   LOGIN
    login: builder.mutation({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              user: result.data.user,
            }),
          );
        } catch (error) {}
      },
    }),

    //   SOCIAL AUTH - GOOGLE
    socialAuth: builder.mutation({
      query: ({ name, email }: any) => ({
        url: "/users/social-auth",
        method: "POST",
        body: { name, email },
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              user: result.data.user,
            }),
          );
        } catch (error) {}
      },
    }),

    //   LOGOUT
    logOut: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
        credentials: "include",
      }),
      async onQueryStarted(arg, { dispatch }) {
        try {
          dispatch(userLoggedOut());
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogOutMutation,
  useSocialAuthMutation,
} = authApi;
