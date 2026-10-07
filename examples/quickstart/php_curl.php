<?php
/**
 * OmniRoute Quickstart — PHP (cURL)
 * ===================================
 * Run:  php php_curl.php
 * Requires: PHP 7.4+ with cURL extension enabled
 */

// Your local OmniRoute server — started with: npx omniroute
$api_url = "http://localhost:20128/v1/chat/completions";

$headers = [
    "Content-Type: application/json",
    "Authorization: Bearer dummy-key", // Any string works for free/keyless providers
];

$data = [
    "model"    => "auto", // Zero-config routing, works out of the box — no sign-up needed
    "stream"   => false,
    "messages" => [
        ["role" => "user", "content" => "Hello! What can you do?"],
    ],
];

$ch = curl_init($api_url);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => json_encode($data),
    CURLOPT_HTTPHEADER     => $headers,
]);

$response  = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($http_code === 200) {
    $result = json_decode($response, true);
    echo $result['choices'][0]['message']['content'] . PHP_EOL;
} else {
    echo "Error HTTP $http_code: $response" . PHP_EOL;
}
