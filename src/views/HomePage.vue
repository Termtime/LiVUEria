<template>
  <div id="home">
    <h1>LiVUEria</h1>
    <small>El lugar donde vue y los libros se combinan</small>
    <div class="section-divider">
      <h2 class="left">Favorites</h2>
      <div class="divider">
        <hr color="white" />
      </div>
    </div>

    <div class="section">
      <div class="card-container">
        <div class="card reactive-card" style="width: 18rem;">
          <img src="../assets/logo.png" class="card-img-top" alt="..." />
          <div class="card-body text-left">
            <h5 class="card-title text-dark">Card title</h5>
            <p class="card-text text-dark">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </div>

      <div class="r">
        <div class="left">
          <button class="btn btn-info">Vue more...</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomePage",
  components: {}
};
</script>

<style>
#home {
  background-color: #111;
  color: white;
  padding: 50px;
  display: flex;
  flex-direction: column;
}
.divider {
  /* display:flex; */
  /* background-color: white; */
  width: 100%;
  justify-content: center;
  align-content: center;
}

.section-divider {
  width: 100%;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
}

.section {
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
}

.reactive-card {
  transition-duration: 0.2s;
  display: flex;
  margin: 1%;
}

.reactive-card:hover {
  transform: scale(1.05);
}

.card-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.r {
  display: flex;
  flex-direction: row;
}
</style>
