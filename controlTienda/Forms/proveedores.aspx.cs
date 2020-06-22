using controlTienda.clases;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace controlTienda.Forms
{
    public partial class proveedores : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static List<Proveedor> GetItemsProveedores()
        {
            //Traemos la conexion
            coneccion c = new coneccion();
            //Creamos un objeto de tipo MysqlConextion y le asignamos el metodo donde viene la conexion.
            MySqlConnection coneccion = c.con();
            //Creamos una lista de tipo producto, ahi guardaremos objetos de los registros de la bd
            List<Proveedor> items = new List<Proveedor>();

            try
            {
                coneccion.Open();
                DataSet ds = new DataSet();
                string query = "Select idProveedor, nombre, telefono,correo from proveedores";
                // MySqlCommand  mysc = new MySqlCommand(query, coneccion);
                MySqlDataAdapter mAdapter = new MySqlDataAdapter(query, coneccion);
                mAdapter.Fill(ds);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {
                        Proveedor item = new Proveedor();
                        item.idProveedor = ds.Tables[0].Rows[i]["idProveedor"].ToString();

                        item.nombre = ds.Tables[0].Rows[i]["nombre"].ToString();
                        item.telefono = ds.Tables[0].Rows[i]["telefono"].ToString();
                        item.correo = ds.Tables[0].Rows[i]["correo"].ToString();// float.Parse(ds.Tables[0].Rows[i]["precio"].ToString());
                        items.Add(item);
                    }
                }
                return items;
            }
            catch (Exception ex)
            {
                Debug.Write("Error...." + ex.Message);
                return items;
            }
            finally
            {
                coneccion.Close();
            }

        }

        [WebMethod]
        public static object GuardarRegistro(Proveedor proveedor, string accion)
        {
            coneccion c = new coneccion();
            MySqlConnection coneccion = c.con();


            //comandatabase.CommandTimeout = 60;
            //  MySqlDataReader reader;

            try
            {
                coneccion.Open();
                string query = "";
                if (accion == "Nuevo")
                {
                    query = "insert into proveedores(nombre,telefono,correo) values(@nombre,@telefono,@correo)";

                }
                else
                {
                    query = "UPDATE proveedores SET nombre = @nombre, telefono= @telefono, correo= @correo WHERE idProveedor=@id";


                }
                MySqlCommand comandatabase = new MySqlCommand(query, coneccion);

                // reader = comandatabase.ExecuteReader();
                comandatabase.CommandType = CommandType.Text;

                comandatabase.Parameters.Add("@nombre", MySqlDbType.VarChar).Value = proveedor.nombre;
                comandatabase.Parameters.Add("@telefono", MySqlDbType.VarChar).Value = proveedor.telefono;
                comandatabase.Parameters.Add("@correo", MySqlDbType.VarChar).Value = proveedor.correo;

                comandatabase.Parameters.Add("@id", MySqlDbType.VarChar).Value = proveedor.idProveedor;
                int r = comandatabase.ExecuteNonQuery();
                return r;
            }
            catch (Exception ex)
            {
                // MessageBox.Show(ex.Message);
                Debug.Write("Error...." + ex.Message);

                return -1; //Retornamos menos uno cuando se dió por alguna razón un error
            }
            finally
            {
                coneccion.Close();
            }
        }

        [WebMethod]
        public static object eliminarRegistro(string id)
        {

            coneccion c = new coneccion();
            MySqlConnection con = c.con();

            try
            {


                con.Open();
                string sql = "";

                sql = " DELETE from proveedores " +
                        " WHERE idProveedor = @id ";



                MySqlCommand cmd = new MySqlCommand(sql, con);
                cmd.CommandType = CommandType.Text;
                cmd.Parameters.Add("@id", MySqlDbType.VarChar).Value = id;


                int r = cmd.ExecuteNonQuery();
                Debug.Write("r = " + r);
                Debug.Write("Eliminado -> OK ");



                return r;
            }
            catch (Exception ex)
            {
                Debug.Write("Error ... " + ex.Message);
                Debug.Write(ex.StackTrace);
                return -1;
            }

            finally
            {
                con.Close();
            }

        }

        [WebMethod]
        public static Proveedor getRegistro(string id)
        {

            coneccion c = new coneccion();
            MySqlConnection con = c.con();
            Proveedor item = new Proveedor();
            DataSet ds = new DataSet();

            try
            {


                con.Open();
                string sql = "";

                sql = " Select idProveedor, nombre, telefono,correo from proveedores" +
                        " WHERE idProveedor = @id ";



                MySqlDataAdapter adp = new MySqlDataAdapter(sql, con);
                adp.SelectCommand.Parameters.AddWithValue("@id", id);

                adp.Fill(ds);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {
                        item.idProveedor = ds.Tables[0].Rows[i]["idProveedor"].ToString();

                        item.nombre = ds.Tables[0].Rows[i]["nombre"].ToString();
                        item.telefono = ds.Tables[0].Rows[i]["telefono"].ToString();
                        item.correo = ds.Tables[0].Rows[i]["correo"].ToString();// float.Parse(ds.Tables[0].Rows[i]["precio"].ToString());

                    }
                }





                return item;
            }
            catch (Exception ex)
            {
                Debug.Write("Error ... " + ex.Message);
                Debug.Write(ex.StackTrace);
                return item;
            }

            finally
            {
                con.Close();
            }
        }
    }
}