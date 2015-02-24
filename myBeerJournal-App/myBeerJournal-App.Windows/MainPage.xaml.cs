using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;
using Windows.Web.Http;

// La plantilla de elemento Página en blanco está documentada en http://go.microsoft.com/fwlink/?LinkId=234238

namespace myBeerJournal_App
{
    /// <summary>
    /// Página vacía que se puede usar de forma independiente o a la que se puede navegar dentro de un objeto Frame.
    /// </summary>
    public sealed partial class MainPage : Page
    {
        public MainPage()
        {
            this.InitializeComponent();
        }

        private async void Grid_Tapped(object sender, TappedRoutedEventArgs e)
        {
            Uri uri = new Uri("http://localhost:3000/api/v1/users");

            Windows.Web.Http.Filters.HttpBaseProtocolFilter filter =
                new Windows.Web.Http.Filters.HttpBaseProtocolFilter();
            filter.AllowUI = false;

            // Set credentials that will be sent to the server.
            filter.ServerCredential =
                new Windows.Security.Credentials.PasswordCredential(
                    uri.ToString(),
                    "patxinho",
                    "1234");

            HttpClient client = new HttpClient(filter);
            var response = await client.GetStringAsync(uri);
            this.Text1.Text = response;
        }
    }
}
