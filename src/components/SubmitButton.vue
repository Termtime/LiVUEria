<template>
  <button type="submit" class="btn btn-primary" v-bind:disabled="disabled">
    {{ label }}
  </button>
</template>
<script>
export default {
  name: "SubmitButton",
  props: ["label", "disabled"]
};
</script>
