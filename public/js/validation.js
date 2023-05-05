function eliminar_prod(id) {
  document
    .getElementById("formDeleteCons")
    .setAttribute("href", "/homeadmin/products/Delete/" + id);
}

function eliminar_menu(id) {
  document
    .getElementById("formDeleteCons")
    .setAttribute("href", "/homeadmin/menu/Delete/" + id);
}

function eliminar_user(id) {
  document
    .getElementById("formDeleteCons")
    .setAttribute("href", "/homeadmin/user/Delete/" + id);
}
