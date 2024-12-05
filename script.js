// Fungsi untuk menampilkan section yang dipilih
function showSection(sectionId) {
    document.querySelectorAll('.content').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Vigenère Cipher Enkripsi dan Dekripsi
function vigenere(text, key, decrypt = false) {
    let result = '';
    let j = 0;
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (/[A-Za-z]/.test(char)) {
            const isUpper = char === char.toUpperCase();
            const base = isUpper ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            const textChar = char.charCodeAt(0) - base;
            const keyChar = key[j % key.length].toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
            const shift = decrypt ? (textChar - keyChar + 26) % 26 : (textChar + keyChar) % 26;
            result += String.fromCharCode(shift + base);
            j++;
        } else {
            result += char;
        }
    }
    return result;
}

function encryptVigenere() {
    const text = document.getElementById('vigenereText').value;
    const key = document.getElementById('vigenereKey').value;
    document.getElementById('vigenereResult').value = vigenere(text, key);
}

function decryptVigenere() {
    const text = document.getElementById('vigenereText').value;
    const key = document.getElementById('vigenereKey').value;
    document.getElementById('vigenereResult').value = vigenere(text, key, true);
}

// Caesar Cipher Enkripsi dan Dekripsi
function caesarCipher(text, shift, decrypt = false) {
    shift = decrypt ? (26 - shift) % 26 : shift % 26;
    return text.split('').map(char => {
        if (/[A-Za-z]/.test(char)) {
            const base = char <= 'Z' ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            return String.fromCharCode((char.charCodeAt(0) - base + shift) % 26 + base);
        }
        return char;
    }).join('');
}

function encryptCaesar() {
    const text = document.getElementById('caesarText').value;
    const shift = parseInt(document.getElementById('caesarShift').value);
    document.getElementById('caesarResult').value = caesarCipher(text, shift);
}

function decryptCaesar() {
    const text = document.getElementById('caesarText').value;
    const shift = parseInt(document.getElementById('caesarShift').value);
    document.getElementById('caesarResult').value = caesarCipher(text, shift, true);
}

// Auto-Key Vigenère Cipher
function encryptAutoKeyVigenere() {
    const text = document.getElementById('autoKeyVigenereText').value;
    const key = document.getElementById('autoKeyVigenereKey').value;
    document.getElementById('autoKeyVigenereResult').value = autoKeyVigenere(text, key);
}

function decryptAutoKeyVigenere() {
    const text = document.getElementById('autoKeyVigenereText').value;
    const key = document.getElementById('autoKeyVigenereKey').value;
    document.getElementById('autoKeyVigenereResult').value = autoKeyVigenere(text, key, true);
}

function autoKeyVigenere(text, key, decrypt = false) {
    let result = '';
    let j = 0;
    let autoKey = key;
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (/[A-Za-z]/.test(char)) {
            const isUpper = char === char.toUpperCase();
            const base = isUpper ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            const textChar = char.charCodeAt(0) - base;
            const keyChar = autoKey[j % autoKey.length].toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
            const shift = decrypt ? (textChar - keyChar + 26) % 26 : (textChar + keyChar) % 26;
            result += String.fromCharCode(shift + base);
            j++;
            if (j < text.length) autoKey += text[j]; // Update auto-key
        } else {
            result += char;
        }
    }
    return result;
}

// Extended Vigenère Cipher (256 characters ASCII)
function encryptExtendedVigenere() {
    const text = document.getElementById('extendedVigenereText').value;
    const key = document.getElementById('extendedVigenereKey').value;
    document.getElementById('extendedVigenereResult').value = extendedVigenere(text, key);
}

function decryptExtendedVigenere() {
    const text = document.getElementById('extendedVigenereText').value;
    const key = document.getElementById('extendedVigenereKey').value;
    document.getElementById('extendedVigenereResult').value = extendedVigenere(text, key, true);
}

function extendedVigenere(text, key, decrypt = false) {
    let result = '';
    let j = 0;
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const charCode = text.charCodeAt(i);
        const keyChar = key[j % key.length];
        const keyCode = keyChar.charCodeAt(0);
        const shift = decrypt ? (charCode - keyCode + 256) % 256 : (charCode + keyCode) % 256;
        result += String.fromCharCode(shift);
        j++;
    }
    return result;
}


// Playfair Cipher (Placeholder)
function encryptPlayfair() {
    document.getElementById('playfairResult').value = "Playfair enkripsi tidak tersedia";
}

function decryptPlayfair() {
    document.getElementById('playfairResult').value = "Playfair dekripsi tidak tersedia";
}

// Fungsi untuk menampilkan bagian (section) yang dipilih dan menambahkan URL ke riwayat browser
function showSection(sectionId) {
    // Sembunyikan semua bagian konten
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => {
        content.classList.remove('active');
    });

    // Tampilkan bagian yang dipilih
    const section = document.getElementById(sectionId);
    section.classList.add('active');

    // Perbarui URL tanpa memuat ulang halaman
    history.pushState({ section: sectionId }, "", `#${sectionId}`);
}

// Affine Cipher
function encryptAffine() {
    const text = document.getElementById('affineText').value.toUpperCase();
    const a = parseInt(document.getElementById('affineA').value);
    const b = parseInt(document.getElementById('affineB').value);
    document.getElementById('affineResult').value = affineEncrypt(text, a, b);
}

function decryptAffine() {
    const text = document.getElementById('affineText').value.toUpperCase();
    const a = parseInt(document.getElementById('affineA').value);
    const b = parseInt(document.getElementById('affineB').value);
    document.getElementById('affineResult').value = affineDecrypt(text, a, b);
}

function affineEncrypt(text, a, b) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (/[A-Z]/.test(char)) {
            const x = char.charCodeAt(0) - 'A'.charCodeAt(0);
            const encryptedChar = (a * x + b) % 26;
            result += String.fromCharCode(encryptedChar + 'A'.charCodeAt(0));
        } else {
            result += char;
        }
    }
    return result;
}

function affineDecrypt(text, a, b) {
    let result = '';
    const modInverse = modInverse(a, 26);
    if (modInverse === -1) {
        return "Invalid 'a' value, no inverse exists.";
    }
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (/[A-Z]/.test(char)) {
            const y = char.charCodeAt(0) - 'A'.charCodeAt(0);
            const decryptedChar = (modInverse * (y - b + 26)) % 26;
            result += String.fromCharCode(decryptedChar + 'A'.charCodeAt(0));
        } else {
            result += char;
        }
    }
    return result;
}

// Function to find modular inverse
function modInverse(a, m) {
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) {
            return x;
        }
    }
    return -1;
}

function encryptHill() {
    const text = document.getElementById('hillText').value.toUpperCase();
    const matrixInput = document.getElementById('hillMatrix').value.trim();

    // Cek jika input matriks kosong atau tidak valid
    if (!matrixInput) {
        alert('Matriks tidak boleh kosong');
        return;
    }

    // Pisahkan berdasarkan koma untuk mendapatkan dua baris matriks
    const matrix = matrixInput.split(',').map(row => row.trim().split(' ').map(Number));
    
    console.log('Parsed Matrix:', matrix); // Debug: Menampilkan hasil parsing matriks

    // Validasi ukuran matriks 2x2
    if (matrix.length !== 2 || matrix[0].length !== 2 || matrix[1].length !== 2) {
        alert('Hill Cipher requires a 2x2 matrix.');
        return;
    }

    document.getElementById('hillResult').value = hillEncrypt(text, matrix);
}

function decryptHill() {
    const text = document.getElementById('hillText').value.toUpperCase();
    const matrixInput = document.getElementById('hillMatrix').value.trim();

    // Cek jika input matriks kosong atau tidak valid
    if (!matrixInput) {
        alert('Matriks tidak boleh kosong');
        return;
    }

    // Pisahkan berdasarkan koma untuk mendapatkan dua baris matriks
    const matrix = matrixInput.split(',').map(row => row.trim().split(' ').map(Number));

    console.log('Parsed Matrix:', matrix); // Debug: Menampilkan hasil parsing matriks

    // Validasi ukuran matriks 2x2
    if (matrix.length !== 2 || matrix[0].length !== 2 || matrix[1].length !== 2) {
        alert('Hill Cipher requires a 2x2 matrix.');
        return;
    }

    const inverseMatrix = inverseMatrix2x2(matrix);
    if (!inverseMatrix==true) {
        alert('Matriks tidak dapat diinvers.');
        return;
    }

    document.getElementById('hillResult').value = hillDecrypt(text, inverseMatrix);
}

function hillEncrypt(text, matrix) {
    let result = '';
    const textArray = text.replace(/[^A-Z]/g, '').split(''); // Menghilangkan karakter selain A-Z
    while (textArray.length % 2 !== 0) textArray.push('X');  // Padding jika perlu

    for (let i = 0; i < textArray.length; i += 2) {
        const pair = [textArray[i], textArray[i + 1]];
        const encryptedPair = multiplyMatrix(pair, matrix);
        result += String.fromCharCode(encryptedPair[0] + 'A'.charCodeAt(0)) + String.fromCharCode(encryptedPair[1] + 'A'.charCodeAt(0));
    }
    return result;
}

function hillDecrypt(text, matrix) {
    let result = '';
    const textArray = text.replace(/[^A-Z]/g, '').split(''); // Menghilangkan karakter selain A-Z

    for (let i = 0; i < textArray.length; i += 2) {
        const pair = [textArray[i], textArray[i + 1]];
        const decryptedPair = multiplyMatrix(pair, matrix);
        result += String.fromCharCode(decryptedPair[0] + 'A'.charCodeAt(0)) + String.fromCharCode(decryptedPair[1] + 'A'.charCodeAt(0));
    }
    return result;
}

function multiplyMatrix(pair, matrix) {
    const x = pair[0].charCodeAt(0) - 'A'.charCodeAt(0);
    const y = pair[1].charCodeAt(0) - 'A'.charCodeAt(0);
    const result = [
        (matrix[0][0] * x + matrix[0][1] * y) % 26,
        (matrix[1][0] * x + matrix[1][1] * y) % 26
    ];
    return result;
}

// Fungsi untuk menghitung invers matriks 2x2
function inverseMatrix2x2(matrix) {
    const det = (matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]) % 26;
    const invDet = modInverseAffine(det); // Fungsi untuk mencari invers determinan modulo 26
    if (invDet === -1) return null;

    const invMatrix = [
        [matrix[1][1], -matrix[0][1]],
        [-matrix[1][0], matrix[0][0]]
    ];

    // Melakukan operasi modulo 26 dan memastikan elemen tidak negatif
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            invMatrix[i][j] = (invMatrix[i][j] * invDet) % 26;
            if (invMatrix[i][j] < 0) invMatrix[i][j] += 26;
        }
    }

    return invMatrix;
}

// Fungsi untuk mencari invers modulo 26
function modInverseAffine(a) {
    for (let i = 1; i < 26; i++) {
        if ((a * i) % 26 === 1) return i;
    }
    return -1; // Tidak ada invers
}


// Super Encryption (Extended Vigenère + Columnar Transposition)
function encryptSuper() {
    const text = document.getElementById('superEncryptionText').value;
    const key = document.getElementById('superEncryptionKey').value;
    const step1 = extendedVigenere(text, key); // Step 1: Encrypt using Extended Vigenère
    document.getElementById('superEncryptionResult').value = columnarTranspositionEncrypt(step1, key); // Step 2: Columnar Transposition
}

function decryptSuper() {
    const text = document.getElementById('superEncryptionText').value;
    const key = document.getElementById('superEncryptionKey').value;
    const step1 = columnarTranspositionDecrypt(text, key); // Step 1: Decrypt using Columnar Transposition
    document.getElementById('superEncryptionResult').value = extendedVigenere(step1, key, true); // Step 2: Decrypt using Extended Vigenère
}

// Columnar Transposition Cipher
function columnarTranspositionEncrypt(text, key) {
    const numCols = key.length;
    const numRows = Math.ceil(text.length / numCols);
    const grid = Array.from({ length: numRows }, () => Array(numCols).fill(' '));

    let idx = 0;
    for (let col = 0; col < numCols; col++) {
        for (let row = 0; row < numRows; row++) {
            if (idx < text.length) {
                grid[row][col] = text[idx++];
            }
        }
    }

    let result = '';
    for (let i = 0; i < key.length; i++) {
        const col = key.indexOf(key[i]);
        for (let row = 0; row < numRows; row++) {
            result += grid[row][col];
        }
    }
    return result;
}

function columnarTranspositionDecrypt(text, key) {
    const numCols = key.length;
    const numRows = Math.ceil(text.length / numCols);
    const grid = Array.from({ length: numRows }, () => Array(numCols).fill(' '));

    let idx = 0;
    for (let i = 0; i < key.length; i++) {
        const col = key.indexOf(key[i]);
        for (let row = 0; row < numRows; row++) {
            if (idx < text.length) {
                grid[row][col] = text[idx++];
            }
        }
    }

    let result = '';
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            result += grid[row][col];
        }
    }
    return result;
}


// Fungsi untuk mengembalikan ke bagian yang benar saat pengguna menggunakan tombol back/forward
window.onpopstate = function (event) {
    if (event.state && event.state.section) {
        // Tampilkan bagian sesuai dengan data di riwayat
        showSection(event.state.section);
    } else {
        // Jika tidak ada state (misalnya diakses langsung), tampilkan halaman Home
        showSection('home');
    }
};

// Ketika halaman pertama kali dimuat, tampilkan bagian sesuai dengan hash URL
document.addEventListener("DOMContentLoaded", () => {
    const initialSection = window.location.hash.substring(1) || "home";
    showSection(initialSection);
});