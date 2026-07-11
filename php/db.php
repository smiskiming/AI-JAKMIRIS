<?php
/* ─────────────────────────────────────────────────────────────
   JakMiris – db.php
   Database connection (PDO). Include this in auth PHP files.
   ─────────────────────────────────────────────────────────────
   Update DB_NAME, DB_USER, DB_PASS to match your MAMP/MySQL setup.
   ───────────────────────────────────────────────────────────── */

define('DB_HOST', 'localhost');
define('DB_NAME', 'jakmiris');
define('DB_USER', 'root');
define('DB_PASS', 'root');   // MAMP default password
define('DB_CHARSET', 'utf8mb4');

function getPDO(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = sprintf(
            'mysql:host=%s;dbname=%s;charset=%s',
            DB_HOST, DB_NAME, DB_CHARSET
        );
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
    }
    return $pdo;
}
