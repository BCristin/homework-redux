import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: "api", // vine default daca nu se scrie
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }), //* obligatoriu , in loc fetch, fiindca are setarii ...
	tagTypes: ["Heroes"],
	endpoints: (builder) => ({
		getHeroes: builder.query({
			query: () => "/heroes",
			providesTags: ["Heroes"],
		}),
		createHero: builder.mutation({
			query: (hero) => ({
				url: "/heroes",
				method: "POST",
				body: hero,
			}),
			invalidatesTags: ["Heroes"],
		}),
		deleteHero: builder.mutation({
			query: (id) => ({
				url: `/heroes/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Heroes"],
		}),
	}), // preia informatiile din api
});

// createApi face hookuri automat pt fiecare din endpoints si reducer

export const { useGetHeroesQuery, useCreateHeroMutation, useDeleteHeroMutation } =
	apiSlice;
