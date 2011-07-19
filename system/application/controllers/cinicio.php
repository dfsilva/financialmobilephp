<?php

class CInicio extends MY_Controller {

	function CInicio(){
		parent::MY_Controller();
	}

	function index(){
		redirect('app','refresh');
	}
}

?>