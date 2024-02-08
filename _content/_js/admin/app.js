document.getElementById('menu-toggle').addEventListener('click', function () {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});

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


document.getElementById('mobile-opcionRegistro').addEventListener('click', function () {
    handleMenuOptionClick('Registro');
});

document.getElementById('mobile-opcionEquipos').addEventListener('click', function () {
    handleMenuOptionClick('Equipos');
});

document.getElementById('mobile-opcionPuntos').addEventListener('click', function () {
    handleMenuOptionClick('Puntos');
});

// Función para manejar el clic en las opciones del menú
function handleMenuOptionClick(option) {
    // Limpiar el contenedor antes de cargar nueva información
    const contenedor = document.getElementById('app-container');
    contenedor.innerHTML = '';

    // Instanciar la clase correspondiente
    let module;
    switch (option) {
        case 'Registro':
            module = new RegisterModule();
            break;
        case 'Equipos':
            module = new TeamsModule();
            break;
    }

    // Llamar a la función que pinta la información en el contenedor
    module.index(contenedor);
}

// Establecer la opción "Registro" como predeterminada al cargar la página
handleMenuOptionClick('Registro');
