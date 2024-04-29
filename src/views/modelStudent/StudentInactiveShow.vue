<template>
  <div>
    <StudentList title="Student Requests" :status=status />
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
    status: 'Under review'
    };
  }
};
</script>