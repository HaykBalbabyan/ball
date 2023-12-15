<?php
header("Access-Control-Allow-Origin: *");
$origin = $_SERVER['HTTP_ORIGIN'] ?? false;

$allowed_domains = array(
    'http://ball.loc/',
    'https://example.com',
);

if ($origin && in_array($origin, $allowed_domains)) {
    header("Access-Control-Allow-Origin: $origin");
}

$action = $_REQUEST['action'] ?? '';

if ($action) {

    if ($action === 'file' && isset($_REQUEST['file'])){
        $file = $_REQUEST['file'];
        $content = '';
        if (file_exists(__DIR__ . '/' . $file)){
            $content = file_get_contents(__DIR__ . '/' . $file);
            echo json_encode([
                'success' => true,
                'content' => $content
            ]);die;
        }else{
            echo json_encode([
                'success' => false,
                'message' => 'file not found'
            ]);die;
        }

    }

}

echo json_encode([
   'success' => false,
   'message' => 0
]);die;
