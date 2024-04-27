<template>
  <div class="container rounded bg-white mt-5 mb-5">
    <form @submit.prevent="createPayment">
      <div class="row">
        <div class="col-md-4 border-right">
          <div class="d-flex flex-column align-items-center text-center p-3 py-5">
            <button type="submit" class="btn btn-purple">
              <i class="fas fa-user-plus"></i> Create
            </button>
            <img class="mt-3" width="300px" height="auto" v-if="payment && payment.photo" :src="payment.photo" alt="payment Image">
                <img class="mt-3" width="300px" height="auto" v-else :src="require('@/assets/no-payment.jpg')" alt="No Profile Image">
                <br>
                <div class="col-md-12">
                  <div class="info">
                      <label class="labels font-weight-bold">Photo</label>
                      <input type="file" v-on:change="onFileChange" class="form-control" accept="image/*">
                  </div>
              </div>
          </div>
        </div>
        <div class="col-md-4 border-right">
          <div class="p-3 py-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="text-right">Detail</h4>
            </div>
            <div class="row mt-2">
              <div class="col-md-12">
                <div class="info">
                  <label class="labels font-weight-bold">Date</label>
                  <input type="date" v-model="payment.date" class="form-control" required>
                  <small class="text-danger">{{ errors.date }}</small>
                </div>
              </div>
              <div class="col-md-12">
                <div class="info">
                  <label class="labels font-weight-bold">Amount</label>
                  <input type="number" step="0.01" v-model="payment.amount" class="form-control" placeholder=4000.00 required>
                  <small class="text-danger">{{ errors.amount }}</small>
                </div>
              </div>
              <div class="col-md-12">
                <div class="info">
                    <label class="labels font-weight-bold">Verified</label>
                    <select class="form-control" v-model="payment.verified" required>
                        <option value=1>Verified</option>
                        <option value=0>Unverified</option>
                    </select>
                    <small class="text-danger">{{ errors.verified }}</small>
                </div>
            </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="p-3 py-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="text-right">Others</h4>
            </div>
            <div class="col-md-12">
                <div class="info">
                  <label class="labels font-weight-bold">Student</label>
                  <input type="text" v-model="payment.note" class="form-control" required>
                  <small class="text-danger">{{ errors.student }}</small>
                </div>
              </div>
              <div class="col-md-12">
              <div class="info">
                  <label class="labels font-weight-bold">Note</label>
                  <textarea class="form-control" v-model="payment.note" rows="4"></textarea>
                  <small class="text-danger">{{ errors.note }}</small>
              </div>
          </div>
          
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { createPayment } from '@/services/dataService';
import { showCreateSuccessMessage, showErrorMessage } from '@/services/alerts';

export default {
  data() {
    return {
      payment: {
        date: '',
        amount: '',
        photo: '',
        verified: ''
      },
      errors: {}
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      this.payment.photo = file;
    },
    createPayment() {
      createPayment(this.payment)
        .then(response => {
          showCreateSuccessMessage('Payment created successfully');
          this.resetPaymentForm();
          // Redirect or perform any additional actions after successful payment creation
        })
        .catch(error => {
          showErrorMessage('Error creating payment. Please try again later.');
          console.error('Error creating payment:', error);
          this.clearErrors();
          if (error.response && error.response.data && error.response.data.errors) {
            const validationErrors = error.response.data.errors;
            Object.keys(validationErrors).forEach(field => {
              if (Array.isArray(validationErrors[field])) {
                const errorMessage = validationErrors[field][0];
                this.errors[field] = errorMessage;
              }
            });
          }
        });
    },
    clearErrors() {
      for (let field in this.errors) {
        this.errors[field] = null;
      }
    },
    resetPaymentForm() {
      this.payment = {
        date: '',
        amount: '',
        photo: '',
        verified: ''
      };
      // Additional logic to reset file input if needed
      const fileInput = this.$refs.fileInput;
      if (fileInput) {
        fileInput.value = '';
      }
    }
  }
};
</script>
