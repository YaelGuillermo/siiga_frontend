<template>
  <div>
    <UserList title="List of Administrators" role="A" />
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
