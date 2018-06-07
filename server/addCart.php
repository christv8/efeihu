<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/31
 * Time: 19:08
 */
include "config.php";

session_start();
if($_SERVER["REQUEST_METHOD"] == "POST"){

    // {    pid: "1555771170",
    //     title: "武极 i7 8700/华硕GTX1060-5G/320G 游戏台式吃鸡电脑主机/DIY组装机",
    //     price: "5299.00",
    //     uid:2,
    //     img: "http://img10.360bu18e7fda7.jpg",
    //      num: "1"}


    if(!empty($_REQUEST["pid"])!empty(!empty($_REQUEST["title"])))








    if(!empty($_REQUEST["pid"]) && !empty($_REQUEST["title"]) && !empty($_REQUEST["price"]) && !empty($_REQUEST["uid"]) && !empty($_REQUEST["img"]) && !empty($_REQUEST["num"])){

        $pid = $_REQUEST["pid"];
        $title = $_REQUEST["title"];
        $price = $_REQUEST["price"];
        $uid = $_REQUEST["uid"];
        $img = $_REQUEST["img"];
        $num = $_REQUEST["num"];
       $total = $price * $num;

        //1.读取数据库 的数据 根据 用户id,产品的id,作为查询条件,查看是否存在

        $extisSQL = "SELECT * FROM carts WHERE u_id=? AND p_id=?";
        $stmt = $conn->prepare($extisSQL);
        $stmt->bind_param("is", $uid, $pid);
        $stmt->execute();
        $resultQuery = $stmt->get_result();
        if($resultQuery->num_rows>=1){
            //2. 存在
            // 数量与金额进行修改
            //修改,要根据 当前的购买人与产品id,进行修改 数量与总金额
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
            //3.不存在, 插入 用户id,产品id,产品名称,产品价格,产品数量,产品图片

            $insertSQL="INSERT INTO carts(`c_name`,`c_price`,`c_img`,`u_id`,`p_id`,`c_total`,`c_num` )VALUES(?,?,?,?,?,?,?)";
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