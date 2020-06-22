<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="controlTienda.Forms.index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="shortcut icon" href="">
    <!-- Bootstrap Core CSS -->
    <link href="../vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <!-- MetisMenu CSS -->
    <link href="../vendor/metisMenu/metisMenu.min.css" rel="stylesheet">
    <!-- DataTables CSS -->
    <link href="../vendor/datatables-plugins/dataTables.bootstrap.css" rel="stylesheet">
    <!-- DataTables Responsive CSS -->
    <link href="../vendor/datatables-responsive/dataTables.responsive.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="../dist/css/sb-admin-2.css" rel="stylesheet">
    <!-- Custom Fonts -->
    <link href="../vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <!-- styles-->
    <link href="../vendor/Styles/styles_own.css" rel="stylesheet" type="text/css">
    <link href="../vendor/font-awesome/css/font-awesome.css" rel="stylesheet" />

    <link rel="stylesheet" media="only screen and (max-width: 480px)">
    <title></title>

</head>
    <body class="body-expanded">

    <div id="sideMenu" class="menu-collapsed">
        <div id="header">
            <div id="title"><span>TIENDA</span></div>

        </div>
        <div id="perfil">
            <div id="foto">
                <img src="../images/perfil.jpg" alt="" />
            </div>
            <div id="name">
                <label id="userName"></label>
            </div>
        </div>
<div id="menu-items">
            <div class="item">
                <a href="index.aspx">
                    <div class="icon">
                        <img src="../images/home.png" alt="" />
                    </div>
                    <div class="titulo">Productos</div>
                </a>
            </div>
            <div class="item-separator">
            </div>
            <div class="item">
                <a href="proveedores.aspx">
                    <div class="icon">
                        <img src="../images/home.png" alt="" />
                    </div>
                    <div class="titulo">Proveedores</div>
                </a>
            </div>
        </div>
    </div>

    <div id="main-container">
        <div id="head">
            <div class="col-md-11"></div>
            <div class="col-md-1">salir</div>

        </div>
        <div class="row">

            <div class="alert alert-success" role="alert" id="alert-operacion-ok">
                <strong>¡Información!</strong>
                <label id="lblMensajesOk"></label>
            </div>

            <div class="alert alert-danger" role="alert" id="alert-operacion-fail">
                <strong>¡Atención!</strong>
                <label id="lblMensajesFail"></label>
            </div>


            <div class="col-md-3"></div>
            <div id="producto" class="col-md-6">
                <div id="table">
                    <div class="text-right">
                        <h3>
                            <label class="label label-success">PRODUCTOS</label>

                        </h3>

                    </div>
                    <div>
                        <button id="btn-nuevo" class="btn btn-primary">NUEVO</button>
                    </div>
                    <div class="linea-azul"></div>
                    <table id="data-table" class="table table-bordered table-hover">
                        <thead class="thead-dark">
                            <tr>
                                <th>Nombre</th>
                                <th>Código</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th></th>
                                <th></th>

                            </tr>

                        </thead>
                        <tbody id="tableData">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>



    <div id="modal-product" class="container-fluid">
        <header class="header">
            <label class="col-form-label">NUEVO USUARIO</label>
        </header>
        <form id="formDatos">
            <div class="form-group">
                <label class="col-form-label">Nombre</label>
                <input id="txtnombre" class="no-simbolos-especiales form-control campo-editable" type="text" />
            </div>
            <div class="form-group">
                <label class="col-form-label">Código</label>
                <input id="txtcodigo" class="no-simbolos-especiales form-control campo-editable" type="text" />

            </div>
            <div class="form-group">
                <label class="col-form-label">Precio</label>
                <input id="txtprecio" class="no-simbolos-especiales form-control campo-editable" type="number" />

            </div>
            <div class="form-group">
                <label class="col-form-label">Stock</label>
                <input id="txtstock" class="no-simbolos-especiales form-control campo-editable" type="number" />

            </div>
            <div class="form-group">
                <label for="comboEstatus">
                    Proveedor
                </label>
                <select class="form-control" id="comboProveedor" >
                </select>
               
            </div>
        </form>
        <button id="btnGuardar" class="btn btn-primary">Guardar</button>
        <button id="btnCancelar" class="btn btn-default">Cancelar</button>

    </div>




    <!-- jQuery -->
    <script src="../vendor/jquery/jquery.min.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="../vendor/bootstrap/js/bootstrap.min.js"></script>

    <!-- Metis Menu Plugin JavaScript -->
    <script src="../vendor/metisMenu/metisMenu.min.js"></script>


    <!-- DataTables JavaScript -->
    <script src="../vendor/datatables/js/jquery.dataTables.min.js"></script>
    <script src="../vendor/datatables-plugins/dataTables.bootstrap.min.js"></script>
    <script src="../vendor/datatables-responsive/dataTables.responsive.js"></script>




    <!-- Custom Theme JavaScript -->
    <script src="../dist/js/sb-admin-2.js"></script>

    <script src="../js/index.js"></script>


</body>
</html>
