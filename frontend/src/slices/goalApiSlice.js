import { apiSlice } from "./apiSlice";

const GOAL_URL = "/api/goals";

export const goalApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addGoal: builder.mutation({
      query: (goal) => ({
        url: GOAL_URL,
        method: "POST",
        body: goal,
      }),
    }),
    getGoals: builder.query({
      query: () => ({
        url: GOAL_URL,
        method: "GET",
      }),
    }),
  }),
});

export const { useAddGoalMutation, useGetGoalsQuery } = goalApiSlice;
