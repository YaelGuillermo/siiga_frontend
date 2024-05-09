<template>
  <div v-if="payment" class="container rounded bg-white mt-5 mb-5">
    <form @submit.prevent="updatePaymentProfile">
      <div class="row">
        <div class="col-md-4 border-right">
          <div class="d-flex flex-column align-items-center text-center p-3 py-5">
            <button type="submit" class="btn btn-purple">
              <i class="fas fa-cog"></i> Update
            </button>
            <img class="mt-3" width="300px" height="auto" v-if="payment && payment.photo" :src="payment.photo" alt="payment Image">
          <img class="mt-3" width="300px" height="auto" v-else :src="require('@/assets/no-profile.png')" alt="No Profile Image">
          <br>
          <span class="font-weight-bold">{{ getFullName(payment.student.user) }}</span>
          <span class="font-weight-bold">{{ getFullName(payment.student) }}</span>
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
                  <input type="text" v-model="payment.amount" class="form-control" required>
                  <small class="text-danger">{{ errors.amount }}</small>
                </div>
              </div>
              <div class="col-md-12">
                    <div class="info">
                        <label class="labels font-weight-bold">Photo</label>
                        <input type="file" v-on:change="onFileChange" class="form-control" accept="image/*">
                    </div>
                </div>
              <div class="col-md-12">
                <div class="info">
                  <label class="labels font-weight-bold">Verified</label>
                  <select class="form-control" v-model="payment.verified" required>
                    <option value="1">Verified</option>
                    <option value="0">Unverified</option>
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
                  <input type="text" v-model="payment.student.name" class="form-control" required>
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
    <router-link :to="{ name: 'paymentShow' }" class="btn btn-blue position-fixed bottom-0 end-0 m-3">
    <i class="fas fa-arrow-left"></i> List of payments
  </router-link>
  </div>
</template>

<script>
import { getPaymentById, updatePayment, getFullName } from '@/services/dataService';
import { showUpdateSuccessMessage, showErrorMessage } from '@/services/alerts';

export default {
  data() {
    return {
      payment: null,
      loading: false,
      errors: {}
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
    onFileChange(event) {
          const file = event.target.files[0];
          this.payment.photo = file;
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (e) => {
              this.payment.photo = e.target.result;};
          },
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
    updatePaymentProfile() {
        this.loading = true;
        this.clearErrors();
        const studentId = this.student.id;
        const studentData = {
          name: this.student.name,
          first_surname: this.student.first_surname,
          second_surname: this.student.second_surname,
          date_of_birth: this.student.date_of_birth,
          gender: this.student.gender,
          blood_type: this.student.blood_type,
          curp: this.student.curp,
          photo: this.student.photo,
          note: this.student.note,
          status: this.student.status,
          grade: this.student.grade,
          photo: null,
          birth_certificate: null,
          user_id: this.student.user_id
        };
        updateStudent(studentId, studentData)
          .then(response => {
            console.log(studentData);
            showUpdateSuccessMessage(this.getFullName(this.student));
            this.$router.push({ name: 'studentActiveShow' });
          })
          .catch(error => {
            showErrorMessage('Error updating student. Please try again later.');
            console.error('Error updating student:', error);
            this.clearErrors();
    
    // Verificar si la respuesta contiene datos de error
    if (error.response && error.response.data && error.response.data.errors) {
        const validationErrors = error.response.data.errors;
        
        // Iterar sobre cada campo con error
        Object.keys(validationErrors).forEach(field => {
            // Verificar si el mensaje de error es un arreglo
            if (Array.isArray(validationErrors[field])) {
                // Si es un arreglo, tomar el primer mensaje de error
                const errorMessage = validationErrors[field][0];
                
                // Asignar el mensaje de error al campo correspondiente
                this.errors[field] = errorMessage;
                
                // También puedes mostrar el mensaje de error en la consola si es necesario
                console.log('Field:', field);
                console.log('Error Message:', errorMessage);
            }
        });
      }});
      },
      handleFileUpload(event) {
        const file = event.target.files[0];
        },
        clearErrors() {
        for (let field in this.errors) {
          this.errors[field] = null;
        }
      },
    getFullName
  }
};
</script>

  