<template>
  <div>
    <StudentList title="List of Students" :status="1" />
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
