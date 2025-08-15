import {
    getCategory,
    CreateCategory,
    UpdatedCategory,
    DeleteCategory,
  } from "../Service/ServiceCategory.js";

document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#categoriesTable tbody");
  const form = document.getElementById("categoryForm");
  const modal = new bootstrap.Modal(document.getElementById("categoryModal"));
  const lbModa = document.getElementById("categoryModalLabel");
  const btnAdd = document.getElementById("btnAddCategory");

  loadCategory(); 

  btnAdd.addEventListener("click", () => {
    form.reset();
    form.categoryId.value = "";
    lbModa.textContent = "Agregar Categoria";
    modal.show();
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = form.categoryId.value;

    const data = {
      nombreCategoria: form.categoryName.value.trim(),
      descripcion: form.categoryDescription.value.trim(),
    };

    try {
      if (id) {
        await UpdatedCategory(id, data);
      } else {
        await CreateCategory(data);
      }
      modal.hide();
      await loadCategory();
    } catch (err) {
      console.error("Error al Guardar la Categoria:", err);
    }
  });

  async function loadCategory() {
    try {
        const response = await getCategory();
        const categories = response.content;
      tableBody.innerHTML = ""; //VACIAMOS TODO LO DE LA TABLA

      if (!categories || categories.length === 0) {
        tableBody.innerHTML =
          ' <td colspan="5">Actualmente no hay Categorias</td>';
        return;
      }

      categories.forEach((Category) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
          <td>${Category.idCategoria}</td>
          <td>${Category.nombreCategoria} </td>
          <td>${Category.descripcion || "No hay Descripcion"} </td>
          <td>${Category.fechaCreacion} </td>
          <td>
          <button class="btn btn-sm btn-outline-secondary edit-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-square-pen">
                <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>
              </svg>
            </button>
 
            <button class="btn btn-sm btn-outline-danger delete-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-trash">
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                <path d="M3 6h18"/>
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
          </td>
        `;

        tr.querySelector(".edit-btn").addEventListener("click", ()=>{

            form.categoryId.value = Category.idCategoria;
            form.categoryName.value = Category.nombreCategoria;
            form.categoryDescription.value = Category.descripcion;

            lbModa.textContent = "Editar Categoria"

            modal.show();
        });

        tr.querySelector(".delete-btn").addEventListener("click", async () => {
            if (confirm("Querido usuario, ¿Desea eliminar esta categoria?")) {
                await DeleteCategory(Category.idCategoria);
                await loadCategory();
            }
        });

        tableBody.appendChild(tr); //AL TBODY LE AGREGA EL TR CREADO


      });
    } catch (err) {
        console.error("ERROR AL CARGARA LAS CATEGORIAS:" , err)
    }
  }


});
