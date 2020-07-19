<template>
  <div>
    <label>{{ label }}</label>
    <input
      class="form-control"
      type="email"
      :value="emailState.email"
      v-on:input="verifyEmail"
      required
    />
    <small class="text-danger">{{ emailState.error }}</small>
  </div>
</template>
<script>
export default {
  name: "EmailTextField",
  props: {
    emailState: Object,
    label: {
      default: "Email:",
      type: String
    }
  },
  methods: {
    verifyEmail(evt) {
      // eslint-disable-next-line no-useless-escape
      let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (regex.test(evt.target.value)) {
        this.$emit("change", evt.target.value, null);
      } else {
        this.$emit("change", evt.target.value, "Enter a valid email address");
      }
    }
  }
};
</script>
