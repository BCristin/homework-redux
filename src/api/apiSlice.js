import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: "api", // vine default daca nu se scrie
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }), //* obligatoriu , in loc fetch, fiindca are setarii gata facute...
	tagTypes: ["Heroes"], //lista de taguri din apiSlice
	endpoints: (builder) => ({
		getHeroes: builder.query({
			query: () => "/heroes",
			providesTags: ["Heroes"], //  cand invalidatesTags se apeleaza providesTags se actualizeaza
		}),
		createHero: builder.mutation({
			query: (hero) => ({
				url: "/heroes",
				method: "POST",
				body: hero,
			}),
			invalidatesTags: ["Heroes"], // datele vechi devin invalide, respectiv se reactualizeaza
		}),
		deleteHero: builder.mutation({
			query: (id) => ({
				url: `/heroes/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Heroes"],
		}),
		getFilters: builder.query({
			query: () => "/filters",
		}),
	}), // preia informatiile din api
});

// createApi face hookuri si reducer automat pt fiecare din endpoints
export const {
	useGetHeroesQuery,
	useCreateHeroMutation,
	useDeleteHeroMutation,
	useGetFiltersQuery,
} = apiSlice;
