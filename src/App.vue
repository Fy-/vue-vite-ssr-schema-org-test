<script setup lang="ts">
import {
  useSchemaOrg,
  defineWebPage,
  defineWebSite,
  defineOrganization,
} from '@vueuse/schema-org/runtime';
useSchemaOrg([
  defineOrganization({
    name: 'test',
  }),
  defineWebSite({
    name: 'fyvue',
  }),
  defineWebPage({}),
]);
</script>
<template>
  <router-view />
</template>
