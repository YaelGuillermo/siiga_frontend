<template>
    <div class="container rounded bg-white mt-5 mb-5">
      <form @submit.prevent="createUser">
        <div class="row">
          <div class="col-md-4 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
              <button type="submit" class="btn btn-purple">
                <i class="fas fa-user-plus"></i> Create
              </button>
              <img class="rounded-circle mt-5" width="150px" v-if="user && user.photo" :src="user.photo" alt="User Image">
                  <img class="rounded-circle mt-5" width="150px" v-else :src="require('@/assets/no-profile.png')" alt="No Profile Image">
                  <span class="font-weight-bold">{{ getFullName(user) }}</span>
                  <span class="text-black-50">{{ user.email }}</span>
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
                    <input type="text" v-model="user.name" class="form-control" placeholder="Name" required>
                    <small class="text-danger">{{ errors.name }}</small>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="info">
                    <label class="labels font-weight-bold">First Surname</label>
                    <input type="text" v-model="user.first_surname" class="form-control" placeholder="First Surname" required>
                    <small class="text-danger">{{ errors.first_surname }}</small>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="info">
                    <label class="labels font-weight-bold">Second Surname</label>
                    <input type="text" v-model="user.second_surname" class="form-control" placeholder="Second Surname" required>
                    <small class="text-danger">{{ errors.second_surname }}</small>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="info">
                    <label class="labels font-weight-bold">Date of Birth</label>
                    <input type="date" v-model="user.date_of_birth" class="form-control" required>
                    <small class="text-danger">{{ errors.date_of_birth }}</small>
                  </div>
                </div>
                <div class="col-md-12">
                    <div class="info">
                        <label class="labels font-weight-bold">Email</label>
                        <input type="email" v-model="user.email" class="form-control" placeholder="Email" required>
                        <small class="text-danger">{{ errors.email }}</small>
                    </div>
                    </div>

                    <div class="col-md-12">
                    <div class="info">
                        <label class="labels font-weight-bold">Password</label>
                        <input type="password" v-model="user.password" class="form-control" placeholder="Password" required>
                        <small class="text-danger">{{ errors.email }}</small>
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
                  <select class="form-control" v-model="user.gender" required>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="U">Undefined</option>
                  </select>
                  <small class="text-danger">{{ errors.gender }}</small>
                </div>
              </div>
              <div class="col-md-12">
                <div class="info">
                  <label class="labels font-weight-bold">Neighborhood</label>
                  <input type="text" v-model="user.neighborhood" class="form-control" placeholder="Neighborhood" required>
                  <small class="text-danger">{{ errors.neighborhood }}</small>
                </div>
              </div>
              <div class="col-md-12">
                <div class="info">
                  <label class="labels font-weight-bold">Street</label>
                  <input type="text" v-model="user.street" class="form-control" placeholder="Street" required>
                  <small class="text-danger">{{ errors.street }}</small>
                </div>
              </div>
              <div class="col-md-12">
                <div class="info">
                  <label class="labels font-weight-bold">Phone Number</label>
                  <input type="tel" v-model="user.phone_number" class="form-control" placeholder="Phone number" required>
                  <small class="text-danger">{{ errors.phone_number }}</small>
                </div>
              </div>
              <div class="col-md-12">
                <div class="info">
                  <label class="labels font-weight-bold">Role</label>
                  <select class="form-control" v-model="user.role" required>
                    <option value="P">Parent</option>
                    <option value="A">Administrator</option>
                  </select>
                  <small class="text-danger">{{ errors.role }}</small>
                </div>
              </div>
              <div class="col-md-12">
                <div class="info">
                  <label class="labels font-weight-bold">Status</label>
                  <select class="form-control" v-model="user.status" required>
                    <option value="0">Active</option>
                    <option value="1">Inactive</option>
                  </select>
                  <small class="text-danger">{{ errors.status }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <router-link :to="user.role == 'P' ? { name: 'parentShow' } : { name: 'administratorShow' }" class="btn btn-blue position-fixed bottom-0 end-0 m-3">
      <i class="fas fa-arrow-left"></i> {{ user.role == 'P' ? 'List of Parents' : 'List of Administrators' }}
    </router-link>
    </div>
  </template>
  
  <script>
  import { createUser, getFullName } from '@/services/dataService';
  import { showCreateSuccessMessage, showErrorMessage } from '@/services/alerts';
  
  export default {
    data() {
      return {
        user: {
          name: '',
          first_surname: '',
          second_surname: '',
          date_of_birth: '',
          gender: '',
          neighborhood: '',
          street: '',
          phone_number: '',
          photo: '',
          role: '',
          status: '',
          email: '',
          password: ''
        },
        errors: {}
      };
    },
    methods: {
        onFileChange(event) {
            const file = event.target.files[0];
            this.user.photo = file;
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                this.user.photo = e.target.result;
            };
        },
        createUser() {
            createUser(this.user)
                .then(response => {
                    showCreateSuccessMessage(this.getFullName(this.user));
                    this.user = {
                        name: '',
                        first_surname: '',
                        second_surname: '',
                        date_of_birth: '',
                        gender: '',
                        neighborhood: '',
                        street: '',
                        phone_number: '',
                        photo: '',
                        role: '',
                        status: '',
                        email: '',
                        password: ''
                    };
                    this.$router.push({ name: 'parentShow' });
                })
                .catch(error => {
                    showErrorMessage('Error creating user. Please try again later.');
                    console.error('Error creating user:', error);
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
  