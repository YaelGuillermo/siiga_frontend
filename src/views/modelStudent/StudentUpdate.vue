<template>
    <div v-if="student" class="container rounded bg-white mt-5 mb-5">
      <form @submit.prevent="updateStudentProfile">
        <div class="row">
          <div class="col-md-4 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
              <button type="submit" class="btn btn-purple">
                <i class="fas fa-cog"></i> Update
              </button>
              <img class="rounded-circle mt-5" width="150px" v-if="student && student.photo" :src="student.photo" alt="Student Image">
            <img class="rounded-circle mt-5" width="150px" v-else :src="require('@/assets/no-profile.png')" alt="No Profile Image">
            <span class="font-weight-bold">{{ getFullName(student) }}</span>
            <br>
            <div class="col-md-12">
                <div class="info">
                    <label class="labels font-weight-bold">Note</label>
                    <textarea class="form-control" v-model="student.note" rows="4"></textarea>
                    <small class="text-danger">{{ errors.note }}</small>
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
                    <input type="text" v-model="student.name" class="form-control" required>
                    <small class="text-danger">{{ errors.name }}</small>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="info">
                    <label class="labels font-weight-bold">First Surname</label>
                    <input type="text" v-model="student.first_surname" class="form-control" required>
                    <small class="text-danger">{{ errors.first_surname }}</small>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="info">
                    <label class="labels font-weight-bold">Second Surname</label>
                    <input type="text" v-model="student.second_surname" class="form-control" required>
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
                    <input type="text" v-model="student.curp" class="form-control" required>
                    <small class="text-danger">{{ errors.curp }}</small>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="info">
                    <label class="labels font-weight-bold">Parent</label>
                    <select class="form-control" v-model="student.user_id" @change="getUserDetails" required>
                      <option v-for="user in users" :key="user.id" :value="user.id">{{ getFullName(user) }}</option>
                    </select>
                    <small class="text-danger">{{ errors.user_id }}</small>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="info">
                    <label class="labels font-weight-bold">Parent</label>
                    <input type="text" v-model="student.user.name" class="form-control" required>
                    <small class="text-danger">{{ errors.user_id }}</small>
                  </div>
                </div>
                <div class="col-md-12">
                <div class="info">
                  <label class="labels font-weight-bold">Status</label>
                  <select class="form-control" v-model="student.status" required>
                    <option value='Active'>Active</option>
                    <option value='Inactive'>Inactive</option>
                    <option value='Under review'>Under review</option>
                  </select>
                  <small class="text-danger">{{ errors.status }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <router-link :to="student.status != 'Active' ? { name: 'studentInactiveShow' } : { name: 'studentActiveShow' }" class="btn btn-blue position-fixed bottom-0 end-0 m-3">
      <i class="fas fa-arrow-left"></i> {{ student.status != 'Active' ? 'Student Requests' : 'Student List' }}
    </router-link>
    </div>
  </template>
  
  <script>
  import { getStudentById, updateStudent, getFullName, getUsers } from '@/services/dataService';
  import { showUpdateSuccessMessage, showErrorMessage } from '@/services/alerts';
  
  export default {
    data() {
      return {
        student: null,
        loading: false,
        errors: {},
        users: null,
      };
    },
    mounted() {
      const studentId = this.$route.params.id;
      if (studentId) {
        this.getStudent(studentId);
      } else {
        console.error('No student ID provided.');
      }
      this.getUsers();
    },
    methods: {
      getUsers() {
    getUsers()
          .then(users => {
            this.users = users;
            this.loading = false;
          })
          .catch(error => {
            console.error('Error fetching users:', error);
            this.loading = false;
          })},
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
      updateStudentProfile() {
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
  