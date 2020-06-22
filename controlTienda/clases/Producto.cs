using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace controlTienda.clases
{
    public class Producto
    {
        public string idProducto { get; set; }
        public string nombre { get; set; }
        public string codigo { get; set; }
        public string precio { get; set; }
        public string stock { get; set; }
        public string idProveedor { get; set; }

    }
}