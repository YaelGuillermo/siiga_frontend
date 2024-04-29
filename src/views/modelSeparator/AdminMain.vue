<script>
import BarForAdmin from '@/components/BarForAdmin.vue';

export default {
  components: {
    BarForAdmin
  }
};
</script>

<template>
  <BarForAdmin>
    <router-view/>
  </BarForAdmin>
</template>