<template>
  <div class="col bg-super-dark">
    <div class="row center">
      <div class="loginCard bg-dark">
        <h1 class="center">Sign up</h1>
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
            v-on:change="pass => setPass(pass)"
          />
          <br />
          <PasswordField
            :passState="passState2"
            v-on:change="pass => setPass2(pass)"
            label="Confirm password:"
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
    <div class="row center">
      <p style="margin:0; line-height:40px; padding-right:20px;">
        Already have an account?
      </p>
      <button class="btn btn-info my-2 my-sm-0" @click="$router.push('signin')">
        Sign In
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
          error: "Password must not be empty and both fields must match"
        };
        this.passState2 = {
          pass: p2,
          error: "Password must not be empty and both fields must match"
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
