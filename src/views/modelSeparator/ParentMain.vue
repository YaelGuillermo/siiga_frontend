<template>
    <div>
      <BarForParent>
      <router-view />
      </BarForParent>
    </div>
  </template>
  
  <script>
  import BarForParent from '@/components/BarForParent.vue';
  
  export default {
    components: {
      BarForParent
    }
  };
  </script>
  