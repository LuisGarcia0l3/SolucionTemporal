class RegisterModule {

    constructor() {
        this.httpRequestService = new HttpRequestService();
        this.container = document.getElementById('app-container');
        this.URL = './_content/_php/controllerAdmin.php';
        this.username = document.getElementById('username');
        this.pantallaprincipal();
        this.btnbuscar = document.getElementById('btnbuscar');
    }



    index() {
        this.UsuariosRegistrados();
    }

    pantallaprincipal() {
        // Crear elementos
        const h2Titulo = document.createElement('h2');
        h2Titulo.classList.add('text-center', 'text-2xl', 'font-semibold', 'text-gray-900', 'mt-6');
        h2Titulo.textContent = 'Registro de accesos';
    
        const divPrincipal = document.createElement('div');
        divPrincipal.classList.add('min-h-screen', 'flex', 'flex-col', 'py-8', 'px-4', 'sm:px-6', 'lg:px-8');
    
        const divContenedor = document.createElement('div');
        divContenedor.classList.add('mt-4', 'sm:mx-auto', 'sm:w-full', 'sm:max-w-md');
    
        const divInterior = document.createElement('div');
        divInterior.classList.add('bg-white', 'py-2', 'px-4', 'shadow', 'sm:rounded-lg', 'sm:px-10');
    
        const h2Buscar = document.createElement('h2');
        h2Buscar.classList.add('text-center', 'text-2xl', 'font-semibold', 'text-gray-900', 'mb-6');
        h2Buscar.textContent = 'Buscar por SAP';
    
        const divFormulario = document.createElement('div');
        divFormulario.classList.add('mb-4');
    
        const labelSAP = document.createElement('label');
        labelSAP.setAttribute('for', 'username');
        labelSAP.classList.add('block', 'text-sm', 'font-medium', 'text-gray-700');
        labelSAP.textContent = 'SAP';
    
        const inputSAP = document.createElement('input');
        inputSAP.setAttribute('type', 'text');
        inputSAP.setAttribute('name', 'username');
        inputSAP.setAttribute('id', 'username');
        inputSAP.setAttribute('autocomplete', 'username');
        inputSAP.setAttribute('required', '');
        inputSAP.classList.add('mt-1', 'focus:ring-indigo-500', 'focus:border-indigo-500', 'block', 'w-full', 'shadow-sm', 'sm:text-sm', 'border-gray-300', 'rounded-md', 'py-2', 'px-3');
    
        const divBoton = document.createElement('div');
        divBoton.classList.add('mt-6');
    
        const btnBuscar = document.createElement('button');
        btnBuscar.setAttribute('id', 'btnbuscar');
        btnBuscar.setAttribute('type', 'button');
        btnBuscar.classList.add('w-full', 'flex', 'justify-center', 'py-2', 'px-4', 'border', 'border-transparent', 'rounded-md', 'shadow-sm', 'text-sm', 'font-medium', 'text-white', 'bg-indigo-600', 'hover:bg-indigo-700', 'focus:outline-none', 'focus:ring-2', 'focus:ring-offset-2', 'focus:ring-indigo-500');
        btnBuscar.textContent = 'Buscar';
    
        // Asignar this.btnbuscar al botón btnBuscar
        this.btnbuscar = btnBuscar;
    
        const divRegistrados = document.createElement('div');
        divRegistrados.setAttribute('id', 'registrados');
        divRegistrados.classList.add('mt-4');
    
        const divModal = document.createElement('div');
        divModal.setAttribute('id', 'modal');
    
        // Agregar elementos al DOM
        divBoton.appendChild(btnBuscar);
        divFormulario.appendChild(labelSAP);
        divFormulario.appendChild(inputSAP);
        divInterior.appendChild(h2Buscar);
        divInterior.appendChild(divFormulario);
        divInterior.appendChild(divBoton);
        divContenedor.appendChild(divInterior);
        divPrincipal.appendChild(divContenedor);
        divPrincipal.appendChild(divRegistrados);
        divPrincipal.appendChild(divModal);
        this.container.appendChild(h2Titulo);
        this.container.appendChild(divPrincipal);
        this.btnbuscar.addEventListener('click', () => this.existe(inputSAP.value)); // Modificación aquí
    }
    




    existe(username) {
        let data_post = {
            username: username,
            action: 'handlerUserExiste',
        };
        this.httpRequestService.makeRequest({
            url: this.URL,
            method: 'POST',
            data: data_post,
            successCallback: this.handlerUserExiste.bind(this),
            errorCallback: this.handleRequestError.bind(this)
        });
    }

    handlerUserExiste = data => {
        if (data.success) {
            this.registrar(data.data.datos[0].username);
            this.username.value = '';

        } else {
            this.mostrarModal();
            this.username.value = '';

        }
    }

    registrar(username) {
        let data_post = {
            username: username,
            action: 'handlerUserRegistrar',
        };
        this.httpRequestService.makeRequest({
            url: this.URL,
            method: 'POST',
            data: data_post,
            successCallback: this.handlerUserRegistrar.bind(this),
            errorCallback: this.handleRequestError.bind(this)
        });
        this.RegistroNombre(username);
    }

    handlerUserRegistrar = data => {

        if (data.success) {
            this.username.value = '';
            this.UsuariosRegistrados();
        } else {
            console.log('Error al registrar usuario');
        }
    }

    RegistroNombre(username) {
        let data_post = {
            username: username,
            action: 'handlerRegistroNombre',
        };
        this.httpRequestService.makeRequest({
            url: this.URL,
            method: 'POST',
            data: data_post,
            successCallback: this.handlerRegistroNombre.bind(this),
            errorCallback: this.handleRequestError.bind(this)
        });
    }


    handlerRegistroNombre = data => {
        if (data.success) {
            const modalContainer = document.getElementById('modal');
            // Crear el modal
            const modal = document.createElement('div');
            modal.id = 'modal-container';
            // Obtener los datos del usuario
            const { username, nombre, apaterno } = data.data.datos[0];
            // Contenido del modal con los datos del usuario
            modal.innerHTML = `
                <div id="modal-content" class="text-center">
                    <h2 class="text-xl font-bold mb-4">Registro Exitoso</h2>
                    <p class="mb-4">¡Bienvenido ${nombre} ${apaterno} (${username})! Su registro ha sido exitoso.</p>
                    <button id="cerrar-modal" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Cerrar</button>
                </div>
            `;
            // Agregar el modal al contenedor
            modalContainer.appendChild(modal);
            // Mostrar el modal
            modal.style.display = 'flex';
            // Escuchar el evento de clic en el botón de cerrar
            document.getElementById('cerrar-modal').addEventListener('click', () => {
                modal.style.display = 'none';
                // Remover el modal del contenedor
                modalContainer.removeChild(modal);
            });
            this.UsuariosRegistrados();
        } else {
            // Manejar el caso en que el registro no sea exitoso
        }
    }




    UsuariosRegistrados() {
        let data_post = {
            action: 'handlerUserRegistrados',
        };
        this.httpRequestService.makeRequest({
            url: this.URL,
            method: 'POST',
            data: data_post,
            successCallback: this.handlerUserRegistrados.bind(this),
            errorCallback: this.handleRequestError.bind(this)
        });
    }
    
    handlerUserRegistrados = data => {
        if (data.success) {
            const usuarios = data.data.datos;
    
            // Objeto para almacenar usuarios agrupados por fecha
            const usuariosPorFecha = {};
    
            // Agrupar usuarios por fecha
            usuarios.forEach(usuario => {
                const fecha = usuario.fecha_sin_hora; // Suponiendo que "fecha_sin_hora" es la clave correcta
                if (!usuariosPorFecha[fecha]) {
                    usuariosPorFecha[fecha] = [];
                }
                usuariosPorFecha[fecha].push(usuario);
            });
    
            // Obtener las fechas únicas y ordenarlas de forma descendente
            const fechasUnicas = Object.keys(usuariosPorFecha).sort((a, b) => new Date(b) - new Date(a));
    
            // Crear opciones del menú desplegable
            const select = document.createElement('select');
            select.classList.add('block', 'w-full', 'p-2', 'border', 'border-gray-300', 'rounded-md', 'focus:outline-none', 'focus:border-indigo-500');
            select.addEventListener('change', () => {
                const selectedDate = select.value;
                const usuariosSeleccionados = usuariosPorFecha[selectedDate] || [];
                this.actualizarTablaUsuarios(usuariosSeleccionados);
            });
    
            fechasUnicas.forEach(fecha => {
                const option = document.createElement('option');
                option.value = fecha;
                option.textContent = fecha;
                select.appendChild(option);
            });
    
            // Crear tabla de usuarios
            const tablaHTML = this.crearTablaUsuarios([]);
    
            // Agregar menú desplegable y tabla al contenedor "registrados"
            const registradosDiv = document.getElementById('registrados');
            registradosDiv.innerHTML = '';
            registradosDiv.appendChild(select);
            registradosDiv.appendChild(tablaHTML);
    
            // Obtener la fecha más reciente y actualizar tabla con esa fecha por defecto
            const fechaMasReciente = fechasUnicas[0];
            const usuariosFechaMasReciente = usuariosPorFecha[fechaMasReciente] || [];
            this.actualizarTablaUsuarios(usuariosFechaMasReciente);
    
            // Establecer la fecha más reciente como la opción seleccionada por defecto en el select
            select.value = fechaMasReciente;
        }
    }
    
    
    actualizarTablaUsuarios = usuarios => {
        // Crear tabla de usuarios y agregarla al contenedor "registrados"
        const tablaHTML = this.crearTablaUsuarios(usuarios);
        const registradosDiv = document.getElementById('registrados');
        registradosDiv.querySelector('table').replaceWith(tablaHTML);
    }
    
    crearTablaUsuarios = usuarios => {
        const tablaHTML = document.createElement('table');
        tablaHTML.classList.add('min-w-full', 'divide-y', 'divide-gray-200');
    
        const thead = document.createElement('thead');
        thead.classList.add('bg-gray-50');
    
        const trHead = document.createElement('tr');
        ['Username', 'nombre' , 'hora'].forEach(texto => {
            const th = document.createElement('th');
            th.setAttribute('scope', 'col');
            th.classList.add('px-6', 'py-3', 'text-left', 'text-xs', 'font-medium', 'text-gray-500', 'uppercase', 'tracking-wider');
            th.textContent = texto;
            trHead.appendChild(th);
        });
        thead.appendChild(trHead);
        tablaHTML.appendChild(thead);
    
        const tbody = document.createElement('tbody');
        tbody.classList.add('bg-white', 'divide-y', 'divide-gray-200');
        usuarios.forEach(usuario => {
            const trBody = document.createElement('tr');
            ['username','nombre', 'hora'].forEach(propiedad => {
                const td = document.createElement('td');
                td.classList.add('px-6', 'py-4', 'whitespace-nowrap');
                td.textContent = usuario[propiedad];
                trBody.appendChild(td);
            });
            tbody.appendChild(trBody);
        });
        tablaHTML.appendChild(tbody);
    
        return tablaHTML;
    }
    

    mostrarModal() {
        const modalContainer = document.getElementById('modal');
        // Crear el modal
        const modal = document.createElement('div');
        modal.id = 'modal-container';
        // Contenido del modal
        modal.innerHTML = `
          <div id="modal-content" class="text-center">
            <h2 class="text-xl font-bold mb-4">Usuario no existe</h2>
            <p class="mb-4">El usuario que ingresaste no existe.</p>
            
            <button id="cerrar-modal" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Cerrar</button>
          </div>
        `;
        // Agregar el modal al contenedor
        modalContainer.appendChild(modal);
        // Mostrar el modal
        modal.style.display = 'flex';
        // Escuchar el evento de clic en el botón de cerrar
        document.getElementById('cerrar-modal').addEventListener('click', () => {
            modal.style.display = 'none';
            this.username.value = '';
            // Remover el modal del contenedor
            modalContainer.removeChild(modal);
        });
    }

    handleRequestError = error => {
        console.error(error);
    }

}
