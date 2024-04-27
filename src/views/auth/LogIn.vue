<template>
  <div>
    <div class="row d-flex align-items-center justify-content-center h-100">
      <div class="col-md-8 col-lg-7 col-xl-6 text-center mb-4">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          class="img-fluid" alt="Phone image">
      </div>
      <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
        <form>
          <h2 class="text-center mb-4">Login</h2>
          <!-- Email input -->
          <div class="form-outline mb-4">
            <input type="email" id="form1Example13" class="form-control form-control-lg" />
            <label class="form-label" for="form1Example13">Email address</label>
          </div>

          <!-- Password input -->
          <div class="form-outline mb-2">
            <input type="password" id="form1Example23" class="form-control form-control-lg" />
            <label class="form-label" for="form1Example23">Password</label>
          </div>

          <!-- Forgot password -->
          <!-- Register button -->
          <div class="mt-1 text-center mb-4">
            <p class="mb-0">Forgot your password? <a href="#!" class="text-decoration-none">Recover it!</a></p>
          </div>

          <!-- Submit button -->
          <div class="text-center mb-4">
            <button type="submit" class="btn btn-primary btn-lg" style="background-color: #3F3D56;">Sign in</button>
          </div>

          <div class="divider d-flex align-items-center my-4">
            <p class="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
          </div>

          <div class="row justify-content-center">
            <!-- Continue with Google -->
            <div class="col-6 mb-3 text-center">
              <a class="btn btn-primary btn-lg btn-block" style="background-color: #dd4b39" href="#!"
                role="button">
                <i class="fab fa-google me-2"></i>Continue with Google
              </a>
            </div>

            <!-- Register Now -->
            <div class="col-6 text-center">
              <a class="btn btn-primary btn-lg btn-block" style="background-color: #402368" href="#!"
                role="button">
                <i class="fas fa-user-plus me-2" style="color: #ffffff;"></i> Register Now
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
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


<!--


<template>
    <div class="container">
        <h2 class="title">Sign in</h2>
        <div class="screen">
            <div class="screen__content">
                <form class="login">
                    <div class="login__field">
                        <label for="email" class="login__label">Email</label>
                        <i class="login__icon fas fa-user"></i>
                        <input type="text" id="email" class="login__input" placeholder="Email">
                    </div>
                    <div class="login__field">
                        <label for="password" class="login__label">Password</label>
                        <i class="login__icon fas fa-lock"></i>
                        <input type="password" id="password" class="login__input" placeholder="Password">
                    </div>
                    <button class="button login__submit">
                        <span class="button__text">Log In Now</span>
                        <i class="button__icon fas fa-chevron-right"></i>
                    </button>   
                    <div class="signup-prompt">
                        <p>Don´t have an account? <a href="#">Sign Up</a></p>
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
            <div class="screen__background">
                <span class="screen__background__shape screen__background__shape4"></span>
                <span class="screen__background__shape screen__background__shape3"></span>        
                <span class="screen__background__shape screen__background__shape2"></span>
                <span class="screen__background__shape screen__background__shape1"></span>
            </div>      
        </div>
    </div>
</template>

<style src="../styles/auth.css"></style>
-->
