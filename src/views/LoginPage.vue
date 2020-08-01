<template>
  <div class="col bg-super-dark">
    <div class="r center">
      <div class="loginCard bg-dark">
        <h1 class="center">Inicia Sesión</h1>
        <small>Para acceder a tu contenido</small>
        <hr color="white" />
        <form v-on:submit="handleSubmit">
          <EmailTextField
            v-bind:emailState="emailState"
            v-on:change="(email, error) => setEmail(email, error)"
          />
          <br />
          <PasswordField
            :passState="passState"
            label="Contraseña:"
            v-on:change="(pass, error) => setPass(pass, error)"
          />
          <br />
          <SubmitButton
            :disabled="
              emailState.error !== null || emailState.email.length == 0
                ? true
                : false
            "
            label="Inicia Sesión"
          />
        </form>
      </div>
    </div>
    <div class="row center">
      <p style="margin:0; line-height:40px; padding-right:20px;">
        ¿No tienes una cuenta?
      </p>
      <button class="btn btn-info my-2 my-sm-0" @click="$router.push('signup')">
        Regístrate
      </button>
    </div>
  </div>
</template>
<script>
import EmailTextField from "../components/EmailTextField.vue";
import PasswordField from "../components/PasswordField.vue";
import SubmitButton from "../components/SubmitButton.vue";

export default {
  name: "LoginPage",
  data: function() {
    return {
      emailState: { email: "", error: null },
      passState: { pass: "", error: null }
    };
  },
  props: ["firebase"],
  components: {
    EmailTextField,
    PasswordField,
    SubmitButton
  },
  methods: {
    setEmail(email, error) {
      this.emailState = { email, error };
    },
    setPass(pass, error) {
      this.passState = { pass, error };
    },
    handleSubmit(evt) {
      evt.preventDefault();
      this.firebase
        .loginWithEmailPassword(this.emailState.email, this.passState.pass)
        .catch(error => {
          if (error.code === "auth/wrong-password") {
            this.passState = {
              ...this.passState,
              error: "Credenciales invalidas."
            };
          } else if (error.code === "auth/user-not-found") {
            this.emailState = {
              ...this.emailState,
              error: "Usuario no encontrado."
            };
          } else if (error.code === "auth/too-many-requests") {
            this.emailState = {
              ...this.emailState,
              error: "Demasiados intentos fallidos, intenta más tarde."
            };
          } else {
            this.emailState = { ...this.emailState, error: error.code };
          }
        });
    }
  },
  mounted() {
    this.unsubListener = this.firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.$router.push("/favorites");
      }
    });
  },
  beforeDestroy() {
    //desuscribir el listener para evitar memory leaks y errores
    this.unsubListener();
  }
};
</script>
