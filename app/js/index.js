const BrowserWindow = require("electron").remote.BrowserWindow
const path = require("path")

document.getElementById("newWindowButton").addEventListener("click", (event) => {
    let win = new BrowserWindow({width: 1024, height: 768})
    win.on("close", () => win = null)
    win.loadURL(`file://${__dirname}/../html/other.html`)
    win.show()
})

function buttonClick() {
    alert("Have some blue text!")
    var paragraphs = Array.prototype.slice.call(document.getElementsByTagName('p'))
    paragraphs.forEach(el => el.style.color = "#2196F3")
    document.getElementById('firstP').style.cursor = "pointer"
}

function changeTitleColor() {
    document.getElementById('titleText').innerHTML = "Click the first paragraph!"
    document.getElementById('firstP').style.cursor = "pointer"
}

function changeToRed(id) {
    id.style.color = "red"
    document.getElementById('firstButton').style.color = "#2196F3"
    document.getElementById('firstP').style.cursor = "auto"
}
