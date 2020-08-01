<template>
  <div id="carousel" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-slide-to="0" data-target="#carousel" class="active"></li>
      <li data-slide-to="1" data-target="#carousel"></li>
      <li data-slide-to="2" data-target="#carousel"></li>
    </ol>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="../assets/caroussel/1.jpeg" class="d-block w-100" alt="..." />
        <div class="carousel-caption  d-none d-md-block font-weight-bold">
          <h1>LiVUEria</h1>
          <h3>Donde Vue y los libros se encuentran</h3>
        </div>
      </div>
      <div class="carousel-item">
        <img src="../assets/caroussel/2 s.jpg" class="d-block w-100" alt="..." />
        <div class="carousel-caption d-none d-md-block font-weight-bold">
          <h1>Explora todos los detalles</h1>
          <h3>Busca entre cientos de libros</h3>
        </div>
      </div>
      <div class="carousel-item">
        <img src="../assets/caroussel/3.jpg" class="d-block w-100" alt="..." />
        <div class="carousel-caption d-none d-md-block font-weight-bold">
          <h1>Unete hoy</h1>
          <h3>! Mantén tus favoritos en tu librería personal !</h3>
        </div>
      </div>
    </div>
    <a class="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carousel" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>
<script>
export default {
  name: "Carousel"
};
</script>
<style>
.carousel-inner > .carousel-item > img {
  height: 630px;
  object-fit: cover;
}

.carousel-caption {
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  font-size: 40px;
}

#carousel {
  height: 630px;
}
</style>
