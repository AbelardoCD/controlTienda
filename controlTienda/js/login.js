$(document).ready(function () {

    $("#btn-inicio").click(function () {

        var parametros = new Object();
        parametros.nombre = $("#usuario").val();
        parametros.password = $("#password").val();
        parametros = JSON.stringify(parametros);
        
        $.ajax({
            type: "POST",
            url: "../Forms/login.aspx/getRegistro",
            data: parametros,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (response) {
                var data = response.d;
                var user = data.idUsuario;

                if (user === null || user === 0 || user === undefined) {
                    $("#lblMensajes").text('No se encontró usuario y contraseña.');
                    $("#alert-operacion-fail").show("fast", function () {
                        setTimeout(function () {
                            $("#alert-operacion-fail").hide("fast");
                        }, 2000);
                    });

                } else {
                    sessionStorage.setItem("idUsuario", data.idUsuario);
                    sessionStorage.setItem("nombre", data.nombre);
                    window.location = "../Forms/index.aspx";

                    //sessionStorage.removeItem('nombreusuario')

                }
            }
        });

    });
});