<template>
  <div v-if="user">
    <div class="row">
      <div class="col-md-3 border-right">
        <div class="d-flex flex-column align-items-center text-center p-3 py-5">
          <img class="rounded-circle mt-5" width="150px" v-if="user && user.photo" :src="user.photo" alt="User Image">
          <img class="rounded-circle mt-5" width="150px" v-else :src="require('@/assets/no-profile.png')" alt="No Profile Image">
          <br>
          <span class="font-weight-bold">{{ user ? getFullName(user) : 'Guest' }}</span>
          <span class="text-black-50">{{ user ? user.email : 'guest@example.com' }}</span>
        </div>
      </div>
      <div class="col-md-5 border-right">
        <div class="p-3 py-5">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="text-right">Profile Settings</h4>
          </div>
          <hr class="my-3">
          <div class="row mt-2">
              <div class="col-md-12">
                  <div class="info">
                      <label class="labels font-weight-bold">Age</label>
                      <span>{{ user ? calculateAge(user.date_of_birth) : 'N/A' }}</span>
                  </div>
              </div>
              <div class="col-md-12">
                  <div class="info">
                      <label class="labels font-weight-bold">Gender</label>
                      <span>{{ user ? formatGender(user.gender) : 'N/A' }}</span>
                  </div>
              </div>
              <div class="col-md-12">
                  <div class="info">
                      <label class="labels font-weight-bold">Neighborhood</label>
                      <span>{{ user ? user.neighborhood : 'N/A' }}</span>
                  </div>
              </div>
              <div class="col-md-12">
                  <div class="info">
                      <label class="labels font-weight-bold">Street</label>
                      <span>{{ user ? user.street : 'N/A' }}</span>
                  </div>
              </div>
              <div class="col-md-12">
                  <div class="info">
                      <label class="labels font-weight-bold">Phone Number</label>
                      <span>{{ user ? filterPhoneNumber(user.phone_number) : 'N/A' }}</span>
                  </div>
              </div>
              <div class="col-md-12">
                  <div class="info">
                      <label class="labels font-weight-bold">Email</label>
                      <span>{{ user ? user.email : 'N/A' }}</span>
                  </div>
              </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="p-3 py-5">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="text-right">Student's Child</h4>
          </div>
          <div v-if="user.students">
            <div v-for="student in user.students" :key="student.id">
              <div v-if="student.status == 'Active'">
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
                  <router-link :to="{ name: 'studentView', params: { id: student.id } }" class="btn-v" role="button">
                    <i class="fas fa-eye"></i> View
                  </router-link>
                </div>
              </div>
              </div>
            </div>
          </div>
          <div v-if="user.students.length == 0">
            None
          </div>
        </div>
      </div>
    </div>
    <router-link :to="user.role == 'P' ? { name: 'parentShow' } : { name: 'administratorShow' }" class="btn btn-blue position-fixed bottom-0 end-0 m-3">
      <i class="fas fa-arrow-left"></i> {{ user.role == 'P' ? 'List of Parents' : 'List of Administrators' }}
    </router-link>
  </div>
</template>

<script>
import { getUserById, getFullName, filterPhoneNumber, calculateAge, formatGender } from '@/services/dataService';

export default {
  data() {
    return {
      user: null,
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
          this.loading = false;
        })
        .catch(error => {
          console.error('Error fetching user:', error);
          this.loading = false;
        });
    },
    getFullName,
    filterPhoneNumber,
    calculateAge,
    formatGender
  }
};
</script>

<style src="../styles/profile.css"></style>
