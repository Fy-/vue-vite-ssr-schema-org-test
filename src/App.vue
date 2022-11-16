<script setup lang="ts">
import {
  useSchemaOrg,
  defineWebPage,
  defineWebSite,
  defineOrganization,
} from '@vueuse/schema-org/runtime';
import { useHead } from '@vueuse/head';
useSchemaOrg([
  defineOrganization({
    name: 'test',
  }),
  defineWebSite({
    name: 'fyvue',
  }),
  defineWebPage({}),
]);
useHead({
  title: 'test 1',
  meta: [
    {
      name: 'og:title',
      content: 'test 2',
    },
  ],
});
</script>
<template>
  <router-view />
</template>
