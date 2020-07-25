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
                  href="#agregar"
                  data-toggle="tab"
                  aria-controls="agregar"
                  aria-selected="true"
                  >Agregar</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="#editarEliminar"
                  data-toggle="tab"
                  aria-controls="editarEliminar"
                  aria-selected="false"
                  >Editar/Eliminar</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="#detalles"
                  data-toggle="tab"
                  aria-controls="editarEliminar"
                  aria-selected="false"
                  >Detalles</a
                >
              </li>
            </ul>
            <!--CONTENIDO MODAL-->
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active"
                id="agregar"
                role="tabpanel"
              >
                <FormularioAgregarLibro />
              </div>
              <div class="tab-pane fade" id="editarEliminar" role="tabpanel">
                <EditarBorrarLibro  />
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
import FormularioAgregarLibroBase from "../components/FormularioAgregarLibro.vue";
import EditarBorrarLibroBase from "../components/FormularioEditarBorrarLibro.vue";
import { withFirebase } from "../components/HOC/FirebaseProvider.js";

const EditarBorrarLibro = withFirebase(EditarBorrarLibroBase);
const FormularioAgregarLibro = withFirebase(FormularioAgregarLibroBase);
export default {
  name: "AdministratePanel",
  components: {
    FormularioAgregarLibro,
    EditarBorrarLibro
  },
};
</script>
