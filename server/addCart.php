<?php
/**

 */
include "config.php";

session_start();
if($_SERVER["REQUEST_METHOD"] == "POST"){

        // "pid": "1604524",
        // "title": "比得兔多功能削皮器套装PR-2496 绿色 5秒快速削皮 迷你型削水果机",
        // "dis": "比得兔多功能削皮器套装",
        // "price": "45",

        // "img": "picture/793f273b-ccad-43c1-8100-70d3c876fa66.jpg",

    if(!empty($_REQUEST["pid"]) && !empty($_REQUEST["title"]) && !empty($_REQUEST["price"]) && !empty($_REQUEST["uid"]) && !empty($_REQUEST["img"]) && !empty($_REQUEST["num"])){

        $pid = $_REQUEST["pid"];
        $title = $_REQUEST["title"];
        $price = $_REQUEST["price"];
        $uid = $_REQUEST["uid"];
        $img = $_REQUEST["img"];
        $num = $_REQUEST["num"];
       $total = $price * $num;

        //1.读取数据库 
        $extisSQL = "SELECT * FROM carts WHERE u_id=? AND p_id=?";
        $stmt = $conn->prepare($extisSQL);
        $stmt->bind_param("is", $uid, $pid);
        $stmt->execute();
        $resultQuery = $stmt->get_result();
        if($resultQuery->num_rows>=1){
            //2. 存在

            $updateSQL="UPDATE carts SET c_num=c_num +? ,c_total=c_num * c_price WHERE u_id=? AND p_id=?";

            $stmt = $conn->prepare($updateSQL);
            $stmt->bind_param("sis", $num, $uid,$pid);
            $stmt->execute();
           if($stmt->affected_rows>=1){
               print_r(json_encode(Array("status" => 1, "msg" => "u修改成功")));
           }else{
               print_r(json_encode(Array("status" =>0, "msg" => "u修改失败")));
           }


        }else{
            //3.不存在, 插入 

            $insertSQL="INSERT INTO carts(`c_id`,`c_title`,`c_price`,`u_img`,`p_id`,`c_total`,`c_num` ) VALUES(?,?,?,?,?,?,?)";
            $stmt = $conn->prepare($insertSQL);
            $stmt->bind_param("sisisis",$title,$price,$img,$uid,$pid,$total,$num);
            $stmt->execute();
            if($stmt->affected_rows>=1){
                print_r(json_encode(Array("status" => 1, "msg" => "i插入成功")));
            }else{
                print_r(json_encode(Array("status" =>0, "msg" => "i插入失败")));
            }
        }

        $stmt->close();
        $conn->close();

    } else {
        print_r(json_encode(Array("status" => 0, "msg" => "参数不合法")));
    }


}