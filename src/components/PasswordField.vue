<template>
  <div>
    <label>{{ label }}</label>
    <input
      class="form-control"
      type="password"
      v-on:input="handleInput"
      :value="passState.pass"
    />
    <small class="text-danger">{{ passState.error }}</small>
  </div>
</template>
<script>
export default {
  name: "PasswordField",
  props: {
    passState: Object,
    label: {
      default: "Password:",
      type: String
    }
  },
  methods: {
    handleInput(evt) {
      this.$emit("change", evt.target.value);
    }
  }
};
</script>
