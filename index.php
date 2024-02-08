<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <title>Soluciones</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="./_content/_css/stylesadmin.css" rel="stylesheet">
    <style>
        .menu-option-active {
            background-color: #4a5568; /* Cambia el color de fondo de la opción activa */
        }
    </style>
</head>

<body class="bg-gray-100">

    <!-- Barra de menú -->
    <nav class="bg-gray-800 text-white">
        <div class="container mx-auto flex justify-between px-8 items-center py-4">

            <!-- Logo con margen izquierdo en dispositivos móviles -->
            <a href="#" class="text-xl font-bold md:ml-4">Soluciones</a>

            <!-- Menú de navegación -->
            <ul class="hidden md:flex space-x-4">
                <li><a href="#" id="opcionRegistro" class="hover:text-gray-300">Registro</a></li>
                <li><a href="#" id="opcionEquipos" class="hover:text-gray-300">Equipos</a></li>
                <li><a href="#" id="opcionPuntos" class="hover:text-gray-300">Puntos</a></li>
            </ul>

            <!-- Menú hamburguesa para dispositivos móviles -->
            <div class="md:hidden">
                <button id="menu-toggle" class="text-white focus:outline-none ml-4">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
        </div>
    </nav>

    <!-- Menú desplegable en dispositivos móviles -->
    <div id="mobile-menu" class="md:hidden bg-gray-800 text-white hidden">
        <ul class="py-2">
            <li><a href="#" id="mobile-opcionRegistro" class="hover:text-gray-300">Registro</a></li>
            <li><a href="#" id="mobile-opcionEquipos" class="hover:text-gray-300">Equipos</a></li>
            <li><a href="#" id="mobile-opcionPuntos" class="hover:text-gray-300">Puntos</a></li>
        </ul>
    </div>

    <main id="app-container">


    </main>
    <script src="./_content/_js/admin/HttpRequestService.js"></script>
    <script src="./_content/_js/admin/RegisterModule.js"></script>
    <script src="./_content/_js/admin/TeamsModule.js"></script>

    <script src="./_content/_js/admin/app.js"></script>

    <script>
        // JavaScript para marcar la opción seleccionada en el menú
        document.addEventListener("DOMContentLoaded", function () {
            // Obtener todas las opciones del menú
            const menuOptions = document.querySelectorAll('.menu-option');

            // Iterar sobre cada opción y agregar un event listener
            menuOptions.forEach(function (option) {
                option.addEventListener('click', function () {
                    // Remover la clase 'menu-option-active' de todas las opciones
                    menuOptions.forEach(function (opt) {
                        opt.classList.remove('menu-option-active');
                    });

                    // Agregar la clase 'menu-option-active' a la opción seleccionada
                    this.classList.add('menu-option-active');
                });
            });
        });
    </script>
</body>

</html>
