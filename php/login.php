<?php
/* ─────────────────────────────────────────────────────────────
   JakMiris – login.php
   Accepts POST: email, password
   Returns JSON: { success, message, redirect }
   ───────────────────────────────────────────────────────────── */

session_start();
header('Content-Type: application/json; charset=utf-8');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

require_once __DIR__ . '/db.php';

// ── Sanitise inputs ───────────────────────────────────────────
$email    = trim(filter_input(INPUT_POST, 'email',    FILTER_SANITIZE_EMAIL) ?? '');
$password = trim(filter_input(INPUT_POST, 'password', FILTER_DEFAULT)        ?? '');

if ($email === '' || $password === '') {
    echo json_encode(['success' => false, 'message' => 'E-mel dan kata laluan diperlukan.']);
    exit;
}

// ── Lookup user ───────────────────────────────────────────────
try {
    $pdo  = getPDO();
    $stmt = $pdo->prepare('SELECT id, name, email, password_hash FROM users WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);
    $user = $stmt->fetch();
} catch (PDOException $e) {
    error_log('DB error (login): ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Ralat pelayan. Sila cuba lagi.']);
    exit;
}

// ── Verify password ───────────────────────────────────────────
if (!$user || !password_verify($password, $user['password_hash'])) {
    // Uniform message to prevent user-enumeration
    echo json_encode(['success' => false, 'message' => 'E-mel atau kata laluan tidak sah.']);
    exit;
}

// ── Create session ────────────────────────────────────────────
session_regenerate_id(true);
$_SESSION['user_id']   = $user['id'];
$_SESSION['user_name'] = $user['name'];
$_SESSION['user_email']= $user['email'];

echo json_encode([
    'success'  => true,
    'message'  => 'Log masuk berjaya.',
    'redirect' => '../index.html',
]);
