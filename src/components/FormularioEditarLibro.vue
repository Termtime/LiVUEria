<template>
  <div class="text-left text-dark col">
    <form v-if="libro !== null || libro !== undefined" v-on:submit="handleBookEdit">
      <label for="Titulo">Titulo</label>
      <input
        class="form-control"
        type="text"
        name="Titulo"
        v-model="addTitle"
        placeholder="Don Quijote de la Mancha"
        required
      />
      <br />
      <label for="autor">Autor</label>
      <input
        class="form-control"
        type="text"
        name="autor"
        v-model="addAuthor"
        placeholder="Miguel de Cervantes Saavedra"
        required
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
            required
          />
        </div>
        <div class="form-group mx-2 my-3">
          <label for="categoria">Genero:</label>
          <select name="categoria" class="form-control mx-1" v-model="addGenre" required>
            <option value="Ciencia Ficción">Ciencia Ficción</option>
            <option value="Fantasía">Fantasía</option>
            <option value="Aventura">Aventura</option>
            <option value="Drama">Drama</option>
            <option value="Comedia">Comedia</option>
            <option value="Bibliográfico">Bibliográfico</option>
            <option value="Científico">Científico</option>
            <option value="Policial">Policial</option>
            <option value="Tragedia">Tragedia</option>
            <option value="Romántico">Romántico</option>
          </select>
        </div>
      </div>
      <label for="addPosterImg">Foto de la portada</label>
      <input type="file" class="form-control-file" id="addPosterImg" accept="image/*" />
      <br />
      <SubmitButton label="Editar" />
    </form>
  </div>
</template>
<script>
import SubmitButton from "../components/SubmitButton.vue";

const jq = require("jquery");
window.jq = jq;
export default {
  name: "FormularioEditarLibro",
  components: {
    SubmitButton
  },
  props: ["libro", "firebase"],
  data: function() {
    return {
      bookID: "",
      addAuthor: "",
      addTitle: "",
      addYear: "2000",
      addPosterImg: null,
      currentPosterImg: null,
      addGenre: ""
    };
  },
  methods: {
    async handleBookEdit(evt) {
      evt.preventDefault();
      let fileUpload = document.getElementById("addPosterImg");
      //extraer el archivo en una variable
      console.log(fileUpload);
      console.log(fileUpload.files);
      let file = fileUpload.files.length > 0 ? fileUpload.files[0] : null;

      console.log(file);
      let newFileUrl = this.currentPosterImg;
      // console.log("BEFORE UPLOAD:", newFileUrl);
      if (file !== null && file !== undefined) {
        console.log("Subiendo imagen");
        let imgName;
        let imgRef = await this.firebase.storage
          .ref("/BookPosters")
          .child(`${this.bookID}.${file.type.substring(6)}`)
          .put(file);
        imgName = imgRef.ref.name;
        // console.log(imgRef.ref.name);
        newFileUrl = await this.firebase.storage
          .ref("/BookPosters")
          .child(imgName)
          .getDownloadURL();
      }
      // console.log("AFTER UPLOAD", newFileUrl);
      await this.firebase
        .selectCollection("Books")
        .doc(this.bookID)
        .update({
          author: this.addAuthor,
          title: this.addTitle,
          year: this.addYear,
          genre: this.addGenre,
          lowerCaseTitle: this.addTitle.toLowerCase(),
          posterUrl: newFileUrl
        });

      jq("#toggleSeleccionarLibro").tab("show");
    }
  },
  mounted() {
    jq("#adminModal").on("hidden.bs.modal", () => {
      this.addAuthor = "";
      this.addYear = "2000";
      this.addTitle = "";
      this.addPosterImg = null;
      this.currentPosterImg = null;
      this.addGenre = "";
    });
    // jq("#toggleEditar").on("hide.bs.tab", () => {
    //   this.addAuthor = "";
    //   this.addYear = "2000";
    //   this.addTitle = "";
    //   this.addPosterImg = null;
    //   this.addGenre = "";
    // });
  },
  watch: {
    libro: {
      inmediate: true,
      handler(newVal, oldVal) {
        if (newVal == null || newVal == undefined) return;
        // watch it
        console.log("Prop changed: ", newVal, " | was: ", oldVal);
        this.bookID = newVal.id;
        this.addTitle = newVal.title;
        this.addAuthor = newVal.author;
        this.addYear = newVal.year;
        this.currentPosterImg = newVal.posterUrl;
        this.addGenre = newVal.genre;
      }
    }
  }
};
</script>
