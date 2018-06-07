<?php

if(!empty($_REQUEST["pid"])){
		$strGood=file_get_contents("data/goodsList.json");

		$arrGood=json_decode($strGood);

		for($i = 0 ; $i < count($arrGood) ; $i++){
			if($arrGood[$i]->pid==$_REQUEST["pid"]){
				print_r(json_encode(Array("status"=>1,"data"=>$arrGood[$i])));
				return ;
			}
			print_r(json_encode(Array("status"=>0,"msg"=>"没有产品","erroNo"=>-3)));
		}
}else{
		print_r(json_encode(Array("status"=>0,"msg"=>"没有参数","erroNo"=>-2)));
}

