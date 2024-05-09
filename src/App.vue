<script>
import BarForGuest from './components/BarForGuest.vue';

export default {
  components: {
    BarForGuest
  }
};
</script>

<template>
  <router-view/>
</template>


<style is:global>
@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap');

* {
  font-family: "Comfortaa", sans-serif;
  font-size: 1rem;
  font-optical-sizing: auto;
  /*font-weight: <weight>;
  font-style: normal;*/
}

.table-group-divider {
  border-bottom: 0.01px #2d184b; /* Cambia el color de las líneas divisorias entre filas a blanco */
}

.btn {
    background-color: #2d184b; /* Fondo transparente */
    border-radius: 9ch; /* Hace el botón circular */
    border-color: 2px solid #2d184b; /* Color del borde */
    color: white;
    text-decoration: none; /* Elimina el subrayado del texto */
    padding: 5px;; /* Ajusta el relleno del botón según sea necesario */
    display: inline-block; /* Hace que el botón se comporte como un elemento en línea */
}

.btn:hover {
    background-color: #BA68C8; /* Cambia el color de fondo al hacer hover */
    border-color: #BA68C8; /* Cambia el color del borde al hacer hover */
    color: white; /* Cambia el color del texto al hacer hover */
}

.pagination-wrapper .pagination .page-item .page-link {
    color: #fff; /* Color de texto de los números */
    background-color: #402368; /* Color de fondo de los botones */
    border-color: #fff; /* Color del borde de los botones */
}

.pagination-wrapper .pagination .page-item.active .page-link {
    background-color: #fff; /* Color de fondo del botón activo */
    color: #402368;
    border-color: #402368; /* Color del borde del botón activo */
}

.pagination-wrapper .pagination .page-item.disabled .page-link {
  border-color: #fff;  
  color: #fff; /* Color de texto de los botones deshabilitados */
}

.pagination-wrapper .pagination .page-link:focus,
.pagination-wrapper .pagination .page-link:hover {
    color: #fff; /* Color de texto al pasar el cursor sobre los botones */
    background-color: #402368; /* Color de fondo al pasar el cursor sobre los botones */
    border-color: #402368; /* Color del borde al pasar el cursor sobre los botones */
}

</style>