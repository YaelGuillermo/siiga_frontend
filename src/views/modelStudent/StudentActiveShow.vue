<template>
  <div>
    <StudentList title="Student List" :status=status />
  </div>
</template>

<script>
import StudentList from '../../components/StudentList.vue';

export default {
  components: {
    StudentList
  },
  data() {
    return {
      status: 'Active'
    };
  }
};
</script>
