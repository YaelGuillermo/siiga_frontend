<template>
  <BarForGuest>
    <div>
    <div class="row d-flex align-items-center justify-content-center h-100">
      <div class="col-md-8 col-lg-7 col-xl-6 text-center mb-4">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          class="img-fluid" alt="Phone image">
      </div>
      <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
        <form @submit.prevent="login"> 
          <h2 class="text-center mb-4">Login</h2>
          <!-- Email input -->
          <div class="form-outline mb-4">
            <input type="email" v-model="email" class="form-control form-control-lg" placeholder="email" required />
              <label class="form-label">Email address</label>
          </div>

          <!-- Password input -->
          <div class="form-outline mb-2">
            <input type="password" v-model="password" class="form-control form-control-lg" placeholder="password" required />
            <label class="form-label">Password</label>
          </div>

          <!-- Forgot password -->
          <!-- Register button -->
          <div class="mt-1 text-center mb-4">
            <p class="mb-0">Forgot your password? <a href="/recoverPassword" class="text-decoration-none">Recover it!</a></p>
          </div>

          <!-- Submit button -->
          <div class="text-center mb-4">
            <button type="submit" class="btn btn-primary btn-lg" style="background-color: #3F3D56;">Sign in</button>
          </div>

          <div class="divider d-flex align-items-center my-4">
            <p class="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
          </div>

          <div class="row justify-content-center">
            <!-- Continue with Google 
            <div class="col-6 mb-3 text-center">
              <a class="btn btn-primary btn-lg btn-block" style="background-color: #dd4b39"
                role="button">
                <i class="fab fa-google me-2"></i>Continue with Google
              </a>
            </div> -->

            <!-- Register Now -->
            <div class="col-6 text-center">
              <a class="btn btn-primary btn-lg btn-block" style="background-color: #402368" href="/signup"
                role="button">
                <i class="fas fa-user-plus me-2" style="color: #ffffff;"></i> Register Now
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
import { getUserByEmailAndPassword } from '@/services/authService';
import BarForGuest from '@/components/BarForGuest.vue';
import { showErrorMessage } from '@/services/alerts';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  components: {
    BarForGuest
  },
  methods: {
    async login() {
      try {
        const response = await getUserByEmailAndPassword(this.email, this.password);
        console.log(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));

        if (response.user.role == 'A') {
          this.$router.push({ name: 'studentInactiveShow' });
        } else if (response.user.role == 'P') {
          this.$router.push({ name: 'childrenShow' });
        }
      } catch (error) {
        console.log(error);
        showErrorMessage("Login failed. Incorrect email and/or password.");
      }
    }
  }
}
</script>

