<template>
  <div class="column center bg-super-dark">
    <Carousel />
    <div class="r center">
      <div class="loginCard bg-dark">
        <div class="column center">
          <div class="r center">
            <p>Explora nuestro contenido</p>
          </div>
          <div class="r center">
            <button class="btn btn-primary" @click="$router.push('library')">
              Ir a la libreria
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from "../components/Caroussel.vue";

export default {
  name: "LandingPage",
  components: {
    Carousel
  }
};
</script>
