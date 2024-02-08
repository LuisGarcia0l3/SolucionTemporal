<php? 
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <title>Buscar por username</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="./_content/_css/stylesadmin.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>

<body class="bg-gray-100">


    <h2 class="text-center text-2xl font-semibold text-gray-900 mt-6">Registro de accesos</h2>

    <div class="min-h-screen flex flex-col  py-8 px-4 sm:px-6 lg:px-8">

        <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-2 px-4 shadow sm:rounded-lg sm:px-10">
                <h2 class="text-center text-2xl font-semibold text-gray-900 mb-6">Buscar por SAP</h2>
                    <div class="mb-4">
                        <label for="username" class="block text-sm font-medium text-gray-700">SAP</label>
                        <input type="text" name="username" id="username" autocomplete="username" required
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3">
                        <!-- Ajusta el tamaño del padding vertical y horizontal -->
                    </div>

                    <div class="mt-6">
                        <button id="btnbuscar" type="button" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Buscar
                        </button>
                    </div>
            </div>
        </div>
        <div id="registrados" class="mt-4"></div>
        <div id="modal"></div>

    </div>
    <script src="./_content/_js/admin/HttpRequestService.js"></script>
    <script src="./_content/_js/admin/RegisterModule.js"></script>
    <script src="./_content/_js/admin/app.js"></script>

</body>

</html>

?>