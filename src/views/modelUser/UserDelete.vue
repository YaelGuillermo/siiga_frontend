<template>
    <div v-if="user" class="container rounded bg-white mt-5 mb-5">
        <div class="row">
              <div class="col-md-6 border-right">
                <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                    <button type="button" class="btn btn-purple" @click="deleteUserProfile">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                  <img class="rounded-circle mt-5" width="150px" v-if="user && user.photo" :src="user.photo" alt="User Image">
                  <img class="rounded-circle mt-5" width="150px" v-else :src="require('@/assets/no-profile.png')" alt="No Profile Image">
                  <span class="font-weight-bold">{{ user ? getFullName(user) : 'Guest' }}</span>
                  <span class="text-black-50">{{ user ? user.email : 'guest@example.com' }}</span>
                  <div class="col-md-12">
                  </div>
                </div>
              </div>
              <div class="col-md-6">
        <div class="p-3 py-5">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="text-right">Student's Child</h4>
          </div>
          <div v-if="students">
            <div v-for="(student, index) in students" :key="student.id">
              <div v-if="student.status == 1">
                <hr class="my-3"> 
              <div class="info">
                <label class="labels font-weight-bold">Name</label>
                <span>{{ getFullName(student) }}</span>
              </div>
              <div class="info d-flex justify-content-between">
                <div>
                  <label class="labels font-weight-bold">Age</label>
                  <span>{{ calculateAge(student.date_of_birth) }}</span>
                </div>
                <div>
                  <router-link :to="{ name: 'studentView', params: { id: student.id } }" class="btn btn-purple btn-sm" role="button">
                    <i class="fas fa-eye"></i> View
                  </router-link>
                </div>
              </div>
              </div>
            </div>
          </div>
          <div v-if="students == 0">
            None
          </div>
        </div>
      </div>
        </div>
    </div>
</template>
  
<script>
 import { getUserById, getStudentsByUserId, deleteUser, getFullName, calculateAge } from '@/services/dataService';
import { confirmDelete, showErrorMessage, showDeleteSuccessMessage } from '@/services/alerts';
  
  export default {
    data() {
      return {
        user: null,
        students: null,
        loading: false
      };
    },
    mounted() {
      const userId = this.$route.params.id;
      if (userId) {
        this.getUser(userId);
      } else {
        console.error('No user ID provided.');
      }
    },
    methods: {
      getUser(userId) {
        this.loading = true;
        getUserById(userId)
          .then(user => {
            this.user = user;
            this.getStudentsByUser(userId);
            this.loading = false;
          })
          .catch(error => {
            console.error('Error fetching user:', error);
            this.loading = false;
          });
      },
      getStudentsByUser(userId) {
      getStudentsByUserId(userId)
        .then(students => {
          console.log(students);
          this.students = students;
        })
        .catch(error => {
          console.error('Error fetching students:', error);
        });
    },
    async deleteUserProfile() { 
        const result = await confirmDelete(getFullName(this.user)); 

        if (result.isConfirmed) {
          deleteUser(this.user.id)
            .then(response => {
              showDeleteSuccessMessage(this.getFullName(this.user));
              this.$router.push({ name: 'parentShow' });
            })
            .catch(error => {
              showErrorMessage('Error deleting user. Please try again later.');
              console.error('Error deleting user:', error);
            });
        }
      },
      getFullName,
      calculateAge
    }
  };
  </script>
  
  <style src="../styles/profile.css"></style>
