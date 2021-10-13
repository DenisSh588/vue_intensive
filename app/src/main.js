const $ = require("jquery");

$.get("./api", (data) => {
    data.forEach((file) =>{
        $("body").append("<h1>" + file + "</h1>");
    });
}, "JSON");

$("button").click() 

$.post("./api/createNewHtmlPage.php");