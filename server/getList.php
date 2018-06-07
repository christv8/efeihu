<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/31
 * Time: 19:45
 */

include "config.php";

session_start();
if(!empty($_SESSION["currentLogin"])){
    $querySQL = "SELECT * FROM carts WHERE u_id=?";
    //$_SESSION["currentLogin"]["uid"] 读取当前登录的id
    $stmt = $conn->prepare($querySQL);
    $stmt->bind_param("i", $_SESSION["currentLogin"]["uid"]);
    $stmt->execute();
    $result = $stmt->get_result();

    $arrList = Array("status" => 1, "msg" => "ok");

    $DataList = Array();
    while($row = $result->fetch_assoc()){
        // $row 就是一个对象
        array_push($DataList, $row);
    }
    $arrList["data"] = $DataList;

    print_r(json_encode($arrList));
}