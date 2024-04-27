<template>
  <div v-if="payment">
    <div class="row">
      <div class="col-md-1"></div>
      <div class="col-md-5">
        <div class="p-3 py-5">
          <div class="d-flex flex-column align-items-center text-center">
            <h4 class="text-center mb-3">Invoice</h4>
            <img class="mt-3" width="400px" height="auto" v-if="payment && payment.photo" :src="payment.photo" alt="Payment Image">
            <img class="mt-3" width="400px" height="auto" v-else :src="require('@/assets/no-profile.png')" alt="No Profile Image">        
            <br>
          </div>
          <div class="d-flex flex-column align-items-center mt-3">
              <div class="col-md-12">
                  <div class="info">
                      <label class="labels font-weight-bold">Note</label>
                      <span v-if="payment.note === null">Fine!</span>
                      <span v-else>{{ payment.note }}</span>
                  </div>
              </div>
          </div>
        </div>
      </div>
      <div class="col-md-5">
        <div class="p-3 py-5">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="text-right">Detail</h4>
          </div>
          <hr class="my-3"> 
          <div class="info">
            <label class="labels font-weight-bold">Date</label>
            <span>{{ payment ? formatDate(payment.date) : 'N/A' }}</span>
          </div>
          <div class="info">
            <label class="labels font-weight-bold">Amount</label>
            <span>{{ payment ? formatCurrency(payment.amount) : 'N/A' }}</span>
          </div>
          <br>
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="text-right">Student</h4>
          </div>
          <hr class="my-3"> 
          <div class="info">
            <label class="labels font-weight-bold">Name</label>
            <span>{{ getFullName(payment.student) }}</span>
          </div>
          <div class="info d-flex justify-content-between">
            <div>
              <label class="labels font-weight-bold">Age</label>
              <span>{{ calculateAge(payment.student.date_of_birth) }}</span>
            </div>
            <div>
              <router-link :to="{ name: 'studentView', params: { id: payment.student.user.id } }" class="btn btn-purple btn-sm" role="button">
                <i class="fas fa-eye"></i> View
              </router-link>
            </div>
          </div>
          <br>
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="text-right">Parent</h4>
          </div>
          <hr class="my-3"> 
          <div class="info">
            <label class="labels font-weight-bold">Name</label>
            <span>{{ getFullName(payment.student.user) }}</span>
          </div>
          <div class="info d-flex justify-content-between">
          <div>
              <label class="labels font-weight-bold">Age</label>
              <span>{{ calculateAge(payment.student.user.date_of_birth) }}</span>
            </div>
            <div>
              <router-link :to="{ name: 'userView', params: { id: payment.student.user.id } }" class="btn btn-purple btn-sm" role="button">
                <i class="fas fa-eye"></i> View
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { getPaymentById, getFullName, calculateAge, formatDate, formatCurrency } from '@/services/dataService';

export default {
  data() {
    return {
      payment: null,
      loading: false
    };
  },
  mounted() {
    const paymentId = this.$route.params.id;
    if (paymentId) {
      this.getPayment(paymentId);
    } else {
      console.error('No payment ID provided.');
    }
  },
  methods: {
    getPayment(paymentId) {
      this.loading = true;
      getPaymentById(paymentId)
        .then(payment => {
          this.payment = payment;
          this.loading = false;
        })
        .catch(error => {
          console.error('Error fetching payment:', error);
          this.loading = false;
        });
    },
    getFullName,
    formatCurrency,
    formatDate,
    calculateAge
  }
};
</script>

<style src="../styles/profile.css"></style>
