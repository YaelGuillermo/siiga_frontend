<template>
  <BarForGuest>
    <div>
      <div class="row d-flex align-items-center justify-content-center h-100">
        <div class="col-md-8 col-lg-7 col-xl-6 text-center mb-4">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            class="img-fluid" alt="Phone image">
        </div>
        <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
          <form>
            <h2 class="text-center mb-4">Recover Password</h2>
            <!-- Email input -->
            <div class="form-outline mb-4">
              <input type="email" id="form1Example13" class="form-control form-control-lg" />
              <label class="form-label" for="form1Example13">Email address</label>
            </div>
  
            <!-- Submit button -->
            <div class="text-center mb-4">
              <button type="submit" class="btn btn-primary btn-lg" style="background-color: #3F3D56;">Recover Password</button>
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
  import BarForGuest from '@/components/BarForGuest.vue';
  export default {
    components: {
      BarForGuest
    }
  }
</script>
