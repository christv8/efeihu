<?php


include "config.php";

if(!empty($_REQUEST["uname"])){
    $name = $_REQUEST["uname"];

    $exisUserSQL = "SELECT u_name FROM userinfo WHERE u_name=? ";

    $stmt = $conn->prepare($exisUserSQL);
    $stmt->bind_param("s", $name);
    $stmt->execute();
    $result = $stmt->get_result();
    if( $result->num_rows>=1){
        print_r("false");
    }else{
        print_r("true");
    }
}

