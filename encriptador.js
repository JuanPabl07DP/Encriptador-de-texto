const encryptionRules = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
};

const decryptionRules = Object.fromEntries(
    Object.entries(encryptionRules).map(([key, value]) => [value, key])
);

function validateInput(text) {
    const invalidChars = /[ÁÉÍÓÚÑáéíóúüñ]|[A-Z]/;
    return !invalidChars.test(text);
}

function showAlert(message) {
    const alertDiv = document.getElementById('alert');
    const alertText = document.getElementById('alert-text');
    alertText.innerText = message;
    alertDiv.style.display = 'flex';
}

function hideAlert() {
    const alertDiv = document.getElementById('alert');
    alertDiv.style.display = 'none';
}

function encrypt(text) {
    return text.split('').map(char => encryptionRules[char] || char).join('');
}

function decrypt(text) {
    return Object.keys(decryptionRules).reduce(
        (acc, key) => acc.replace(new RegExp(key, 'g'), decryptionRules[key]),
        text
    );
}

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

function copyToClipboard() {
    const text = document.getElementById('output-text').innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert('¡Texto copiado al portapapeles!');
    }).catch(err => {
        console.error('Error al copiar al portapapeles: ', err);
    });
}




