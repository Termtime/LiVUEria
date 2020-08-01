<template>
  <div class="text-left text-dark col">
    <FormularioLibro :firebase="firebase" :editar="false" />
  </div>
</template>
<script>
import FormularioLibro from "../components/FormularioLibro.vue";
const jq = require("jquery");
window.jq = jq;

export default {
  name: "FormularioAgregarLibro",
  components: {
    FormularioLibro
  },
  props: ["firebase"],
};
</script>
