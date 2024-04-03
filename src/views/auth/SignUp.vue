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
