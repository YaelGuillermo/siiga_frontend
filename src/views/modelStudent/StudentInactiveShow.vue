<template>
  <div>
    <StudentList title="Student requests" :status="0" />
  </div>
</template>

<script>
import StudentList from '../../components/StudentList.vue';

export default {
  components: {
    StudentList
  }
};
</script>
