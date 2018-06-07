<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/31
 * Time: 20:16
 */

include "config.php";

session_start();
//条件必须是 psot,而且要是登录的状态
if($_SERVER["REQUEST_METHOD"] == "POST" && !empty($_SESSION["currentLogin"]) && !empty($_REQUEST["pid"])){
    $pid = $_REQUEST["pid"];
    $delteSQL = "DELETE FROM carts WHERE u_id=? AND p_id=?";
    $stmt = $conn->prepare($delteSQL);
    $stmt->bind_param("is", $_SESSION["currentLogin"]["uid"], $pid);
    $stmt->execute();

    if($stmt->affected_rows >= 1){
        print_r(json_encode(Array("status" => 1, "msg" => "删除成功")));
    } else {
        print_r(json_encode(Array("status" => 0, "msg" => "删除失败")));
    }

} else {
    print_r(json_encode(Array("status" => 0, "msg" => "参数不合法")));
}
