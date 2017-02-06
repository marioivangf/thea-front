<?php
  $users = ["juan@thea.mx", "john@thea.mx", "jonas@thea.mx", "ramon@cloro.mx", "rigoberto@cloro.mx"];
  $query = isset($_REQUEST["q"]) ? $_REQUEST["q"] : NULL;
  if ($query) {
    $users = array_filter($users, function ($form) {
      global $query;
      return (stripos($form, $query) !== false);
    });
  }
  header('Content-Type: application/json');
  echo json_encode(array_values($users));
?>