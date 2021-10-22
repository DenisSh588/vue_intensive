const axios = require("axios");

const DOMHelper = require("./dom-helper");
const EditorText = require("./editor-text");

require("./iframe-load");

module.exports = class Editor {
    constructor() {
        this.iframe = document.querySelector("iframe");
    }

    open(page, cb){
        this.currentPage = page;

        axios
            .get("../" + page + "?rnd=" + Math.random())
            .then((res) => DOMHelper.parseStrToDom(res.data))
            .then(DOMHelper.wrapTextNodes)
            .then((dom) => {
                DOMHelper.virtualDom = dom;
                return dom;
            })
            .then(DOMHelper.serializeDomToStr)
            .then((html) => axios.post("./api/saveTempPage.php", { html }))
            .then(() => this.iframe.load("../ehdfeihffefheie_fg653rgrfs.html"))
            .then((html) => axios.post("./api/deleteTempPage.php"))
            .then(() => this.enableEditing()) 
            .then(() => this.injectStyles()) 
            .then(cb)
    }
    enableEditing() {
        this.iframe.contentDocument.body.querySelectorAll("text-editor").forEach((element) => {
            const id = element.getAttribute("nodeid");
            const virtualElement = DOMHelper.virtualDom.body.querySelector(`[nodeid="${id}"]`);
            new EditorText(element, virtualElement);
        })

    }

    injectStyles(){
        const style = this.iframe.contentDocument.createElement("style");
        style.innerHTML = `
            text-editor:hover {
                outline: 3px solid orange;
                outline-offset: 8px;
            }
            text-editor:focus {
                outline: 3px solid red;
                outline-offset: 8px;
            }
        `;
        this.iframe.contentDocument.head.appendChild(style);
    }

   

    save(onSucces, onError) {
        const newDom = DOMHelper.virtualDom.cloneNode(DOMHelper.virtualDom);
        DOMHelper.unwrapTextNodes(newDom);
        const html = DOMHelper.serializeDomToStr(newDom);
        axios
            .post("./api/savePage.php", {pageName: this.currentPage, html})
            .then(onSucces)
            .catch(onError);
    }
}
















  /*this.iframe.load("../" + page, () => {
            const body = this.iframe.contentDocument.body;
            let textNodes = [];
            function recursy(element) {            
                element.childNodes.forEach((node) => {
                    if (node.nodeName === "#text" && node.nodeValue.replace(/\s+/g, "").length > 0) {
                        textNodes.push(node)
                    } else {
                        recursy(node);
                    }
                });
            }
            recursy(body);
            textNodes.forEach((node) => {
                const wrapper = this.iframe.contentDocument.createElement("text-editor");
                node.parentNode.replaceChild(wrapper, node);
                wrapper.appendChild(node);
                wrapper.contentEditable = "true";
            });
        });*/