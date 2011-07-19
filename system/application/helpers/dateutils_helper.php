<?php
//converte data no formato dd/MM/yyyy para yyyy-MM-dd
function convertDateMysql($date){
	$date = explode("/",$date);
	//if ($date[0]<=9) { $date[0]="0".$date[0]; }
	//if ($date[1]<=9) { $date[1]="0".$date[1]; }
	$date = array($date[2], $date[1], $date[0]);
	return $n_date=implode("-", $date);
}


//converte data no formato yyyy-MM-dd para dd/MM/yyyy
function convertDateNoSql($date){
	$date = explode("-",$date);
	//if ($date[2]<=9) { $date[2]="0".$date[2]; }
	//if ($date[1]<=9) { $date[1]="0".$date[1]; }
	$date = array($date[2], $date[1], $date[0]);
	return $n_date=implode("/", $date);
}

//converte número no formado ##.###,## para #####.##
function convertNumberMysql($numero){
	return str_replace(",",".",str_replace(".", "", $numero));
}

?>