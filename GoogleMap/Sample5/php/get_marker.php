<?php

//範囲データ取得
$neLat = $_GET["neLat"];
$neLng = $_GET["neLng"];
$swLat = $_GET["swLat"];
$swLng = $_GET["swLng"];


$json = file_get_contents('../json/points.json', true);

if ($json == false) {
  return;
}


$jsonData = json_decode($json);

$points = $jsonData->{'points'};
$result = new stdClass();
$result->points = array();

foreach ($points as &$point) {
  if ($point->{"lat"} < $neLat &&
          $point->{"lat"} > $swLat &&
          $point->{"lng"} < $neLng &&
          $point->{"lng"} > $swLng) {
    $result->points[] = $point;
  }
}
echo json_encode($result);