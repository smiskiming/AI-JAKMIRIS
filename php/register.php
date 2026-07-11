<?php
/* ─────────────────────────────────────────────────────────────
   JakMiris – register.php
   Accepts POST: name, email, phone, password
   Returns JSON: { success, message }
   ───────────────────────────────────────────────────────────── */

session_start();
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

require_once __DIR__ . '/db.php';

// ── Sanitise & validate inputs ────────────────────────────────
$name     = trim(filter_input(INPUT_POST, 'name',     FILTER_SANITIZE_FULL_SPECIAL_CHARS) ?? '');
$email    = trim(filter_input(INPUT_POST, 'email',    FILTER_SANITIZE_EMAIL)              ?? '');
$phone    = trim(filter_input(INPUT_POST, 'phone',    FILTER_SANITIZE_FULL_SPECIAL_CHARS) ?? '');
$password = trim(filter_input(INPUT_POST, 'password', FILTER_DEFAULT)                     ?? '');

$errors = [];

if ($name === '')                                         $errors[] = 'Nama penuh diperlukan.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL))           $errors[] = 'Alamat e-mel tidak sah.';
if (mb_strlen($password) < 8)                             $errors[] = 'Kata laluan sekurang-kurangnya 8 aksara.';
if ($phone !== '' && !preg_match('/^\+?[\d\s\-()\\.]{7,20}$/', $phone))
                                                          $errors[] = 'Format nombor telefon tidak sah.';

if (!empty($errors)) {
    echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
    exit;
}

try {
    $pdo = getPDO();

    // Check duplicate email
    $check = $pdo->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
    $check->execute([$email]);
    if ($check->fetch()) {
        echo json_encode(['success' => false, 'message' => 'E-mel ini sudah berdaftar.']);
        exit;
    }

    // Hash password with bcrypt (cost 12)
    $hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

    $insert = $pdo->prepare(
        'INSERT INTO users (name, email, phone, password_hash, created_at)
         VALUES (?, ?, ?, ?, NOW())'
    );
    $insert->execute([$name, $email, $phone ?: null, $hash]);

} catch (PDOException $e) {
    error_log('DB error (register): ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Ralat pelayan. Sila cuba lagi.']);
    exit;
}

echo json_encode(['success' => true, 'message' => 'Akaun berjaya dibuat.']);
