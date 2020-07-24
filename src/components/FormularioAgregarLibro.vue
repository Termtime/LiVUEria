<template>
  <div class="text-left text-dark col">
    <form v-on:submit="handleBookAdd">
      <label for="Titulo">Titulo</label>
      <input
        class="form-control"
        type="text"
        name="Titulo"
        v-model="addTitle"
        placeholder="Don Quijote de la Mancha"
      />
      <br />
      <label for="autor">Autor</label>
      <input
        class="form-control"
        type="text"
        name="autor"
        v-model="addAuthor"
        placeholder="Miguel de Cervantes Saavedra"
      />
      <div class="form-inline">
        <div class="form-group mx-2">
          <label for="Año">Año:</label>
          <input
            class="form-control mx-1"
            type="number"
            min="1500"
            max="2050"
            name="Año"
            v-model="addYear"
          />
        </div>
        <div class="form-group mx-2 my-3">
          <label for="categoria">Genero:</label>
          <select name="categoria" class="form-control mx-1" v-model="addGenre">
            <option value="Ciencia Ficcion">Ciencia Ficcion</option>
            <option value="Fantasía">Fantasía</option>
            <option value="Aventura">Aventura</option>
            <option value="Drama">Drama</option>
            <option value="Comedia">Comedia</option>
            <option value="Bibliografico">Bibliografico</option>
            <option value="Cientifico">Cientifico</option>
          </select>
        </div>
      </div>
      <label for="posterImg">Foto de la portada</label>
      <input
        type="file"
        class="form-control-file"
        id="posterImg"
        accept="image/*"
      />
      <br />
      <SubmitButton label="Agregar" />
    </form>
  </div>
</template>
<script>
import SubmitButton from "../components/SubmitButton.vue";

export default {
  name: "FormularioAgregarLibro",
  data: function() {
    return {
      addAuthor: "",
      addTitle: "",
      addYear: "2000",
      addPosterImg: null,
      addGenre: ""
    };
  },
  props: ["firebase"],
  components: {
    SubmitButton
  },
  methods: {
    async handleBookAdd(evt) {
      evt.preventDefault();
      // let batch = this.firebase.batch();
      let fileUpload = document.getElementById("posterImg");
      //extraer el archivo en una variable
      let file = fileUpload.files[0];
      if (file.type.includes("image")) {
        let docRef = await this.firebase.selectCollection("Books").add({
          author: this.addAuthor,
          title: this.addAuthor,
          year: this.addYear,
          genre: this.addGenre
        });
        console.log(docRef);
        //guardar la foto en firebase storage
        if (docRef != null) {
          console.log("Subiendo imagen");
          let imgName;
          this.firebase.storage
            .ref("/BookPosters")
            .child(`${docRef.id}.${file.type.substring(6)}`)
            .put(file)
            .then(imgRef => {
              imgName = imgRef.ref.name;
              console.log(imgRef);
              console.log(imgRef.ref.name);
              this.firebase.storage
                .ref("/BookPosters")
                .child(imgName)
                .getDownloadURL()
                .then(url => {
                  console.log(url);
                  docRef.update({ posterUrl: url });
                });
            });
        }
      } else {
        alert("La foto debe ser una imagen");
      }
    }
  }
};
</script>
