<?php
$nemFile = "../../" . $_POST["name"] . ".html";
if(file_exists($nemFile)) {
    header("HTTP/1.0 400 Bad Request")
} else {
    fopen($nemFile, "w")
}