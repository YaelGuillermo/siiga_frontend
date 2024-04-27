<template>
  <div v-if="payment">
    <div class="row">
      <div class="col-md-6 border-right">
        <div class="d-flex flex-column align-items-center text-center p-3 py-5">
          <button type="button" class="btn btn-purple" @click="deletePaymentProfile">
            <i class="fas fa-trash"></i> Delete
          </button>
          <img class="mt-3" width="400px" height="auto" v-if="payment && payment.photo" :src="payment.photo" alt="Payment Image">
          <img class="mt-3" width="400px" height="auto" v-else :src="require('@/assets/no-profile.png')" alt="No Profile Image">
          <br>
          <span class="font-weight-bold">{{ formatDate(payment.date) }}</span>
          <div class="col-md-12"></div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="p-3 py-5">
          <div class="d-flex justify-content-between align-items-center mb-3">
          <h4 class="text-right">Parent detail</h4>
          <div>
              <router-link :to="{ name: 'userView', params: { id: payment.user } }" class="btn btn-purple btn-sm" role="button">
                  <i class="fas fa-eye"></i> View
              </router-link>
          </div>
        </div>
        <div v-if="payment.student.user">
              <hr class="my-3"> 
            <div class="info">
              <label class="labels font-weight-bold">Name</label>
              <span>{{ getFullName(payment.student.user) }}</span>
            </div>
            <div class="info">
              <label class="labels font-weight-bold">Age</label>
              <span>{{ calculateAge(payment.student.user.date_of_birth) }}</span>
            </div>
          </div>
      </div>
      <div class="p-3 py-5">
          <div class="d-flex justify-content-between align-items-center mb-3">
          <h4 class="text-right">Student detail</h4>
          <div>
              <router-link :to="{ name: 'userView', params: { id: payment.student.id } }" class="btn btn-purple btn-sm" role="button">
                  <i class="fas fa-eye"></i> View
              </router-link>
          </div>
        </div>
        <div v-if="payment.student">
              <hr class="my-3"> 
            <div class="info">
              <label class="labels font-weight-bold">Name</label>
              <span>{{ getFullName(payment.student) }}</span>
            </div>
            <div class="info">
              <label class="labels font-weight-bold">Age</label>
              <span>{{ calculateAge(payment.student.date_of_birth) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPaymentById, deletePayment, getFullName, calculateAge, formatDate } from '@/services/dataService';
import { confirmDelete, showErrorMessage, showDeleteSuccessMessage } from '@/services/alerts';

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
    async deletePaymentProfile() { 
      const result = await confirmDelete(getFullName(this.payment)); 

      if (result.isConfirmed) {
        deletePayment(this.payment.id)
          .then(response => {
            showDeleteSuccessMessage(this.getFullName(this.payment));
            this.$router.push({ name: 'PaymentActiveShow' });
          })
          .catch(error => {
            showErrorMessage('Error deleting payment. Please try again later.');
            console.error('Error deleting payment:', error);
          });
      }
    },
    getFullName,
    calculateAge, 
    formatDate
  }
};
</script>
