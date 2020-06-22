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
    public partial class login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Usuario getRegistro(string nombre, string password)
        {

            coneccion c = new coneccion();
            MySqlConnection con = c.con();
            Usuario item = new Usuario();
            DataSet ds = new DataSet();

            try
            {


                con.Open();
                string sql = "";

                sql = " Select idUsuario, nombre, password FROM usuarios" +
                        " WHERE nombre = @nombre and password = @password ";



                MySqlDataAdapter adp = new MySqlDataAdapter(sql, con);
                adp.SelectCommand.Parameters.AddWithValue("@nombre", nombre);
                adp.SelectCommand.Parameters.AddWithValue("@password", password);

                adp.Fill(ds);

                if (ds.Tables[0].Rows.Count > 0)
                {
                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {
                        item.idUsuario = ds.Tables[0].Rows[i]["idUsuario"].ToString();

                        item.nombre = ds.Tables[0].Rows[i]["nombre"].ToString();
                        item.password = ds.Tables[0].Rows[i]["password"].ToString();
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
