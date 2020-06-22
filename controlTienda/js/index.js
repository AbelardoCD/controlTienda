var accion = "";
var id_Seleccionado = "";


$(document).ready(function () {
    var sesion = sessionStorage.getItem("nombre");
    $("#userName").text(sesion);

    if (sessionStorage.getItem("idUsuario") == null || sessionStorage.getItem("idUsuario") == undefined) {
        window.location = "../Forms/login.aspx";
    } else {
        console.log("INICIALIZANDO");
        consultar();
        getComboProveedor();
        $("#modal-product").hide();
        $('#alert-operacion-ok').hide();
        $('#alert-operacion-fail').hide();


        $("#btn-nuevo").click(function () {
            $('#formDatos')[0].reset();
            $("#producto").hide();
            $("#modal-product").show();

            accion = "Nuevo";

        });


        $("#btnGuardar").click(function () {
            var item = new Object();
            item.idProducto = id_Seleccionado;
            item.nombre = $("#txtnombre").val();
            item.codigo = $("#txtcodigo").val();
            item.precio = $("#txtprecio").val();
            item.stock = $("#txtstock").val();
            item.idProveedor = $("#comboProveedor").val();
            
            var parametros = new Object();
            parametros.producto = item;
            parametros.accion = accion;
            var params = "";
            params = JSON.stringify(parametros);

            $.ajax({
                type: "POST",
                url: "../Forms/index.aspx/guardarRegistro",
                data: params,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true,
                success: function (response) {
                    mesg(response);
                }
            });
        });


        $("#btnCancelar").click(function () {
            $("#modal-product").hide();
            $("#producto").show();
        });
    }
});




function consultar() {
    console.log("consultar");

    $.ajax({
        type: "POST",
        url: "../Forms/index.aspx/GetItemsProducto",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (response) {


            pintar(response);
        }


    });
}

function pintar(response) {
    var data = response.d;

    for (var i = 0; i < data.length; i++) {
        var tr = "";
        tr += "<tr>"
        tr += "<td>" + data[i].nombre + "</td>";
        tr += "<td>" + data[i].codigo + "</td>";
        tr += "<td>" + "$" + data[i].precio + "</td>";
        tr += "<td>" + data[i].stock + "</td>";
        tr += "<td align-center>";
        tr += "<label class='btn btn-warning' onClick='editar(" + data[i].idProducto + ")'>Editar</label>";
        tr += "</td>";
        tr += "<td align-center>";
        tr += "<label class='btn btn-danger' onClick='eliminar(" + data[i].idProducto + ")'>Eliminar</label>";
        tr += "</td>";
        tr += "</tr>";
        $("#tableData").append(tr);

    }

}



function mesg(response) {
    console.log(response.d);

    if (response.d > 0) {
        $("#lblMensajesOk").text('Registro guardado correctamente...');
        $("#alert-operacion-ok").show("fast", function () {
            setTimeout(function () {
                $("#alert-operacion-ok").hide("fast");
            }, 2000);
        });
        $("#tableData").children("tr").remove();

        consultar();
        $("#modal-product").hide();
        $("#producto").show();

    } else {

        $("#lblMensajesFail").text('No se pudo guardar el registro...');

        $("#alert-operacion-fail").show("fast", function () {
            setTimeout(function () {
                $("#alert-operacion-fail").hide("fast");
            }, 2000);
        });
    }
}

function eliminar(idSeleccionado) {
    var parametros = new Object();
    parametros.id = idSeleccionado;
    var id = JSON.stringify(parametros);
    $.ajax({
        type: "POST",
        url: "../Forms/index.aspx/eliminarRegistro",
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
                consultar();

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
        url: "../Forms/index.aspx/getRegistro",
        data: id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (response) {
            var data = response.d;

            $("#txtnombre").val(data.nombre);
            $("#txtcodigo").val(data.codigo);
            $("#txtprecio").val(data.precio);
            $("#txtstock").val(data.stock);
            $("#comboProveedor").val(data.idProveedor);

            id_Seleccionado = data.idProducto;
            $("#producto").hide();
            $("#modal-product").show();

        }
    });
}

function getComboProveedor() {


    $.ajax({
        type: "POST",
        url: "../Forms/index.aspx/GetItemsProveedor",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (response) {
            var data = response.d;

            var opcion = "";
            for (var i = 0; i < data.length; i++) {
//                opcion += '<option value = "' + -1 + '">' + "Proveedores"+ '</option>';

                opcion += '<option value = "' + data[i].idProveedor+'">' +data[i].nombre +'</option>';
            }
            $('#comboProveedor').empty().append(opcion);

        }


    });
}