<?php

include "config.php";

if($_SERVER["REQUEST_METHOD"] == "POST"){
    if(!empty($_REQUEST["uname"]) && !empty($_REQUEST["upwd"]) ){

        //1.准备sql语句
        $inserSQL = "INSERT INTO efeihu.`userinfo` (`u_name`,`u_pwd`) VALUES (?,?)";

        //2.预执行
        $stmt = $conn->prepare($inserSQL);
        $stmt->bind_param("ss", $_REQUEST["uname"], $_REQUEST["upwd"]);
        $stmt->execute();
        if($stmt->affected_rows >= 1){
            //ok
            print_r(json_encode(Array("status" => 1, "msg" => "恭喜,注册成功")));
        } else {
            // no ok
            print_r(json_encode(Array("status" => 0, "msg" => "注册失败","data"=>"错误信息:".$stmt->errno)));
        }
    } else {
        print_r(json_encode(Array("status" => 0, "msg" => "参数不合法")));

    }


}
