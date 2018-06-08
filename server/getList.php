<?php


include "config.php";

session_start();
if(!empty($_SESSION["currentLogin"])){
    $querySQL = "SELECT * FROM carts WHERE u_id=?";
    // 读取当前登录的id
    $stmt = $conn->prepare($querySQL);
    $stmt->bind_param("i", $_SESSION["currentLogin"]["uid"]);
    $stmt->execute();
    $result = $stmt->get_result();

    $arrList = Array("status" => 1, "msg" => "ok");

    $DataList = Array();

        array_push($DataList, $row);
    }
    $arrList["data"] = $DataList;

    print_r(json_encode($arrList));
}