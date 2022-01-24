function Comment(name, comment) {
    this.name = name;
    this.comment = comment;
}

function GET(option) {

    let id;

    if (option) {
        id = document.getElementsByName('id_get')[0].value;
    } else {
        id = "";
    }

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

            if (option) {
                document.getElementById("get").innerHTML = this.responseText;
            }

            if (!id) {
                let result = JSON.parse(this.responseText);
                let size = result.length;
                let array = [];

                for (let i = 0; i < size; i++) {
                    array.push(result[i].id);
                }

                localStorage.setItem("size", size);
                localStorage.setItem("indexes", array);
            }
        }
    };

    xhttp.open("GET", "https://retoolapi.dev/DO1qZf/pachi_api/" + id, true);
    xhttp.send();
}

function POST() {
    let name = document.getElementsByName('name')[0].value;
    let comment = document.getElementsByName('comment')[0].value;
    let body = new Comment(name, comment);

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert(this.responseText);
        }
    };

    xhttp.open("POST", "https://retoolapi.dev/DO1qZf/pachi_api", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(body));
}

function DELETE(option, identifier) {

    let id;
    if (!option) {
        id = document.getElementsByName('id_delete')[0].value;
    }

    if (option) {
        id = identifier;
    }

    let xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "https://retoolapi.dev/DO1qZf/pachi_api/" + id, true);
    xhttp.send();
}

function DELETE_ALL() {
    GET(false);
    let array = localStorage.getItem("indexes");
    array = JSON.parse("[" + array + "]");
    let range = localStorage.getItem("size");
    let confirmation = document.getElementsByName('delete_textbox')[0].value;
    let i = 0;

    if (confirmation == "delete all") {
        const timeValue = setInterval(function() {
            DELETE(true, array[i]);
            i++;

            if (i == range - 1) {
                clearInterval(timeValue);
            }
        }, 1);
    }
}