<template>
    <section>
      <div>
        <div class="row d-flex align-items-center justify-content-center h-100">
          <div class="col-md-8 col-lg-7 col-xl-6">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              class="img-fluid" alt="Phone image">
          </div>
          <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form>
              <!-- Email input -->
              <div class="form-outline mb-4">
                <input type="email" id="form1Example13" class="form-control form-control-lg" />
                <label class="form-label" for="form1Example13">Email address</label>
              </div>
  
              <!-- Password input -->
              <div class="form-outline mb-4">
                <input type="password" id="form1Example23" class="form-control form-control-lg" />
                <label class="form-label" for="form1Example23">Password</label>
              </div>
  
              <div class="d-flex justify-content-around align-items-center mb-4">
                <!-- Checkbox -->
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="form1Example3" checked />
                  <label class="form-check-label" for="form1Example3"> Remember me </label>
                </div>
                <a href="#!">Forgot password?</a>
              </div>
  
              <!-- Submit button -->
              <button type="submit" class="btn btn-primary btn-lg btn-block">Sign in</button>
  
              <div class="divider d-flex align-items-center my-4">
                <p class="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
              </div>
  
              <!-- Sign in with Google button -->
              <a class="btn btn-primary btn-lg btn-block" style="background-color: #dd4b39" href="#!"
                role="button">
                <i class="fab fa-google me-2"></i>Continue with Google
              </a>
  
            </form>
          </div>
        </div>
      </div>
    </section>
  </template>
  
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
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
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