<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
  <h1> List of Payments </h1>
  <router-link :to="{ name: 'paymentCreate' }" class="btn">
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
          <th>Student</th>
          <th>Amount</th>
          <th>Mounth</th>
          <th></th>
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
        <tr v-else v-for="(payment, index) in displayedPayments" :key="payment.id">
          <td>{{ getFilteredIndex(index) }}</td>
          <td>
            <img :src="payment.student.photo || require('@/assets/no-profile.png')" alt="User Photo" class="rounded-circle img-thumbnail" style="width: 38px; height: 38px;">
          </td>
          <td>{{ getFullName(payment.student) }}</td>
          <td> {{ formatCurrency(payment.amount) }} </td>
          <td> {{ formatDate(payment.date) }} </td>
          <td>
            <img :src="payment.student.user.photo || require('@/assets/no-profile.png')" alt="User Photo" class="rounded-circle img-thumbnail" style="width: 38px; height: 38px;">
          </td>
          <td> {{ getFullName(payment.student.user ) }}</td>
          <td>
            <router-link :to="{ name: 'paymentView', params: { id: payment.id }}" class="btn btn-sm" role="button">
              <i class="fas fa-eye"></i> Detail
            </router-link>
          </td>
          <td>
            <router-link :to="{ name: 'paymentEdit', params: { id: payment.id }}" class="btn btn-sm" role="button">
              <i class="fas fa-edit"></i> Edit
            </router-link>
          </td>
          <td>
            <router-link :to="{ name: 'paymentDelete', params: { id: payment.id }}" class="btn btn-sm" role="button">
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
import { getPayments, getFullName, calculateAge, formatDate, formatCurrency } from '@/services/dataService';
export default {
  data() {
    return {
      payments: null,
      loading: false,
      currentPage: 1, 
      pageSize: 50,
      searchQuery: '',
    };
  },
  mounted() {
    this.loadData();
  },
  computed: {
    pageCount() {
    if (!this.filteredPayments) return 0; 
      return Math.ceil(this.filteredPayments.length / this.pageSize);
    },
    startIndex() {
      return (this.currentPage - 1) * this.pageSize;
    },
    endIndex() {
      return this.currentPage * this.pageSize;
    },
    filteredPayments() {
      if (!this.payments) return [];
      return this.payments.filter(payment => {
        return payment.verified === 1 &&
               (payment.student.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                payment.student.first_surname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                payment.student.second_surname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                payment.student.user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                payment.student.user.first_surname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                payment.student.user.second_surname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                this.formatDate(payment.date).toLowerCase().includes(this.searchQuery.toLowerCase()));
      });
    },
    displayedPayments() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = this.currentPage * this.pageSize;
      const displayedPayments = this.filteredPayments.slice(startIndex, endIndex);
      console.log('Displayed Payments:', displayedPayments);
      return displayedPayments;
    }
  },
  methods: {
    async loadData() {
      this.loading = true;
      try {
      this.payments = await getPayments();
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
    formatDate,
    formatCurrency
  }
};
</script>
