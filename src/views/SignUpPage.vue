<template>
  <div class="col bg-super-dark">
    <div class="row center">
      <div class="loginCard bg-dark">
        <h1 class="center">Regístrate</h1>
        <small>Para disfrutar nuestro sitio al máximo</small>
        <hr color="white" />
        <form v-on:submit="handleSubmit">
          <EmailTextField
            :emailState="emailState"
            v-on:change="(email, error) => setEmail(email, error)"
          />
          <br />
          <PasswordField
            :passState="passState"
            label="Contraseña:"
            v-on:change="pass => setPass(pass)"
          />
          <br />
          <PasswordField
            :passState="passState2"
            v-on:change="pass => setPass2(pass)"
            label="Confirma la contraseña:"
          />
          <br />
          <SubmitButton
            :disabled="
              emailState.error !== null || emailState.email.length == 0
                ? true
                : false
            "
            label="Regístrate"
          />
        </form>
      </div>
    </div>
    <div class="row center">
      <p style="margin:0; line-height:40px; padding-right:20px;">
        ¿Ya tienes una cuenta?
      </p>
      <button class="btn btn-info my-2 my-sm-0" @click="$router.push('signin')">
        Inicia Sesión
      </button>
    </div>
  </div>
</template>
<script>
import EmailTextField from "../components/EmailTextField.vue";
import PasswordField from "../components/PasswordField.vue";
import SubmitButton from "../components/SubmitButton.vue";

export default {
  name: "SignUpPage",
  props: ["firebase"],
  components: {
    EmailTextField,
    PasswordField,
    SubmitButton
  },
  data: function() {
    return {
      emailState: { email: "", error: null },
      passState: { pass: "", error: null },
      passState2: { pass: "", error: null }
    };
  },
  methods: {
    setEmail(email, error) {
      this.emailState = { email, error };
    },
    checkIsPassInvalid({
      p1 = this.passState.pass,
      p2 = this.passState2.pass
    }) {
      if (p1 !== "" && p2 !== "" && p1 === p2) {
        this.passState = { pass: p1, error: null };
        this.passState2 = { pass: p2, error: null };
      } else {
        this.passState = {
          pass: p1,
          error:
            "La contraseña no debe ser vacia y ambos campos deben ser iguales"
        };
        this.passState2 = {
          pass: p2,
          error:
            "La contraseña no debe ser vacia y ambos campos deben ser iguales"
        };
      }
    },
    setPass(pass) {
      this.checkIsPassInvalid({ p1: pass });
    },
    setPass2(pass) {
      this.checkIsPassInvalid({ p2: pass });
    },
    handleSubmit(evt) {
      evt.preventDefault();
      this.firebase
        .loginWithEmailPassword(this.emailState.email, this.passState.pass)
        .then(() => this.$router.push("home"))
        .catch(error => {
          if (error.code === "auth/wrong-password") {
            this.passState = {
              ...this.passState,
              error: "Credenciales invalidas"
            };
          } else if (error.code === "auth/user-not-found") {
            this.emailState = {
              ...this.emailState,
              error: "Usuario no encontrado"
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
  }
};
</script>
