<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/31
 * Time: 14:15
 */


header("Content-Type:application/json;charset=utf-8");
header("Access-Control-Allow-Origin:*");
//实现jsonp的加载数据
if(!empty($_REQUEST["callback"])){
    $cb=$_REQUEST["callback"];
    $strGoods=file_get_contents("data/goodsList.json");

    print_r($cb."(".$strGoods.")");

}else{
    print_r(json_encode(Array("status"=>0,"msg"=>"异常","erroNo"=>-1)));
}