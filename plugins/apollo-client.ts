import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { defineNuxtPlugin } from 'nuxt/app';
import type { NuxtApp } from 'nuxt/app';

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  const httpLink = createHttpLink({
    uri: 'http://localhost:3002/api/graphql',
    credentials: 'same-origin',
  });

  const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache({ addTypename: false }),
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
      },
      query: {
        errorPolicy: 'all',
      },
    },
    ssrMode: import.meta.server,
  });

  nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient);
});
