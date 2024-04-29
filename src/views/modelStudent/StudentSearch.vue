<template>
  <div v-if="student">
    <div class="row">
      <div class="col-md-3 border-right">
        <div class="d-flex flex-column align-items-center text-center p-3 py-5">
          <img class="rounded-circle mt-5" width="150px" v-if="student && student.photo" :src="student.photo" alt="Student Image">
          <img class="rounded-circle mt-5" width="150px" v-else :src="require('@/assets/no-profile.png')" alt="No Profile Image">
          <span class="font-weight-bold">{{ getFullName(student) }}</span>
          <div class="col-md-12 mt-3">
      <div class="info">
        <label class="labels font-weight-bold">Note</label>
        <span class="text-center">{{ student.note }}</span>
      </div>
    </div>
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
                <span>{{ calculateAge(student.date_of_birth) }}</span>
              </div>
            </div>
            <div class="col-md-12">
              <div class="info">
                <label class="labels font-weight-bold">Gender</label>
                <span>{{ formatGender(student.gender) }}</span>
              </div>
            </div>
            <div class="col-md-12">
              <div class="info">
                <label class="labels font-weight-bold">Curp</label>
                <span>{{ student.curp }}</span>
              </div>
            </div>
            <div class="col-md-12">
              <div class="info">
                <label class="labels font-weight-bold">Blood type</label>
                <span>{{ student.blood_type }}</span>
              </div>
            </div>
            <div class="col-md-12">
              <div class="info">
                <label class="labels font-weight-bold">Birth certificate</label>
                <span>{{ student.birth_certificate }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="p-3 py-5">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="text-right">Parent detail</h4>
            <div>
              <router-link :to="{ name: 'userView', params: { id: student.user_id } }" class="btn btn-purple btn-sm" role="button">
                <i class="fas fa-eye"></i> View
              </router-link>
            </div>
          </div>
          <div v-if="student.user">
            <hr class="my-3"> 
            <div class="info">
              <label class="labels font-weight-bold">Name</label>
              <span>{{ getFullName(student.user) }}</span>
            </div>
            <div class="info">
              <label class="labels font-weight-bold">Neighborhood</label>
              <span>{{ student.user.neighborhood }}</span>
            </div>
            <div class="info">
              <label class="labels font-weight-bold">Street</label>
              <span>{{ student.user.street }}</span>
            </div>
            <div class="info">
              <label class="labels font-weight-bold">Phone number</label>
              <span>{{ filterPhoneNumber(student.user.phone_number) }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 mt-3">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="text-right">Payments</h4>
          </div>
        <div v-if="student.payments && student.payments.length > 0">
          <div class="accordion" id="paymentsAccordion">
            <div class="accordion-item">
              <h2 class="accordion-header" id="paymentsHeading">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#paymentsCollapse" aria-expanded="true" aria-controls="paymentsCollapse">
                  2024
                </button>
              </h2>
              <div id="paymentsCollapse" class="accordion-collapse collapse show" aria-labelledby="paymentsHeading" data-bs-parent="#paymentsAccordion">
                <div class="accordion-body">
                 <!-- Cards de los pagos -->
                 <div class="row">
                  <div class="col-md-3" v-for="payment in student.payments" :key="payment.id">
                <div class="card mb-3">
                  <div class="card-header">
                    <strong>{{ formatDate(payment.date) }}</strong>
                  </div>
                  <div class="card-body">
                    <p><strong>Amount:</strong> {{ formatCurrency(payment.amount) }}</p>
                    <router-link :to="{ name: 'paymentView', params: { id: payment.id }}" class="btn btn-sm" role="button">
                      <i class="fas fa-eye"></i> View
                    </router-link>
                  </div>
                </div>
                 </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p>No payments</p>
        </div>
      </div>
    </div>
    <router-link :to="student.status != 'Active' ? { name: 'studentInactiveShow' } : { name: 'studentActiveShow' }" class="btn btn-blue position-fixed bottom-0 end-0 m-3">
      <i class="fas fa-arrow-left"></i> {{ student.status != 'Active' ? 'Student Requests' : 'Student List' }}
    </router-link>
  </div>
</template>

  
<script>
  import { getStudentById, getFullName, calculateAge, filterPhoneNumber, formatCurrency, formatDate, formatGender } from '@/services/dataService';
  export default {
    data() {
      return {
        student: null,
        loading: false
      };
    },
    mounted() {
      const studentId = this.$route.params.id;
      if (studentId) {
        this.getStudent(studentId);
      } else {
        console.error('No student ID provided.');
      }
    },
    methods: {
      getStudent(studentId) {
        this.loading = true;
        getStudentById(studentId)
          .then(student => {
            this.student = student;
            this.loading = false;
          })
          .catch(error => {
            console.error('Error fetching student:', error);
            this.loading = false;
          });
      },
      getFullName,
      calculateAge, 
      filterPhoneNumber,
      formatCurrency,
      formatDate,
      formatGender
    }
  };
</script>
  