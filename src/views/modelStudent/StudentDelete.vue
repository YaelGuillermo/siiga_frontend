<template>
    <div v-if="student">
      <div class="row">
        <div class="col-md-6 border-right">
          <div class="d-flex flex-column align-items-center text-center p-3 py-5">
            <button type="button" class="btn btn-purple" @click="deleteStudentProfile">
              <i class="fas fa-trash"></i> Delete
            </button>
            <img class="rounded-circle mt-5" width="150px" v-if="student && student.photo" :src="student.photo" alt="Student Image">
            <img class="rounded-circle mt-5" width="150px" v-else :src="require('@/assets/no-profile.png')" alt="No Profile Image">
            <span class="font-weight-bold">{{ getFullName(student) }}</span>
            <div class="col-md-12"></div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="p-3 py-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="text-right">Parent detail</h4>
            <div>
                <router-link :to="{ name: 'userView', params: { id: student.user_id } }" class="btn btn-purple btn-sm" role="button">
                    <i class="fas fa-eye"></i> View
                </router-link>
            </div>
          </div>
          <div v-if="student.user">
                <hr class="my-3"> 
              <div class="info">
                <label class="labels font-weight-bold">Name</label>
                <span>{{ getFullName(student.user) }}</span>
              </div>
              <div class="info">
                <label class="labels font-weight-bold">Neighborhood</label>
                <span>{{ student.user.neighborhood }}</span>
              </div>
              <div class="info">
                <label class="labels font-weight-bold">Street</label>
                <span>{{ student.user.street }}</span>
              </div>
              <div class="info">
                <label class="labels font-weight-bold">Phone number</label>
                <span>{{ filterPhoneNumber(student.user.phone_number) }}</span>
              </div>
            </div>
        </div>
        </div>
      </div>
      <router-link :to="student.status != 'Active' ? { name: 'studentInactiveShow' } : { name: 'studentActiveShow' }" class="btn btn-blue position-fixed bottom-0 end-0 m-3">
      <i class="fas fa-arrow-left"></i> {{ student.status != 'Active' ? 'Student Requests' : 'Student List' }}
    </router-link>
    </div>
  </template>
  
  <script>
  import { getStudentById, deleteStudent, getFullName, calculateAge, filterPhoneNumber } from '@/services/dataService';
  import { confirmDelete, showErrorMessage, showDeleteSuccessMessage } from '@/services/alerts';

  export default {
    data() {
      return {
        student: null,
        loading: false
      };
    },
    mounted() {
      const studentId = this.$route.params.id;
      if (studentId) {
        this.getStudent(studentId);
      } else {
        console.error('No student ID provided.');
      }
    },
    methods: {
      getStudent(studentId) {
        this.loading = true;
        getStudentById(studentId)
          .then(student => {
            this.student = student;
            this.loading = false;
          })
          .catch(error => {
            console.error('Error fetching student:', error);
            this.loading = false;
          });
      },
      async deleteStudentProfile() { 
        const result = await confirmDelete(getFullName(this.student)); 

        if (result.isConfirmed) {
          deleteStudent(this.student.id)
            .then(response => {
              showDeleteSuccessMessage(this.getFullName(this.student));
              this.$router.push({ name: 'studentActiveShow' });
            })
            .catch(error => {
              showErrorMessage('Error deleting student. Please try again later.');
              console.error('Error deleting student:', error);
            });
        }
      },
      getFullName,
      calculateAge, 
      filterPhoneNumber
    }
  };
</script>