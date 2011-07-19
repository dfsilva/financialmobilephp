<?php
function id_clean($id,$size=11){
	return intval(substr($id,0,$size));
}

function db_clean($string,$size=255){
	return xss_clean(substr($string,0,$size));
}

function save_user($iduser, $loginUser, $perfilUser){
	$_SESSION['idUsuario'] = $iduser;
	setcookie("idUsuario",$iduser, time() + 36000000);
	$_SESSION['loginUsuario'] = $loginUser;
	setCookie("loginUsuario", $loginUser, time() + 36000000);
	$_SESSION['perfilUsuario'] = $perfilUser;
	setCookie("perfilUsuario", $perfilUser, time() + 36000000);
}

function isUserAutenticate(){
	ob_start();
	if (!isset($_SESSION['idUsuario'])){
		$_SESSION['idUsuario'] = -1;
	}
	 
	if(isset($_COOKIE["idUsuario"])){
		$_SESSION['idUsuario'] = $_COOKIE["idUsuario"];
	}

	if($_SESSION['idUsuario'] < 1){
		return false;
	}else{
		return true;
	}
}

?>