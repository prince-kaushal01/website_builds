<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid request body']);
    exit;
}

$name    = strip_tags(trim($input['name']    ?? ''));
$email   = strip_tags(trim($input['email']   ?? ''));
$phone   = strip_tags(trim($input['phone']   ?? ''));
$service = strip_tags(trim($input['service'] ?? ''));
$date    = strip_tags(trim($input['date']    ?? ''));
$message = strip_tags(trim($input['message'] ?? ''));

if (!$name || !$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'error' => 'Name and a valid email are required']);
    exit;
}

$to      = 'manager@madworks.com';
$subject = "New Enquiry from $name — Madworks";

$body  = "You have a new enquiry from the Madworks website.\n";
$body .= str_repeat("-", 44) . "\n\n";
$body .= "Name    : $name\n";
$body .= "Email   : $email\n";
$body .= "Phone   : $phone\n";
$body .= "Service : $service\n";
$body .= "Date    : $date\n\n";
$body .= "Message :\n$message\n";

$headers  = "From: manager@madworks.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$sent = mail($to, $subject, $body, $headers);

echo json_encode(['success' => $sent]);
