document.addEventListener('DOMContentLoaded', function() {
    var formulario = document.getElementById('registroForm');
    var nombre = document.getElementById('nombre');
    var correo = document.getElementById('correo');
    var contrasena = document.getElementById('contrasena');
    var confirmarContrasena = document.getElementById('confirmarContrasena');

    // Contadores para limitar intentos
    var intentos = 0;
    var maxIntentos = 3;

    // Creación de elementos para mensajes de error
    var errorNombre = document.createElement('span');
    var errorCorreo = document.createElement('span');
    var errorContrasena = document.createElement('span');
    var errorConfirmarContrasena = document.createElement('span');

    errorNombre.classList.add('error');
    errorCorreo.classList.add('error');
    errorContrasena.classList.add('error');
    errorConfirmarContrasena.classList.add('error');

    nombre.parentNode.appendChild(errorNombre);
    correo.parentNode.appendChild(errorCorreo);
    contrasena.parentNode.appendChild(errorContrasena);
    confirmarContrasena.parentNode.appendChild(errorConfirmarContrasena);

    formulario.addEventListener('submit', function eventoSubmit(event) {
        event.preventDefault(); // Evita el envío del formulario

        intentos++;

        var formValido = true;

        // Resetear mensajes de error
        errorNombre.textContent = '';
        errorCorreo.textContent = '';
        errorContrasena.textContent = '';
        errorConfirmarContrasena.textContent = '';

        // Validación del campo 'Nombre completo'
        if (nombre.value.trim() === '') {
            errorNombre.textContent = 'Por favor, ingresa tu nombre completo.';
            formValido = false;
        }

        // Validación del correo electrónico
        if (!validarEmail(correo.value)) {
            errorCorreo.textContent = 'Por favor, ingresa un correo electrónico válido.';
            formValido = false;
        }

        // Validación de la contraseña
        if (contrasena.value.length < 6) {
            errorContrasena.textContent = 'La contraseña debe tener al menos 6 caracteres.';
            formValido = false;
        }

        // Verificación de coincidencia de contraseñas
        if (contrasena.value !== confirmarContrasena.value) {
            errorConfirmarContrasena.textContent = 'Las contraseñas no coinciden.';
            formValido = false;
        }

        // Verificar si se alcanzó el número máximo de intentos
        if (intentos >= maxIntentos && !formValido) {
            formulario.removeEventListener('submit', eventoSubmit);
            alert('Has alcanzado el número máximo de intentos.');
            formulario.reset();
            return;
        }

        if (formValido) {
            // Simulación de registro exitoso
            var usuario = {
                nombre: nombre.value,
                correo: correo.value,
                contrasena: contrasena.value
            };

            console.log('Usuario registrado:', usuario);
            alert('¡Registro exitoso!\nBienvenido, ' + usuario.nombre);

            // Reiniciar el formulario y contador de intentos
            formulario.reset();
            intentos = 0;
        }
    });

    // Función para validar el formato del correo electrónico
    function validarEmail(email) {
        var regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexCorreo.test(email);
    }
});
