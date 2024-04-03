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
