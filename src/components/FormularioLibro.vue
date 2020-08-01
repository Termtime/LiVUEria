<template>
  <form
    v-on:submit="
      evt => {
        if (editar) {
          handlerEditar(evt);
        } else {
          handlerAgregar(evt);
        }
      }
    "
  >
    <label for="Titulo">Titulo</label>
    <input
      class="form-control"
      type="text"
      name="Titulo"
      v-model="addTitle"
      placeholder="Titulo..."
    />
    <br />
    <label for="autor">Autor</label>
    <input
      class="form-control"
      type="text"
      name="autor"
      v-model="addAuthor"
      placeholder="Nombre..."
    />
    <textarea
      v-model="addDescription"
      style="resize:none;"
      class="form-control mt-4"
      cols="58"
      rows="5"
    ></textarea>
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
        <select
          name="categoria"
          class="form-control mx-1"
          v-model="addGenre"
          required
        >
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
    <label for="posterImg">Foto de la portada</label>
    <input
      type="file"
      class="form-control-file"
      :id="editar ? 'posterImgEditar' : 'posterImgAgregar'"
      accept="image/*"
    />
    <br />
    <SubmitButton label="Agregar" />
  </form>
</template>
<script>
import SubmitButton from "../components/SubmitButton.vue";
const jq = require("jquery");
window.jq = jq;
export default {
  name: "FormularioLibro",
  //   props: ["handler", "libro"],
  props: {
    libro: {
      default: null
    },
    editar: {
      default: false
    },
    firebase: {}
  },
  data: function() {
    return {
      addAuthor: "",
      addTitle: "",
      addYear: "",
      addPosterImg: null,
      addGenre: "",
      bookID: "",
      addDescription: ""
    };
  },
  components: {
    SubmitButton
  },
  watch: {
    libro: {
      inmediate: true,
      handler(newVal, oldVal) {
        if (newVal == null || newVal == undefined) return;
        // watch it
        console.log("Prop changed: ", newVal, " | was: ", oldVal);
        // this.bookID = newVal.id;
        this.addTitle = newVal.title;
        this.addAuthor = newVal.author;
        this.addYear = newVal.year;
        this.addGenre = newVal.genre;
        this.bookID = newVal.id;
        this.addDescription = newVal.description;
      }
    }
  },
  methods: {
    async handlerAgregar(evt) {
      evt.preventDefault();
      let fileUpload = document.getElementById("posterImgAgregar");
      //extraer el archivo en una variable
      let file = fileUpload.files[0];
      if (file !== null && file !== undefined && file.type.includes("image")) {
        let docRef = await this.firebase.selectCollection("Books").add({
          author: this.addAuthor,
          title: this.addTitle,
          year: this.addYear,
          genre: this.addGenre,
          description: this.addDescription,
          lowerCaseTitle: this.addTitle.toLowerCase()
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
                  docRef.update({
                    posterUrl: url,
                    imgLocation: `BookPosters/${imgName}`
                  });
                });
            });
        }
      } else {
        await this.firebase.selectCollection("Books").add({
          author: this.addAuthor,
          title: this.addTitle,
          year: this.addYear,
          genre: this.addGenre,
          description: this.description,
          posterUrl: "",
          lowerCaseTitle: this.addTitle.toLowerCase()
        });
      }
      //la escritura fue exitosa asi que limpiar los campos
      this.addAuthor = "";
      this.addYear = "2000";
      this.addTitle = "";
      this.addPosterImg = null;
      this.addGenre = "";
      this.description = "";
      jq("#posterImgEditar").val("");
      jq("#posterImgAgregar").val("");
    },
    async handlerEditar(evt) {
      evt.preventDefault();
      let fileUpload = document.getElementById("posterImgEditar");
      //extraer el archivo en una variable
      let file = fileUpload.files[0];

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
          description: this.description,
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
      this.addGenre = "";
      this.description = "";
      jq("#posterImgEditar").val("");
      jq("#posterImgAgregar").val("");
    });

    jq("#toggleEditar").on("hide.bs.tab", () => {
      jq("#posterImgEditar").val("");
    });
  }
};
</script>
