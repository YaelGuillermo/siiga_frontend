<template>
  <div v-if="user">
    <div class="row">
      <div class="col-md-12">
        <div class="p-3 py-5">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h1>Children</h1>
            <router-link :to="{ name: 'childrenCreate' }" class="btn">
      <i class="fas fa-pencil-alt"></i> Create child
    </router-link>
          </div>
          <div >
          
            <table class="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>CURP</th>
                  <th>Status</th>
                  <th></th>
                  <th>Actions</th>
                  <th></th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                <tr v-if="loading">
                  <td colspan="10">
                    <h3>Loading ...</h3>
                  </td>
                </tr>
                
                  <tr v-for="(student, index) in user.students" :key="student.id">
                    <td>
                      <img :src="student.photo || require('@/assets/no-profile.png')" alt="User Photo" class="rounded-circle img-thumbnail" style="width: 38px; height: 38px;">
                    </td>
                    <td>{{ getFullName(student) }}</td>
                    <td>{{ calculateAge(student.date_of_birth) }}</td>
                    <td>{{ formatGender(student.gender) }}</td>
                    <td>{{ student.curp }}</td>
                    <td>
    <span :style="{ color: formatStatus(student.status).color }">
        <i :class="formatStatus(student.status).icon"></i> {{ formatStatus(student.status).text }}
    </span>
</td>
                    <td v-if="student.status != 'Active'">
                        <router-link :to="{ name: 'childrenEdit', params: { id: student.id }}" class="btn btn-sm" role="button">
                            <i class="fas fa-edit"></i> Edit
                        </router-link>
                    </td>
                    <td v-else>
                    </td>
                    <td>
                        <router-link :to="{ name: 'studentView', params: { id: student.id }}" class="btn btn-sm" role="button">
                            <i class="fas fa-eye"></i> Detail
                        </router-link>
                    </td>
                    <td v-if="student.status != 'Active'">
                        <router-link :to="{ name: 'studentDelete', params: { id: student.id }}" class="btn btn-sm" role="button">
                            <i class="fas fa-trash"></i> Delete
                        </router-link>
                    </td>
                    <td v-else>
                    </td>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { getUserById, getFullName, filterPhoneNumber, calculateAge, formatStatus, formatGender } from '@/services/dataService';

export default {
  data() {
    return {
      user: null,
      loading: false
    };
  },
  mounted() {
    const userId= JSON.parse(localStorage.getItem('user'));
    if (userId) {
      this.getUser(userId.id);
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
    formatStatus,
    formatGender
  }
};
</script>
