<template>
  <button type="submit" class="btn btn-primary" :disabled="disabled">
    {{ label }}
  </button>
</template>
<script>
export default {
  name: "SubmitButton",
  props: ["label", "disabled"]
};
</script>
