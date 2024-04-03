<template>
  <div>
    <UserList title="List of Administrators" role="Administrator" />
  </div>
</template>

<script>
import UserList from '@/components/UserList.vue';

export default {
  components: {
    UserList
  }
};
</script>
