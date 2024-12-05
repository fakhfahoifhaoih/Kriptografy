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

// Fungsi Auto-Key Vigenère Cipher
function autoKeyVigenere(text, key, decrypt = false) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    text = text.toUpperCase().replace(/[^A-Z]/g, ""); // Bersihkan teks dari karakter non-alfabet
    key = key.toUpperCase().replace(/[^A-Z]/g, ""); // Bersihkan kunci dari karakter non-alfabet

    let result = "";
    let autoKey = key;

    if (decrypt) {
        // Proses dekripsi
        for (let i = 0; i < text.length; i++) {
            const textCharIndex = alphabet.indexOf(text[i]);
            const keyCharIndex = alphabet.indexOf(autoKey[i]);

            if (textCharIndex === -1 || keyCharIndex === -1) {
                result += text[i]; // Tambahkan karakter non-alfabet langsung ke hasil
            } else {
                const decryptedIndex = (textCharIndex - keyCharIndex + 26) % 26;
                const decryptedChar = alphabet[decryptedIndex];
                result += decryptedChar;

                // Tambahkan karakter hasil dekripsi ke kunci otomatis
                autoKey += decryptedChar;
            }
        }
    } else {
        // Proses enkripsi
        for (let i = 0; i < text.length; i++) {
            const textCharIndex = alphabet.indexOf(text[i]);
            const keyCharIndex = alphabet.indexOf(autoKey[i]);

            if (textCharIndex === -1 || keyCharIndex === -1) {
                result += text[i]; // Tambahkan karakter non-alfabet langsung ke hasil
            } else {
                const encryptedIndex = (textCharIndex + keyCharIndex) % 26;
                const encryptedChar = alphabet[encryptedIndex];
                result += encryptedChar;

                // Tambahkan karakter teks asli ke kunci otomatis
                autoKey += text[i];
            }
        }
    }

    return result;
}

// Fungsi untuk mengenkripsi menggunakan Auto-Key Vigenère Cipher
function encryptAutoKeyVigenere() {
    const text = document.getElementById("autoKeyVigenereText").value;
    const key = document.getElementById("autoKeyVigenereKey").value;
    const encryptedText = autoKeyVigenere(text, key);
    document.getElementById("autoKeyVigenereResult").value = encryptedText;
}

// Fungsi untuk mendekripsi menggunakan Auto-Key Vigenère Cipher
function decryptAutoKeyVigenere() {
    const text = document.getElementById("autoKeyVigenereText").value;
    const key = document.getElementById("autoKeyVigenereKey").value;
    const decryptedText = autoKeyVigenere(text, key, true);
    document.getElementById("autoKeyVigenereResult").value = decryptedText;
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


// Membuat matriks kunci untuk Playfair Cipher
function createPlayfairMatrix(key) {
    const matrix = [];
    const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"; // Menggunakan 'I' untuk menggantikan 'J'
    let keySet = new Set();

    // Menghilangkan duplikasi dan mengganti 'J' dengan 'I'
    key = key.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");

    // Menambahkan karakter dari kunci ke dalam matriks
    for (let char of key) {
        keySet.add(char);
    }

    // Menambahkan huruf dari alfabet yang belum ada dalam kunci
    for (let char of alphabet) {
        if (!keySet.has(char)) {
            keySet.add(char);
        }
    }

    // Mengonversi keySet menjadi array dan membaginya ke dalam 5x5 matriks
    const matrixArray = Array.from(keySet);
    for (let i = 0; i < 5; i++) {
        matrix.push(matrixArray.slice(i * 5, i * 5 + 5));
    }

    return matrix;
}

// Mendapatkan posisi huruf dalam matriks
function getPosition(matrix, char) {
    for (let row = 0; row < matrix.length; row++) {
        const col = matrix[row].indexOf(char);
        if (col !== -1) return { row, col };
    }
    return null;
}

// Fungsi untuk mengenkripsi teks dengan Playfair Cipher
function encryptPlayfair() {
    const text = document.getElementById("playfairText").value.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");
    const key = document.getElementById("playfairKey").value;
    const matrix = createPlayfairMatrix(key);

    let result = "";
    let i = 0;

    // Memproses pasangan huruf
    while (i < text.length) {
        let a = text[i];
        let b = text[i + 1] || "X"; // Jika huruf kedua tidak ada, isi dengan 'X'
        
        if (a === b) b = "X"; // Ganti pasangan huruf yang sama dengan 'X'

        const posA = getPosition(matrix, a);
        const posB = getPosition(matrix, b);

        if (posA.row === posB.row) {
            // Jika berada di baris yang sama, geser ke kanan
            result += matrix[posA.row][(posA.col + 1) % 5];
            result += matrix[posB.row][(posB.col + 1) % 5];
        } else if (posA.col === posB.col) {
            // Jika berada di kolom yang sama, geser ke bawah
            result += matrix[(posA.row + 1) % 5][posA.col];
            result += matrix[(posB.row + 1) % 5][posB.col];
        } else {
            // Jika berbentuk persegi panjang, tukar kolom
            result += matrix[posA.row][posB.col];
            result += matrix[posB.row][posA.col];
        }

        i += 2; // Lanjutkan ke pasangan berikutnya
    }

    document.getElementById("playfairResult").value = result;
}

// Fungsi untuk mendekripsi teks dengan Playfair Cipher
function decryptPlayfair() {
    const text = document.getElementById("playfairText").value.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");
    const key = document.getElementById("playfairKey").value;
    const matrix = createPlayfairMatrix(key);

    let result = "";
    let i = 0;

    // Memproses pasangan huruf
    while (i < text.length) {
        let a = text[i];
        let b = text[i + 1] || "X"; // Jika huruf kedua tidak ada, isi dengan 'X'

        const posA = getPosition(matrix, a);
        const posB = getPosition(matrix, b);

        if (posA.row === posB.row) {
            // Jika berada di baris yang sama, geser ke kiri
            result += matrix[posA.row][(posA.col + 4) % 5];
            result += matrix[posB.row][(posB.col + 4) % 5];
        } else if (posA.col === posB.col) {
            // Jika berada di kolom yang sama, geser ke atas
            result += matrix[(posA.row + 4) % 5][posA.col];
            result += matrix[(posB.row + 4) % 5][posB.col];
        } else {
            // Jika berbentuk persegi panjang, tukar kolom
            result += matrix[posA.row][posB.col];
            result += matrix[posB.row][posA.col];
        }

        i += 2; // Lanjutkan ke pasangan berikutnya
    }

    document.getElementById("playfairResult").value = result;
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

// Fungsi untuk mencari invers modulo 26
function modInverse(a, m) {
    a = a % m;
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) {
            return x;
        }
    }
    return -1; // Tidak ada invers jika tidak ditemukan
}

// Fungsi enkripsi Affine Cipher
function affineEncrypt(text, a, b) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        const char = text[i].toUpperCase();
        if (/[A-Z]/.test(char)) {
            const x = char.charCodeAt(0) - 'A'.charCodeAt(0);
            const encryptedChar = (a * x + b) % 26;
            result += String.fromCharCode(encryptedChar + 'A'.charCodeAt(0));
        } else {
            result += char; // Jika bukan huruf, langsung masukkan
        }
    }
    return result;
}

// Fungsi dekripsi Affine Cipher
function affineDecrypt(text, a, b) {
    let result = '';
    const modInvA = modInverse(a, 26); // Cari invers a modulo 26
    if (modInvA === -1) {
        return "Tidak ada invers untuk nilai 'a'. Dekripsi tidak bisa dilakukan.";
    }

    for (let i = 0; i < text.length; i++) {
        const char = text[i].toUpperCase();
        if (/[A-Z]/.test(char)) {
            const y = char.charCodeAt(0) - 'A'.charCodeAt(0);
            const decryptedChar = (modInvA * (y - b + 26)) % 26; // Proses dekripsi
            result += String.fromCharCode(decryptedChar + 'A'.charCodeAt(0));
        } else {
            result += char; // Jika bukan huruf, langsung masukkan
        }
    }
    return result;
}

// Fungsi untuk mengenkripsi Affine Cipher
function encryptAffine() {
    const text = document.getElementById('affineText').value;
    const a = parseInt(document.getElementById('affineA').value);
    const b = parseInt(document.getElementById('affineB').value);
    
    // Pastikan 'a' dan 'b' adalah angka valid
    if (isNaN(a) || isNaN(b)) {
        alert("Kunci a dan b harus berupa angka.");
        return;
    }

    document.getElementById('affineResult').value = affineEncrypt(text, a, b);
}

// Fungsi untuk mendekripsi Affine Cipher
function decryptAffine() {
    const text = document.getElementById('affineText').value;
    const a = parseInt(document.getElementById('affineA').value);
    const b = parseInt(document.getElementById('affineB').value);

    // Pastikan 'a' dan 'b' adalah angka valid
    if (isNaN(a) || isNaN(b)) {
        alert("Kunci a dan b harus berupa angka.");
        return;
    }

    document.getElementById('affineResult').value = affineDecrypt(text, a, b);
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


// Extended Vigenère Cipher (untuk karakter ASCII)
function extendedVigenere(text, key, decrypt = false) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    let j = 0;

    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i);
        let keyChar = key.charCodeAt(j % key.length);
        let shift = decrypt ? (charCode - keyChar + 256) % 256 : (charCode + keyChar) % 256;
        result += String.fromCharCode(shift);
        j++;
    }

    return result;
}
// Columnar Transposition Cipher (untuk enkripsi)
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
    for (let i = 0; i < numCols; i++) {
        const col = key.indexOf(key[i]);
        for (let row = 0; row < numRows; row++) {
            result += grid[row][col];
        }
    }

    return result;
}

// Columnar Transposition Cipher (untuk dekripsi)
function columnarTranspositionDecrypt(text, key) {
    const numCols = key.length;
    const numRows = Math.ceil(text.length / numCols);
    const grid = Array.from({ length: numRows }, () => Array(numCols).fill(' '));

    let idx = 0;
    for (let i = 0; i < numCols; i++) {
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
// Super Encryption (gabungkan Extended Vigenère dan Columnar Transposition)
function encryptSuper() {
    const text = document.getElementById("superEncryptionText").value;
    const key = document.getElementById("superEncryptionKey").value;

    // Langkah 1: Enkripsi menggunakan Extended Vigenère Cipher
    const vigenereEncrypted = extendedVigenere(text, key);

    // Langkah 2: Enkripsi menggunakan Columnar Transposition Cipher
    const superEncrypted = columnarTranspositionEncrypt(vigenereEncrypted, key);

    // Tampilkan hasil
    document.getElementById("superEncryptionResult").value = superEncrypted;
}

// Super Encryption (dekripsi dengan urutan kebalikan)
function decryptSuper() {
    const text = document.getElementById("superEncryptionText").value;
    const key = document.getElementById("superEncryptionKey").value;

    // Langkah 1: Dekripsi menggunakan Columnar Transposition Cipher
    const transpositionDecrypted = columnarTranspositionDecrypt(text, key);

    // Langkah 2: Dekripsi menggunakan Extended Vigenère Cipher
    const superDecrypted = extendedVigenere(transpositionDecrypted, key, true);

    // Tampilkan hasil
    document.getElementById("superEncryptionResult").value = superDecrypted;
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
