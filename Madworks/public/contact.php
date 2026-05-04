<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false]);
    exit;
}

$body = file_get_contents('php://input');
$data = json_decode($body, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid request']);
    exit;
}

$name    = trim($data['name']    ?? '');
$email   = trim($data['email']   ?? '');
$phone   = trim($data['phone']   ?? '');
$service = trim($data['service'] ?? '');
$date    = trim($data['date']    ?? '');
$message = trim($data['message'] ?? '');

if (!$name || !$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'error' => 'Name and valid email are required']);
    exit;
}

$to      = 'manager@madworksvideo.com';
$subject = "New Enquiry from $name — Madworks";

$body_text  = "New enquiry from the Madworks website.\n";
$body_text .= "--------------------------------------------\n";
$body_text .= "Name    : $name\n";
$body_text .= "Email   : $email\n";
$body_text .= "Phone   : $phone\n";
$body_text .= "Service : $service\n";
$body_text .= "Date    : $date\n\n";
$body_text .= "Message :\n$message";

$headers  = "From: Madworks Website <manager@madworksvideo.com>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

if (mail($to, $subject, $body_text, $headers)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Mail send failed']);
}
