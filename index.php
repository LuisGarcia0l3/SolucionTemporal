<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <title>Buscar por username</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>

<body class="bg-gray-100">

    <!-- Barra de menú -->
    <nav class="bg-gray-800 text-white">
        <div class="container mx-auto flex justify-between items-center py-4">

            <!-- Logo con margen izquierdo en dispositivos móviles -->
            <a href="#" class="text-xl font-bold md:ml-4">Mi Sitio</a>

            <!-- Menú de navegación -->
            <ul class="hidden md:flex space-x-4">
                <li><a href="#" class="hover:text-gray-300">Registro</a></li>
                <li><a href="#" class="hover:text-gray-300">Equipos</a></li>
                <li><a href="#" class="hover:text-gray-300">Puntos</a></li>
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
            <li><a href="#" class="block px-4 py-2 hover:bg-gray-700">Registro</a></li>
            <li><a href="#" class="block px-4 py-2 hover:bg-gray-700">Equipos</a></li>
            <li><a href="#" class="block px-4 py-2 hover:bg-gray-700">Puntos</a></li>
        </ul>
    </div>

    <main>


    </main>


    <!-- Script para controlar el menú en dispositivos móviles -->
    <script>
        document.getElementById('menu-toggle').addEventListener('click', function () {
            document.getElementById('mobile-menu').classList.toggle('hidden');
        });
    </script>
<script>
    // Agregar eventos de clic a cada opción del menú
    document.getElementById('opcionRegistro').addEventListener('click', function () {
        handleMenuOptionClick('Registro');
    });

    document.getElementById('opcionEquipos').addEventListener('click', function () {
        handleMenuOptionClick('Equipos');
    });

    document.getElementById('opcionPuntos').addEventListener('click', function () {
        handleMenuOptionClick('Puntos');
    });

    // Función para manejar el clic en las opciones del menú
    function handleMenuOptionClick(option) {
        // Limpiar el contenedor antes de cargar nueva información
        const contenedor = document.getElementById('contenedor-informacion');
        contenedor.innerHTML = '';

        // Instanciar la clase correspondiente
        let module;
        switch (option) {
            case 'Registro':
                module = new RegisterModule();
                break;
        }

        // Llamar a la función que pinta la información en el contenedor
        module.mostrarInformacionEnContenedor(contenedor);
    }
</script>

</body>

</html>
