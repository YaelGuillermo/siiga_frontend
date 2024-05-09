<template>
    <div>
      <div class="d-flex justify-content-between align-items-center">
    <h1>{{ title }}</h1>
    <router-link :to="{ name: 'userCreate' }" class="btn">
      <i class="fas fa-pencil-alt"></i> Create
    </router-link>
  </div>
      <div class="input-group mb-3">
        <input type="text" class="form-control" v-model="searchQuery" placeholder="Search by name">
        <div class="input-group-append">
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th></th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Cell Phone</th>
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
          <tr v-else v-for="(user, index) in displayedUsers" :key="user.id">
            
            <td>{{ getFilteredIndex(index) }}</td>
            <td>
              <img :src="user.photo || require('@/assets/no-profile.png')" alt="User Photo" class="rounded-circle img-thumbnail" style="width: 38px; height: 38px;">
            </td>
            <td>{{ user.name }} {{ user.first_surname }} {{ user.second_surname }}</td>
            <td>{{ calculateAge(user.date_of_birth) }}</td>
            <td>{{ formatGender(user.gender) }}</td>
            <td>{{ user.email }}</td>
            <td>{{ filterPhoneNumber(user.phone_number) }}</td>
            <td>
              <router-link :to="{ name: 'userView', params: { id: user.id }}" class="btn btn-purple btn-sm" role="button">
                <i class="fas fa-eye"></i> Detail
              </router-link>
            </td>
            <td>
              <router-link :to="{ name: 'userEdit', params: { id: user.id }}" class="btn btn-purple btn-sm" role="button">
                <i class="fas fa-edit"></i> Edit
              </router-link>
            </td>
            <td>
              <router-link :to="{ name: 'userDelete', params: { id: user.id }}" class="btn btn-purple btn-sm" role="button">
                <i class="fas fa-trash"></i> Delete
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <paginate
        :page-count="pageCount"
        :click-handler="fetchData"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'"
        :prev-class="'page-item'"
        :next-class="'page-item'"
        :page-link-class="'page-link'"
        :prev-link-class="'page-link'"
        :next-link-class="'page-link'"
      >
      <div class="pagination-wrapper">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
            <button class="page-link" @click="fetchData(currentPage - 1)">Prev</button>
          </li>
          <li v-for="pageNumber in pageCount" :key="pageNumber" class="page-item" :class="{ 'active': currentPage === pageNumber }">
            <button class="page-link" @click="fetchData(pageNumber)">{{ pageNumber }}</button>
          </li>
          <li class="page-item" :class="{ 'disabled': currentPage === pageCount }">
            <button class="page-link" @click="fetchData(currentPage + 1)">Next</button>
          </li>
        </ul>
      </div>
    </paginate>
    </div>
  </template>
  
  <script>
  import { getUsers, calculateAge, filterPhoneNumber, formatGender } from '@/services/dataService';
  
  export default {
    props: {
      title: String,
      role: String
    },
    data() {
      return {
        users: null,
        loading: false,
        currentPage: 1, 
        pageSize: 10,
        searchQuery: '' 
      };
    },
    mounted() {
      this.getUsers();
    },
    computed: {
      pageCount() {
      return Math.ceil(this.filteredUsers.length / this.pageSize);
    },
    startIndex() {
      return (this.currentPage - 1) * this.pageSize;
    },
    endIndex() {
      return this.currentPage * this.pageSize;
    },
    filteredUsers() {
      if (!this.users) return [];
      return this.users.filter(user => {
        return user.role === this.role &&
               (user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                user.first_surname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                user.second_surname.toLowerCase().includes(this.searchQuery.toLowerCase()));
      });
        //return this.users ? this.users.filter(user => user.role === this.role) : [];
      },
      displayedUsers() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = this.currentPage * this.pageSize;
        const displayedUsers = this.filteredUsers.slice(startIndex, endIndex);
        console.log('Displayed Users:', displayedUsers);
        return displayedUsers;
      }
    },
    methods: {
      getUsers() {
        this.loading = true;
        getUsers()
          .then(users => {
            this.users = users;
            this.loading = false;
          })
          .catch(error => {
            console.error('Error fetching users:', error);
            this.loading = false;
          });
      },
      getFilteredIndex(index) {
        return (this.currentPage - 1) * this.pageSize + index + 1;
      },
      fetchData(pageNumber = 1) {
        this.currentPage = pageNumber;
      },
      calculateAge,
      filterPhoneNumber,
      formatGender
    }
  };
  </script>
  