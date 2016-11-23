function buttonClick() {
    alert("HEY")
    var paragraphs = Array.prototype.slice.call(document.getElementsByTagName('p'))
    paragraphs.forEach(el => el.style.color = "#2196F3")
}

function changeTitleColor() {
    document.getElementById('titleText').innerHTML = "Psst! Click the first paragraph!"
}

function changeToRed(id) {
    id.style.color = "red"
    document.getElementById('firstButton').style.color = "#2196F3"
}

function toggleSubmenu(id) {
    var children = Array.prototype.slice.call(id.children).filter(el => el.tagName === "DIV")
    var expanded = children[0].style.display === "block"
    if (expanded) {
        children.forEach(el => el.style.display = "none")
    } else {
        children.forEach(el => el.style.display = "block")
    }
}
