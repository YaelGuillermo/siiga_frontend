<template>
  <BarForGuest>
    <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 text-center">
        <img src="@/assets/logo.png" alt="Imagen del colegio" class="img-fluid">
      </div>
      <div class="col-md-6 mt-4">
        <h2 class="mb-3">Bienvenido a [Nombre del colegio]</h2>
        <p>Somos una institución educativa comprometida con la formación integral de nuestros alumnos.</p>
        <div class="d-grid gap-2">
          <router-link to="/login" class="btn btn-primary btn-lg">Iniciar sesión</router-link>
          <router-link to="/signup" class="btn btn-secondary btn-lg">Registrarse</router-link>
        </div>
      </div>
    </div>
  </div>
  </BarForGuest>
</template>

<script>
  import BarForGuest from '@/components/BarForGuest.vue';
  export default {
    components: {
      BarForGuest
    }
  }
</script>
