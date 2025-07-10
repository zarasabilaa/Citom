<?php
// Koneksi ke database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "umkm";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Proses ketika formulir login disubmit
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Query untuk mendapatkan data pengguna berdasarkan email
    $sql = "SELECT * FROM USER WHERE EMAIL='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Verifikasi password yang dimasukkan dengan password yang ada di database
        if (password_verify($password, $user['PASSWORD'])) {
            echo "Login berhasil. Selamat datang, " . $user['NAMA_LENGKAP'] . "!";
            // Redirect ke halaman dashboard atau halaman utama
            // header("Location: dashboard.php");
        } else {
            echo "Password salah!";
        }
    } else {
        echo "Email tidak ditemukan!";
    }
}

$conn->close();
?>

<!-- Formulir Login -->
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 flex items-center justify-center h-screen">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 class="text-2xl font-semibold text-center text-gray-700 mb-6">Login Akun UMKM</h2>
        <form action="login.php" method="POST" class="space-y-4">
            <div class="flex flex-col">
                <label for="email" class="text-gray-600">Email</label>
                <input type="email" id="email" name="email" class="mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-400" required>
            </div>
            <div class="flex flex-col">
                <label for="password" class="text-gray-600">Password</label>
                <input type="password" id="password" name="password" class="mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-400" required>
            </div>
            <button type="submit" class="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Masuk</button>
        </form>
        <p class="text-center mt-4 text-gray-600">Belum memiliki akun? <a href="register.html" class="text-green-500 hover:underline">Daftar di sini</a></p>
    </div>
</body>
</html>
