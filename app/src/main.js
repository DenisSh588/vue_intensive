const Editor = require("./editor");
const axios = require("axios");
const Vue = require("vue");
const UIkit = require("uikit");

window.editor = new Editor();



new Vue ({
    el: "#app",
    data:{
        showLoader: true,
        pageList: []
    },
    methods: {
        onBtnSave() {
            this.showLoader = true;
            window.editor.save(
                () => {
                    this.showLoader = false;
                    UIkit.notification({message: 'Успешно сохранено!', status: 'success'})
                },
                () => {
                    this.showLoader = false;
                    UIkit.notification({message: 'Ошибка сохранения!', status: 'danger'})
                }
            );
        },
        openPage(page) {
            this.showLoader = true;
            window.editor.open(page, () => {
                this.showLoader = false;
            });
        }
    },
    created() {
        window.editor.open("index.html", () => {
            this.showLoader = false;
        });
        axios
            .get("./api/pageList.php")
            .then((res) => {
                this.pageList = res.data;
            });
    },
})























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

