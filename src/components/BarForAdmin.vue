<template>
    <div class="wrapper">
        <!-- Sidebar  -->
        <nav id="sidebar">
            <router-link :to="{ name: 'home' }" class="sidebar-link">
                <div class="sidebar-header">
                    <img src="../assets/logo.png" alt="Logo">
                </div>
            </router-link>

            <ul class="list-unstyled components">
                <!--
                <li class="active">
                    <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Home</a>
                    <ul class="collapse list-unstyled" id="homeSubmenu">
                        <li>
                            <a href="#">Home 1</a>
                        </li>
                        <li>
                            <a href="#">Home 2</a>
                        </li>
                        <li>
                            <a href="#">Home 3</a>
                        </li>
                    </ul>
                </li> -->
                <li>
    <router-link :to="{ name: 'studentActiveShow' }" class="sidebar-link">
        <i class="fas fa-user-graduate"></i> Students
    </router-link>
</li>
<li>
    <router-link :to="{ name: 'studentInactiveShow' }" class="sidebar-link">
        <i class="fas fa-file-alt"></i> Requests
    </router-link>
</li>
<li>
    <router-link :to="{ name: 'administratorShow' }" class="sidebar-link">
        <i class="fas fa-user-tie"></i> Admins
    </router-link>
</li>
<li>
    <router-link :to="{ name: 'parentShow' }" class="sidebar-link">
        <i class="fas fa-user-friends"></i> Parents
    </router-link>
</li>
<li>
    <router-link :to="{ name: 'paymentShow' }" class="sidebar-link">
        <i class="fas fa-money-bill-wave"></i> Payments
    </router-link>
</li>


            </ul>

            <ul class="list-unstyled CTAs">
                <li>
                    <a href="https://bootstrapious.com/tutorial/files/sidebar.zip" class="download">Documentation</a>
                </li>
                <li>
                    <a href="https://bootstrapious.com/p/bootstrap-sidebar" class="article">Email</a>
                </li>
            </ul>
        </nav>

        <!-- Page Content  -->
        <div id="content">

            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">

                    <button type="button" id="sidebarCollapse" class="btn ml-auto">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <ul class="nav navbar-nav">
                        <li class="nav-item active">
                                <a class="nav-link" href="#">My Profile</a>
                            </li>
                        <li class="nav-item active">
                            <a class="nav-link" href="#" id="sign-out-link">Sign Out</a>
                        </li>
                        </ul>
                </div>
            </nav>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { showLogoutSuccessMessage, showErrorMessage } from '@/services/alerts';
import { logoutUser } from '@/services/authService';
import { getFullName } from '@/services/dataService';

export default {
  mounted() {
    $('#sign-out-link').click(this.handleLogout);
    $('#sidebarCollapse').click(this.toggleSidebar);
  },
  methods: {
    async handleLogout(event) {
      event.preventDefault();
      try {
        await logoutUser();
        showLogoutSuccessMessage(getFullName(this.user));
        localStorage.removeItem('user');
        window.location.href = '/';
      } catch (error) {
        console.log(error);
        showErrorMessage("Error logging out. Please try again later");
      }
    },
    toggleSidebar() {
      $('#sidebar').toggleClass('active');
      $(this).toggleClass('active');
    },
    getFullName
  }
};
</script>

<style>
/*
    DEMO STYLE
*/

body {
    /*font-family: 'Poppins', sans-serif;*/
    background: #fafafa; /* fafafa*/
    /*margin: 100px;*/
}

p {
    /*font-family: 'Poppins', sans-serif;
    font-size: 1.1em;
    font-weight: 300;*/
    line-height: 1.7em;
    color: #999;
}

a,
a:hover,
a:focus {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s;
}

.navbar {
    background: #fff;
    border: none;
    border-radius: 0;
    margin-bottom: 10px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.navbar-btn {
    box-shadow: none;
    outline: none !important;
    border: none;
}

.line {
    width: 100%;
    height: 1px;
    border-bottom: 1px dashed #ddd;
    margin: 40px 0;
}

/* ---------------------------------------------------
    SIDEBAR STYLE
----------------------------------------------------- */

.wrapper {
    display: flex;
    width: 100%;
    align-items: stretch;
}

#sidebar {
    min-width: 250px;
    max-width: 250px;
    background: #2d184b; /*#7386D5*/
    color: #fff;
    transition: all 0.3s;
}

#sidebar.active {
    margin-left: -250px;
}

#sidebar .sidebar-header {
    padding: 5px;
    background: #241638;
    display: flex;
    align-items: center;
    justify-content: center;
}

#sidebar .sidebar-header img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ajusta la imagen al tamaño del contenedor sin perder su relación de aspecto */
}

#sidebar ul.components {
    padding: 15px 0; /* Botones del Bar */
    border-bottom: 2px solid #241638;
}

#sidebar ul p {
    color: #fff;
    padding: 10px;
}

#sidebar ul li a {
    padding: 10px;
    font-size: 1.1em;
    display: block;
}

#sidebar ul li a:hover {
    color: #2d184b;
    background: #fff;
}

#sidebar ul li.active>a,
a[aria-expanded="true"] {
    color: #fff;
    background: #2d184b;
}

a[data-toggle="collapse"] {
    position: relative;
}

.dropdown-toggle::after {
    display: block;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
}

ul ul a {
    font-size: 1em !important;
    padding-left: 30px !important;
    background: #6d7fcc;
}

ul.CTAs {
    padding: 5px;
}

ul.CTAs a {
    text-align: center;
    font-size: 0.9em !important;
    display: block;
    border-radius: 5px;
    margin-bottom: 5px;
}

a.download {
    background: #fff;
    color: #2d184b;
}

a.article,
a.article:hover {
    background: #402368 !important;
    color: #fff !important;
}

/* ---------------------------------------------------
    CONTENT STYLE
----------------------------------------------------- */

#content {
    width: 100%;
    padding: 20px;
    min-height: 100vh;
    transition: all 0.3s;
    background-color: #dfc8ff;
}

/* ---------------------------------------------------
    ROUTER LINK
----------------------------------------------------- */

.sidebar-link {
    color: #fff; 
    text-decoration: none;
    cursor: pointer; 
}

.sidebar-link:hover {
    color: #f8f9fa; 
}

/* ---------------------------------------------------
    MEDIAQUERIES
----------------------------------------------------- */

@media (max-width: 768px) {
    #sidebar {
        margin-left: -250px;
    }
    #sidebar.active {
        margin-left: 0;
    }
    #sidebarCollapse span {
        display: none;
    }
}
</style>