<template>
  <div v-if="user" class="container rounded bg-white mt-5 mb-5">
    <form @submit.prevent="updateUserProfile">
          <div class="row">
              <div class="col-md-4 border-right">
                <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                  <button type="submit" class="btn btn-purple">
                    <i class="fas fa-cog"></i> Update
                  </button>
                  <img class="rounded-circle mt-5" width="150px" v-if="user && user.photo" :src="user.photo" alt="User Image">
                  <img class="rounded-circle mt-5" width="150px" v-else :src="require('@/assets/no-profile.png')" alt="No Profile Image">
                  <span class="font-weight-bold">{{ user ? getFullName(user) : 'Guest' }}</span>
                  <span class="text-black-50">{{ user ? user.email : 'guest@example.com' }}</span>
                  <br>
                <div class="col-md-12">
                    <div class="info">
                        <label class="labels font-weight-bold">Photo</label>
                        <input type="file" class="form-control" accept="image/*">
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
                              <input type="text" v-model="user.name" class="form-control" required>
                              <small class="text-danger">{{ errors.name }}</small>
                          </div>
                      </div>
                      <div class="col-md-12">
                          <div class="info">
                              <label class="labels font-weight-bold">First Surname</label>
                              <input type="text" v-model="user.first_surname" class="form-control" required>
                              <small class="text-danger">{{ errors.first_surname }}</small>
                          </div>
                      </div>
                      <div class="col-md-12">
                          <div class="info">
                              <label class="labels font-weight-bold">Secon Surname</label>
                              <input type="text" v-model="user.second_surname" class="form-control" required>
                              <small class="text-danger">{{ errors.second_surname }}</small>
                          </div>
                      </div>
                      <div class="col-md-12">
                          <div class="info">
                              <label class="labels font-weight-bold">Date of birth</label>
                              <input type="date" v-model="user.date_of_birth" class="form-control" required>
                              <small class="text-danger">{{ errors.date_of_birth }}</small>
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
                      <input type="text" v-model="user.neighborhood" class="form-control" required>
                      <small class="text-danger">{{ errors.neighborhood }}</small>
                  </div>
              </div>
              <div class="col-md-12">
                  <div class="info">
                      <label class="labels font-weight-bold">Street</label>
                      <input type="text" v-model="user.street" class="form-control" required>
                      <small class="text-danger">{{ errors.street }}</small>
                  </div>
              </div>
              <div class="col-md-12">
                  <div class="info">
                      <label class="labels font-weight-bold">Phone number</label>
                      <input type="tel" v-model="user.phone_number" class="form-control" required>
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
                    <option value=0>Active</option>
                    <option value=1>Inactive</option>
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
import { getUserById, updateUser, getFullName } from '@/services/dataService';
import { showUpdateSuccessMessage, showErrorMessage } from '@/services/alerts';
export default {
  data() {
    return {
      user: null,
      loading: false,
      errors: {}
    };
  },
  mounted() {
    const userId = this.$route.params.id;
    if (userId) {
      this.getUser(userId);
    } else {
      console.error('No user ID provided.');
    }
  },
  methods: {
    getUser(userId) {
      this.loading = true;
      getUserById(userId)
        .then(user => {
          this.user = user;
          this.loading = false;
        })
        .catch(error => {
          console.error('Error fetching user:', error);
          this.loading = false;
        });
    },
    updateUserProfile() {
    this.loading = true;
    this.clearErrors();
    const userId = this.user.id;
    const userData = {
      name: this.user.name,
      role: this.user.role,
      first_surname: this.user.first_surname,
      second_surname: this.user.second_surname,
      date_of_birth: this.user.date_of_birth,
      gender: this.user.gender,
      neighborhood: this.user.neighborhood,
      street: this.user.street,
      phone_number: this.user.phone_number,
      photo: this.user.photo,
      status: this.user.status
    };
    updateUser(userId, userData)
      .then(response => {
        console.log(userData);
        showUpdateSuccessMessage(this.getFullName(this.user));
        this.$router.push({ name: 'parentShow' });
      })
      .catch(error => {
        showErrorMessage('Error updating user. Please try again later.');
        console.error('Error updating user:', error);
        console.log(userData);
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
      }
      });
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

  