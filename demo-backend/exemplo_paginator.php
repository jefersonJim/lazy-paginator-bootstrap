<?php 

	header('Access-Control-Allow-Origin: *');   


	$limit = $_GET["limit"];
	$offset = $_GET["offset"];


	$result = $arrayName = array("total" => $qtd, 
		  					     "resultado"=> $rsUnidadeTrabalho );

	echo json_encode($result);
?>