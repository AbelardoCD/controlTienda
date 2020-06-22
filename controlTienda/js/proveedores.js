var accion = "";
var id_Seleccionado = "";
$(document).ready(function () {
    var sesion = sessionStorage.getItem("nombre");
    $("#userName").text(sesion);

    if (sessionStorage.getItem("idUsuario") == null || sessionStorage.getItem("idUsuario") == undefined) {
        window.location = "../Forms/login.aspx";
    } else {
        getRegistros(); 
        console.log("INICIALIZANDO");
        $("#modal-proveedores").hide();
        $('#alert-operacion-ok').hide();
        $('#alert-operacion-fail').hide();




        $("#btn-nuevo").click(function () {
            $("#proveedores").hide();
            $("#modal-proveedores").show();
            accion = "Nuevo";
        });

        $("#btnGuardar").click(function () {
            var parametros = new Object();
            parametros.idProveedor = id_Seleccionado;
            parametros.nombre = $("#txtnombre").val();
            parametros.telefono = $("#txttelefono").val();
            parametros.correo = $("#txtcorreo").val();
            var item = new Object();
            item.proveedor = parametros;
            item.accion = accion;
            item = JSON.stringify(item);
            $.ajax({
                type: "POST",
                url: "../Forms/proveedores.aspx/GuardarRegistro",
                data: item,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true,
                success: function (response) {
                    if (response.d > 0) {
                        $("#lblMensajesOk").text('Registro guardado correctamente...');
                        $("#alert-operacion-ok").show("fast", function () {
                            setTimeout(function () {
                                $("#alert-operacion-ok").hide("fast");
                            }, 2000);
                        });
                        $("#tableData").children("tr").remove();

                        getRegistros();
                        $("#modal-proveedores").hide();
                        $("#proveedores").show();

                    } else {

                        $("#lblMensajesFail").text('No se pudo guardar el registro...');

                        $("#alert-operacion-fail").show("fast", function () {
                            setTimeout(function () {
                                $("#alert-operacion-fail").hide("fast");
                            }, 2000);
                        });
                    }
                }
            });
        });

        $("#btnCancelar").click(function () {
            $("#modal-proveedores").hide();
            $("#proveedores").show();
        });
    }
});


function getRegistros() {

    $.ajax({
        type: "POST",
        url: "../Forms/proveedores.aspx/GetItemsProveedores",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (response) {
            var data = response.d;
           

            for (var i = 0; i < data.length; i++) {
                var tr = "";
                tr += "<tr>";
                tr += "<td>" + data[i].nombre + "</td>"
                tr += "<td>" + data[i].telefono+ "</td>"
                tr += "<td>" + data[i].correo + "</td>"
                tr += "<td align-center>";
                tr += "<label class='btn btn-warning' onClick='editar(" + data[i].idProveedor + ")'>Editar</label>";
                tr += "</td>";
                tr += "<td align-center>";
                tr += "<label class='btn btn-danger' onClick='eliminar(" + data[i].idProveedor + ")'>Eliminar</label>";
                tr += "</td>";
                tr += "</tr>";
                $("#tableData").append(tr);
            }

            
        }

    });

}

function eliminar(idSeleccionado) {
    var parametros = new Object();
    parametros.id = idSeleccionado;
    var id = JSON.stringify(parametros);
    $.ajax({
        type: "POST",
        url: "../Forms/proveedores.aspx/eliminarRegistro",
        data: id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (response) {
            var result = response.d;
            if (result > 0) {

                $("#lblMensajesOk").text('Registro eliminado correctamente...');
                $("#alert-operacion-ok").show("fast", function () {
                    setTimeout(function () {
                        $("#alert-operacion-ok").hide("fast");
                    }, 2000);
                });
                $("#tableData").children("tr").remove();
                getRegistros();

            } else {

                $("#lblMensajesFail").text('No se pudo eliminar el registro...');

                $("#alert-operacion-fail").show("fast", function () {
                    setTimeout(function () {
                        $("#alert-operacion-fail").hide("fast");
                    }, 2000);
                });
            }
        }
    });
}
function editar(idSeleccionado) {
    accion = "updated";
    var parametros = new Object();
    parametros.id = idSeleccionado;
    var id = JSON.stringify(parametros);
    $.ajax({
        type: "POST",
        url: "../Forms/proveedores.aspx/getRegistro",
        data: id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (response) {
            var data = response.d;

            $("#txtnombre").val(data.nombre);
            $("#txttelefono").val(data.telefono);
            $("#txtcorreo").val(data.correo);

            id_Seleccionado = data.idProveedor;
            $("#proveedores").hide();
            $("#modal-proveedores").show();

        }
    });
}
