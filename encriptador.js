/*
Desarrollado por JuanPabl07DP
 */

// Reglas para encriptar caracteres
const encryptionRules = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
};

// Reglas para desencriptar caracteres, invirtiendo las reglas de encriptación
const decryptionRules = Object.fromEntries(
    Object.entries(encryptionRules).map(([key, value]) => [value, key])
);

/**
 * Valida si el texto contiene caracteres no permitidos.
 * @param {string} text - El texto a validar.
 * @returns {boolean} - Retorna true si el texto es válido, false si contiene caracteres no permitidos.
 */
function validateInput(text) {
    const invalidChars = /[ÁÉÍÓÚÑáéíóúüñ]|[A-Z]/;
    return !invalidChars.test(text);
}

/**
 * Muestra un mensaje de alerta en la interfaz de usuario.
 * @param {string} message - El mensaje de alerta a mostrar.
 */
function showAlert(message) {
    const alertDiv = document.getElementById('alert');
    const alertText = document.getElementById('alert-text');
    alertText.innerText = message;
    alertDiv.style.display = 'flex';
}

/**
 * Oculta el mensaje de alerta en la interfaz de usuario.
 */
function hideAlert() {
    const alertDiv = document.getElementById('alert');
    alertDiv.style.display = 'none';
}

/**
 * Encripta el texto según las reglas definidas en encryptionRules.
 * @param {string} text - El texto a encriptar.
 * @returns {string} - El texto encriptado.
 */
function encrypt(text) {
    return text.split('').map(char => encryptionRules[char] || char).join('');
}

/**
 * Desencripta el texto según las reglas definidas en decryptionRules.
 * @param {string} text - El texto a desencriptar.
 * @returns {string} - El texto desencriptado.
 */
function decrypt(text) {
    return Object.keys(decryptionRules).reduce(
        (acc, key) => acc.replace(new RegExp(key, 'g'), decryptionRules[key]),
        text
    );
}

/**
 * Muestra el resultado (texto encriptado o desencriptado) en la interfaz de usuario.
 * Oculta la imagen y el párrafo informativo, y muestra el botón de copiar.
 * @param {string} text - El texto a mostrar.
 */
function showResults(text) {
    const outputText = document.getElementById('output-text');
    const lolitaImage = document.getElementById('lolita-image');
    const copyButton = document.getElementById('copy-button');
    const paragraph = document.querySelector('.presentation__output .paragraph');

    outputText.innerText = text || 'Ningún mensaje fue encontrado';

    lolitaImage.style.display = 'none';
    paragraph.style.display = 'none';

    copyButton.style.display = 'block';
}

/**
 * Maneja el evento de clic del botón de encriptar.
 * Valida la entrada, encripta el texto y muestra los resultados.
 */
function buttonEncrypt() {
    const input = document.getElementById('input').value;
    if (!validateInput(input)) {
        showAlert('Por favor, ingrese solo letras minúsculas sin acentos.');
        document.getElementById('output-text').innerText = '';
        return;
    }
    hideAlert();
    const encryptedText = encrypt(input);
    showResults(encryptedText);
}

/**
 * Maneja el evento de clic del botón de desencriptar.
 * Valida la entrada, desencripta el texto y muestra los resultados.
 */
function buttonDesencrypt() {
    const input = document.getElementById('input').value;
    if (!validateInput(input)) {
        showAlert('Por favor, ingrese solo letras minúsculas sin acentos.');
        document.getElementById('output-text').innerText = '';
        return;
    }
    hideAlert();
    const decryptedText = decrypt(input);
    showResults(decryptedText);
}

/**
 * Copia el texto encriptado/desencriptado al portapapeles.
 */
function copyToClipboard() {
    const text = document.getElementById('output-text').innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert('¡Texto copiado al portapapeles!');
    }).catch(err => {
        console.error('Error al copiar al portapapeles: ', err);
    });
}





