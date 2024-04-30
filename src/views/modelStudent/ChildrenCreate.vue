<template>
    <div class="container rounded bg-white mt-5 mb-5">
      <form @submit.prevent="createStudent">
        <div class="row">
          <div class="col-md-4 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
              <button type="submit" class="btn btn-purple">
                <i class="fas fa-user-plus"></i> Create
              </button>
              <img class="rounded-circle mt-5" width="150px" v-if="student && student.photo" :src="student.photo" alt="Student Image">
                  <img class="rounded-circle mt-5" width="150px" v-else :src="require('@/assets/no-profile.png')" alt="No Profile Image">
                  <span class="font-weight-bold">{{ getFullName(student) }}</span>
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
                <h4 class="text-right">Profile Settings</h4>
              </div>
              <div class="row mt-2">
                <div class="col-md-12">
                  <div class="info">
                    <label class="labels font-weight-bold">Name</label>
                    <input type="text" v-model="student.name" class="form-control" placeholder="Name" required>
                    <small class="text-danger">{{ errors.name }}</small>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="info">
                    <label class="labels font-weight-bold">First Surname</label>
                    <input type="text" v-model="student.first_surname" class="form-control" placeholder="First Surname" required>
                    <small class="text-danger">{{ errors.first_surname }}</small>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="info">
                    <label class="labels font-weight-bold">Second Surname</label>
                    <input type="text" v-model="student.second_surname" class="form-control" placeholder="Second Surname" required>
                    <small class="text-danger">{{ errors.second_surname }}</small>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="info">
                    <label class="labels font-weight-bold">Date of Birth</label>
                    <input type="date" v-model="student.date_of_birth" class="form-control" required>
                    <small class="text-danger">{{ errors.date_of_birth }}</small>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="info">
                      <label class="labels font-weight-bold">Grade</label>
                      <select class="form-control" v-model="student.grade" required>
                          <option value="Pre-Kinder">Pre-Kinder</option>
                          <option value="1st Grade">1st Grade</option>
                          <option value="2nd Grade">2nd Grade</option>
                          <option value="3rd Grade">3rd Grade</option>
                          <option value="4th Grade">4th Grade</option>
                          <option value="5th Grade">5th Grade</option>
                          <option value="6th Grade">6th Grade</option>
                      </select>
                      <small class="text-danger">{{ errors.student }}</small>
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
                  <label class="labels font-weight-bold">Gender</label>
                  <select class="form-control" v-model="student.gender" required>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="U">Undefined</option>
                  </select>
                  <small class="text-danger">{{ errors.gender }}</small>
                </div>
              </div>
              <div class="col-md-12">
                    <div class="info">
                        <label class="labels font-weight-bold">Blood Type</label>
                        <select class="form-control" v-model="student.blood_type" required>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                        <small class="text-danger">{{ errors.blood_type }}</small>
                    </div>
                </div>
              <div class="col-md-12">
                <div class="info">
                  <label class="labels font-weight-bold">CURP</label>
                  <input type="text" v-model="student.curp" class="form-control" placeholder="CURP" required>
                  <small class="text-danger">{{ errors.curp }}</small>
                </div>
              </div>
          </div>
          </div>
        </div>
      </form>
      <router-link :to="{ name: 'childrenShow' }" class="btn btn-blue position-fixed bottom-0 end-0 m-3">
        <i class="fas fa-arrow-left"></i> Children
      </router-link>
    </div>
  </template>

<script>
import { createStudent, getFullName } from '@/services/dataService';
import { showCreateSuccessMessage, showErrorMessage } from '@/services/alerts';

export default {
  data() {
    return {
      student: {
        name: '',
        first_surname: '',
        second_surname: '',
        date_of_birth: '',
        gender: '',
        curp: '',
        blood_type: '',
        birth_certificate: '',
        photo: '',
        note: '',
        status: 'Under review',
        user_id: null
      },
      errors: {}
    };
  },
  mounted() {
    const userId= JSON.parse(localStorage.getItem('user'));
    if (userId) {
      this.student.user_id = userId.id;
      //this.getUser(userId.id);
    } else {
      console.error('No user ID provided.');
    }
  },
  methods: {
      onFileChange(event) {
          const file = event.target.files[0];
          this.student.photo = file;
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (e) => {
              this.student.photo = e.target.result;
          };
      },
      createStudent() {
          createStudent(this.student)
              .then(response => {
                  showCreateSuccessMessage(this.getFullName(this.student));
                  this.student = {
                    name: '',
                    first_surname: '',
                    second_surname: '',
                    date_of_birth: '',
                    gender: '',
                    curp: '',
                    blood_type: '',
                    birth_certificate: '',
                    photo: '',
                    note: '',
                    status: ''
                  };
                  this.$router.push({ name: 'childrenShow' });
              })
              .catch(error => {
                  showErrorMessage('Error creating student. Please try again later.');
                  console.error('Error creating student:', error);
                  this.clearErrors();
                  if (error.response && error.response.data && error.response.data.errors) {
                      const validationErrors = error.response.data.errors;
                      Object.keys(validationErrors).forEach(field => {
                          if (Array.isArray(validationErrors[field])) {
                              const errorMessage = validationErrors[field][0];
                              this.errors[field] = errorMessage;
                              console.log('Field:', field);
                              console.log('Error Message:', errorMessage);
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
      getFullName
  }}
</script>
