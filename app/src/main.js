const Editor = require("./editor");

window.editor = new Editor();

window.onload = () => {
    window.editor.open("index.html");
}
























/*const Vue = require("vue");
const axios = require("axios");

new Vue({
    el: "#app",
    data: {
        "pageList": [],
        "newPageName": ""
    },
    methods: {
        createPage() {
            axios
                .post("./api/createNewHtmlPage.php", { "name": this.newPageName})
                .then(() => this.updatePageList())
        },
        updatePageList() {
            axios
                .get("./api/")
                .then((response) => {
                    this.pageList = response.data
             })
        },
        deletePage(page){
            axios
                .post("./api/deletePage.php", { "name": page })
                .then(() => this.updatePageList())
        }
    },
    created() {
        this.updatePageList();
    },
})*/

/*const $ = require("jquery");

function getPagesList() {
    $("h1").remove();
    $.get("./api", (data) => {
        data.forEach((file) =>{
            $("body").append("<h1>" + file + "</h1>");
        });
    }, "JSON");
}

getPagesList();

$("button").click(() => {
    $.post("./api/createNewHtmlPage.php", {
        "name": $("input").val()
    }, (data) => {
        getPagesList();
    })
    .fail(() =>{
        alert("Такая страница уже существует!");
    })
}) */

