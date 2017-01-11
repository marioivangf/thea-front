<?php

date_default_timezone_set("America/Mexico_City");

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$view = ($path == '/') ? '/login' : $path; // Default root
$path = rtrim($path, '/'); // Remove trailing slashes
$view_path = __DIR__.'/views'.$view;
$path_name = str_replace('/', '_', trim($path, '/')); // Make pretty name for js

if (!file_exists($view_path.'.phtml')) { // Try to get it directly,
  $view_path = __DIR__.'/views'.$view.'/index.phtml'; // Try to see if it's a folder,
  if (!file_exists($view_path))
    die('<h1>404</h1>'); // Else die :(
} else $view_path .= '.phtml';

function starts_with ($haystack, $needle) {
 $length = strlen($needle);
 return (substr($haystack, 0, $length) === $needle);
}

function active_class ($path, $scope) {
  return starts_with($path, $scope) ? 'class="active"' : '';
}

include_once(__DIR__.'/views/_layout.phtml');