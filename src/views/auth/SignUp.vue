<template>
  <BarForGuest>
    <div>
      <div class="row d-flex align-items-center justify-content-center h-100">
        <div class="col-md-8 col-lg-7 col-xl-6 text-center mb-4">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            class="img-fluid" alt="Phone image">
        </div>
        <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
          <form @submit.prevent="createUser">
            <h2 class="text-center mb-4">Sign up</h2>
            <!-- Email input -->
            <div class="form-outline mb-4">
              <small class="text-danger">{{ errors.email }}</small>
              <input type="email" v-model="user.email" class="form-control form-control-lg" placeholder="email" required />
              <label class="form-label">Email address</label>
            </div>
  
            <!-- Password input -->
            <div class="form-outline mb-2">
              <small class="text-danger">{{ errors.password }}</small>
              <input type="password" v-model="user.password" class="form-control form-control-lg" placeholder="password" required />
              <label class="form-label">Password</label>
            </div>
  
            <!-- Confirm Password input -->
            <div class="form-outline mb-2">
              <small class="text-danger">{{ errors.confirmPassword }}</small>
              <input type="password" v-model="confirmPassword" class="form-control form-control-lg" placeholder="confirm password" required />
              <label class="form-label">Confirm Password</label>
            </div>
  
            <!-- Submit button -->
            <div class="text-center mb-4">
              <button type="submit" class="btn btn-primary btn-lg" style="background-color: #3F3D56;">Sign up</button>
            </div>
  
            <div class="divider d-flex align-items-center my-4">
              <p class="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
            </div>
  
            <div class="row justify-content-center">
            <!-- Continue with Google
            <div class="col-6 mb-3 text-center">
              <a class="btn btn-primary btn-lg btn-block" style="background-color: #dd4b39" href="#!"
                role="button">
                <i class="fab fa-google me-2"></i>Continue with Google
              </a>
            </div> -->

            <!-- Register Now -->
            <div class="col-6 text-center">
              <a class="btn btn-primary btn-lg btn-block" style="background-color: #402368" href="/"
                role="button">
                <i class="fas fa-user" style="color: #ffffff;"></i> Sign in
              </a>
            </div>
          </div>
          </form>
        </div>
      </div>
    </div>
  </BarForGuest>
    
  </template>
  
  <style>
    .divider:after,
    .divider:before {
      content: "";
      flex: 1;
      height: 1px;
      background: #eee;
    }
  </style>
  
  <script>
  import { createUser } from '@/services/dataService';
  import { showCreateSuccessMessage, showErrorMessage } from '@/services/alerts';
  import BarForGuest from '@/components/BarForGuest';
  
  export default {
    data() {
      return {
        user: {
          name: 'Name',
          first_surname: 'First surname',
          second_surname: 'Second surname',
          date_of_birth: '2000/01/01',
          gender: 'U',
          neighborhood: 'neighborhood',
          street: 'Street',
          phone_number: '664 000 00 00',
          photo: '',
          role: 'P',
          status: 1,
          email: '',
          password: ''
        },
        confirmPassword: '',
        errors: {}
      };
    },
      components: {
        BarForGuest
      },
    methods: {
        createUser() {
          if (this.user.password != this.confirmPassword) {
            this.errors.confirmPassword = "Passwords don't match";
            return; // Detener el proceso de registro si las contraseñas no coinciden
          }
            createUser(this.user)
                .then(response => {
                    showCreateSuccessMessage(this.user.email);
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
                    this.$router.push({ name: 'login' });
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
    }}
  </script>
  
<!--
<script>
    export default {
        name: 'Signup',
        data() {
            return {
                name: '',
                first_surname: '',
                second_surname: '',
                date_of_birth: '',
                gender: '',
                neighborhood: '',
                street: '',
                phone_number: '',
                email: '',
                password: '',
                role: ''
            }
        },
        mounted() {
            this.role = 'Parent';
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
                const formData = {
                    name: this.name,
                    first_surname: this.first_surname,
                    second_surname: this.second_surname,
                    date_of_birth: this.date_of_birth,
                    gender: this.gender,
                    neighborhood: this.neighborhood,
                    street: this.street,
                    phone_number: this.phone_number,
                    email: this.email,
                    password: this.password,
                    role: this.role 
                };
                console.log('Form Data:', formData);            }
        }
    }
</script>

<template>
    <div class="container">
        <h2 class="title">Sign Up</h2>
        <div class="screen">
            <div class="screen__content">
                <form class="login" @submit.prevent="handleSubmit">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="login__field">
                                <label for="text" class="login__label"> Name </label>
                                <input type="text" class="login__input" v-model="name" placeholder="Name" required/>
                            </div>

                            <div class="login__field">
                                <label for="text" class="login__label"> First Surname </label>
                                <input type="text" class="login__input" v-model="first_surname" placeholder="First surname" required/>
                            </div>

                            <div class="login__field">
                                <label for="text" class="login__label"> Second Surname </label>
                                <input type="text" class="login__input" v-model="second_surname" placeholder="Second surname" required/>
                            </div>

                            <div class="login__field">
                                <label for="text" class="login__label"> Neighborhood</label>
                                <input type="text" class="login__input" v-model="neighborhood" placeholder="Neighborhood" required />
                            </div>

                            <div class="login__field">
                                <label for="text" class="login__label"> Email </label>
                                <input type="email" class="login__input" v-model="email" placeholder="Email" required/>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="login__field">
                                <label for="text" class="login__label">Street</label>
                                <input type="text" class="login__input" v-model="street" placeholder="Street" required />
                            </div>

                            <div class="login__field">
                                <label for="text" class="login__label">Gender</label>
                                <select class="login__input" v-model="gender" required>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option><option value="U">Undefined</option>
                                </select>
                            </div>

                            <div class="login__field">
                                <label for="text" class="login__label"> Date of birth </label>
                                <input type="date" class="login__input" v-model="date_of_birth" required/>
                            </div>

                            <div class="login__field">
                                <label for="text" class="login__label">Phone number</label>
                                <input type="tel" class="login__input" v-model="phone_number" placeholder="Number phone" required />
                            </div>

                            <div class="login__field">
                                <label for="text" class="login__label"> Password </label>
                                <input type="password" class="login__input" v-model="password" placeholder="Password" required/>
                            </div> 
                        </div>
                    </div>

                    <button class="button login__submit">
                        <span class="button__text">Sign Up Now</span>
                        <i class="button__icon fas fa-chevron-right"></i>
                    </button>   
                    <div class="signup-prompt">
                        <p>You have an account? <a href="#">Sign In</a></p>
                    </div>             
                </form>
                <div class="social-login">
                    <h3>log in via</h3>
                    <div class="social-icons">
                        <a href="#" class="social-login__icon fab fa-instagram"></a>
                        <a href="#" class="social-login__icon fab fa-facebook"></a>
                        <a href="#" class="social-login__icon fab fa-twitter"></a>
                    </div>
                </div>
            </div>      
        </div>
    </div>
</template>

<style src="../styles/auth.css"></style>
-->