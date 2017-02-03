<?php
  $forms = ["Formulario Alfa Falfa", "Medicamento Experimental", "Medicamento Alfa", "Medicamento Beta", "Medicamento Gamma"];
  $query = isset($_POST["q"]) ? $_POST["q"] : NULL;
  if ($query) {
    $forms = array_filter($forms, function ($form) {
      global $query;
      return (stripos($form, $query) !== false);
    });
  }
  foreach ($forms as $form):
?>
<div class="list-item">
  <span class="item-title flex-1" title="Formulario Alfa"><?= $form ?></span>
  <div class="flexbox">
    <div class="flex-1">
      <div class="mini-row txt-active">General Hospital</div>
      <div class="mini-row">Vicodin</div>
    </div>
    <a href="/forms" class="btn--icon" title="Editar">
      <i class="material-icons">&#xE254;</i>
    </a>
    <a href="/forms/527" class="btn--icon" title="Estadísticas">
      <i class="material-icons">&#xE24B;</i>
    </a>
  </div>
  <div class="flexbox txt-light txt-smaller">
    <div class="flex-1">Dr. Strange</div>
    <div>20 nov 2015</div>
  </div>
</div>
<?php endforeach; ?>