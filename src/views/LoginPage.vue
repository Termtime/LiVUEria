<template>
  <div class="col bg-super-dark">
    <div class="row center">
      <div class="loginCard bg-dark">
        <h1 class="center">Log In</h1>
        <small>To enjoy our website the most!</small>
        <hr color="white" />
        <form v-on:submit="handleSubmit">
          <EmailTextField
            :emailState="emailState"
            v-on:change="(email, error) => setEmail(email, error)"
          />
          <br />
          <PasswordField
            :passState="passState"
            v-on:change="(pass, error) => setPass(pass, error)"
          />
          <br />
          <SubmitButton
            :disabled="
              emailState.error !== null || emailState.email.length == 0
                ? true
                : false
            "
            label="Log in"
          />
        </form>
      </div>
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
        .then(() => this.$router.push("home"))
        .catch(error => {
          if (error.code === "auth/wrong-password") {
            this.passState = {
              ...this.passState,
              error: "Invalid credentials"
            };
          } else if (error.code === "auth/user-not-found") {
            this.emailState = { ...this.emailState, error: "User not found" };
          } else if (error.code === "auth/too-many-requests") {
            this.emailState = {
              ...this.emailState,
              error: "Too many attemps, try again later"
            };
          } else {
            this.emailState = { ...this.emailState, error: error.code };
          }
        });
    }
  }
};
</script>
<style scoped>
.loginCard {
  width: 400px;
  margin: 100px;
  padding: 20px;
  text-align: left;
  border-radius: 5px;
}
</style>
