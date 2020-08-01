<template>
  <div
    class="text-left text-dark col"
    v-if="libro !== null || libro !== undefined"
  >
    <FormularioLibro :firebase="firebase" :libro="libro" :editar="true" />
  </div>
</template>
<script>
import FormularioLibro from "../components/FormularioLibro.vue";

const jq = require("jquery");
window.jq = jq;
export default {
  name: "FormularioEditarLibro",
  components: {
    FormularioLibro
  },
  props: ["libro", "firebase"]
};
</script>
