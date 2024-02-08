class RegisterModule {

    constructor() {
        this.httpRequestService = new HttpRequestService();
        this.URL = './_content/_php/controllerAdmin.php';
        this.username = document.getElementById('username')
        this.btnbuscar = document.getElementById('btnbuscar');
        this.UsuariosRegistrados();
        this.btnbuscar.addEventListener('click', () => this.existe(this.username.value)); // Modificación aquí
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
            
            // Actualizar contador
            const contador = usuarios.length;

            
            const tablaHTML = document.createElement('table');
            tablaHTML.classList.add('min-w-full', 'divide-y', 'divide-gray-200');
            
            const thead = document.createElement('thead');
            thead.classList.add('bg-gray-50');
    
            // Agregar fila de encabezado para el contador
            const trCount = document.createElement('tr');
            const thCount = document.createElement('th');
            thCount.setAttribute('colspan', '3'); // Ajustar el colspan al número de columnas
            thCount.classList.add('px-6', 'py-3', 'text-left', 'text-xs', 'font-medium', 'text-gray-500', 'uppercase', 'tracking-wider');
            thCount.textContent = 'Total registros: ' + contador;
            trCount.appendChild(thCount);
            thead.appendChild(trCount);
    
            const trHead = document.createElement('tr');
            ['ID', 'Username', 'Fecha'].forEach(texto => {
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
                ['id', 'username', 'fecha'].forEach(propiedad => {
                    const td = document.createElement('td');
                    td.classList.add('px-6', 'py-4', 'whitespace-nowrap');
                    td.textContent = usuario[propiedad];
                    trBody.appendChild(td);
                });
                tbody.appendChild(trBody);
            });
            tablaHTML.appendChild(tbody);
    
            // Agregar tabla completa al contenedor
            const registradosDiv = document.getElementById('registrados');
            registradosDiv.innerHTML = '';
            registradosDiv.appendChild(tablaHTML);
        }
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
