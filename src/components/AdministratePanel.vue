<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="adminModal"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      role="dialog"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-dark" id="staticBackdropLabel">
              Administrar Libros
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!--CUERPO MODAL-->
            <ul class="nav nav-tabs">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  id="toggleAgregarLibro"
                  href="#AgregarLibro"
                  data-toggle="tab"
                  aria-controls="agregar"
                  aria-selected="true"
                  >Agregar</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="#SeleccionarLibro"
                  id="toggleSeleccionarLibro"
                  data-toggle="tab"
                  aria-controls="editarEliminar"
                  aria-selected="false"
                  >Editar/Eliminar</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link disabled"
                  id="toggleEditar"
                  href="#EditarLibro"
                  data-toggle="tab"
                  aria-controls="EditarLibro"
                  aria-selected="false"
                  >Detalles</a
                >
              </li>
            </ul>
            <!--CONTENIDO MODAL-->
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active"
                id="AgregarLibro"
                role="tabpanel"
              >
                <FormularioAgregarLibro :firebase="firebase" />
              </div>
              <div class="tab-pane fade" id="SeleccionarLibro" role="tabpanel">
                <FormularioSeleccionarLibro
                  :firebase="firebase"
                  v-on:selected="handleBookSelected"
                />
                <!-- v-on:book-selected="(book) => handleBookSelected(book)" -->
              </div>
              <div class="tab-pane fade" id="EditarLibro" role="tabpanel">
                <FormularioEditarLibro
                  :firebase="firebase"
                  :libro="libroEditar"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FormularioAgregarLibro from "../components/FormularioAgregarLibro.vue";
import FormularioSeleccionarLibro from "../components/FormularioSeleccionarLibro.vue";
import FormularioEditarLibro from "../components/FormularioEditarLibro.vue";

// import { withFirebase } from "../components/HOC/FirebaseProvider.js";

// const FormularioSeleccionarLibro = withFirebase(FormularioSeleccionarLibroBase);
// const FormularioAgregarLibro = withFirebase(FormularioAgregarLibroBase);
// const FormularioEditarLibro = withFirebase(FormularioEditarLibroBase);

const jq = require("jquery");
window.jq = jq;

export default {
  name: "AdministratePanel",
  props: ["firebase"],
  data: function() {
    return {
      libroEditar: null,
    };
  },
  components: {
    FormularioAgregarLibro,
    FormularioSeleccionarLibro,
    FormularioEditarLibro,
  },
  methods: {
    handleBookSelected(book) {
      console.log("a book has been selected, parent");
      this.libroEditar = book;
      jq("#toggleEditar").removeClass("disabled");
      jq("#toggleEditar").tab("show");
    },
  },
  mounted() {
    jq("#adminModal").on("hidden.bs.modal", () => {
      this.libroEditar = null;
      jq("#toggleAgregarLibro").tab("show");
    });

    jq("#toggleEditar").on("hide.bs.tab", () => {
      jq("#toggleEditar").addClass("disabled");
    });
  },
};
</script>
