<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
    <h1>{{ title }}</h1>
    <router-link :to="{ name: 'studentCreate' }" class="btn">
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
          <th>CURP</th>
          <th>Parent</th>
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
        <tr v-else v-for="(student, index) in displayedStudents" :key="student.id">

            <td>{{ getFilteredIndex(index) }}</td>
            <td>
              <img :src="student.photo || require('@/assets/no-profile.png')" alt="User Photo" class="rounded-circle img-thumbnail" style="width: 38px; height: 38px;">
            </td>
            <td>{{ getFullName(student) }}</td>
            <td>{{ calculateAge(student.date_of_birth) }}</td>
            <td>{{ formatGender(student.gender) }}</td>
            <td>{{ student.curp }}</td>
            <td>{{ getFullName(student.user) }}</td>
            <td>
              <router-link :to="{ name: 'studentView', params: { id: student.id }}" class="btn btn-sm" role="button">
                <i class="fas fa-eye"></i> Detail
              </router-link>
            </td>
            <td>
              <router-link :to="{ name: 'studentEdit', params: { id: student.id }}" class="btn btn-sm" role="button">
                <i class="fas fa-edit"></i> Edit
              </router-link>
            </td>
            <td>
              <router-link :to="{ name: 'studentDelete', params: { id: student.id }}" class="btn btn-sm" role="button">
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
import { getStudents, getFullName, calculateAge, formatGender } from '@/services/dataService';

export default {
  props: {
    status: String,
    title: String
  },
  data() {
    return {
      students: null,
      loading: false,
      currentPage: 1, 
      pageSize: 10,
      searchQuery: '', 
    };
  },
  mounted() {
    this.loadData();
  },
  computed: {
    pageCount() {
    if (!this.filteredStudents) return 0; 
      return Math.ceil(this.filteredStudents.length / this.pageSize);
    },
    startIndex() {
      return (this.currentPage - 1) * this.pageSize;
    },
    endIndex() {
      return this.currentPage * this.pageSize;
    },
    filteredStudents() {
      if (!this.students) return [];
      return this.students.filter(student => {
        return student.status == this.status &&
               (student.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                student.first_surname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                student.second_surname.toLowerCase().includes(this.searchQuery.toLowerCase()));
      });
    },
    displayedStudents() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = this.currentPage * this.pageSize;
      const displayedStudents = this.filteredStudents.slice(startIndex, endIndex);
      console.log('Displayed Students:', displayedStudents);
      return displayedStudents;
    }
  },
  methods: {
    async loadData() {
      this.loading = true;
      try {
        this.students = await getStudents();
        this.loading = false;
      } catch (error) {
        console.error('Error fetching data:', error);
        this.loading = false;
      }
    },
    getFilteredIndex(index) {
      return (this.currentPage - 1) * this.pageSize + index + 1;
    },
    fetchData(pageNumber = 1) {
        this.currentPage = pageNumber;
      },
    calculateAge,
    getFullName,
    formatGender
  }
};
</script>