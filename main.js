clearBoxes();
GET(true, true);

function Comment(name, comment) {
    this.name = name;
    this.comment = comment;
}

function clearBoxes() {
    document.getElementsByName('name')[0].value = "";
    document.getElementsByName('comment')[0].value = "";
    document.getElementsByName('id_get')[0].value = "";
    document.getElementsByName('id_delete')[0].value = "";
    document.getElementsByName('delete_textbox')[0].value = "";
}

function GET(option, init) {

    let id;

    if (option && !init) {
        id = document.getElementsByName('id_get')[0].value;
    } else if (option && init || !option && init) {
        id = "";
    } else {
        id = "";
    }


    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {

            clearBoxes();
            let result = JSON.parse(this.responseText);
            let size = result.length;
            let string = "";

            if (option) {
                if (!id) {
                    for (let i = 0 ; i < size ; i++) {
                        string = string + "<tr><td>" + result[i].id + "</td><td>" + result[i].name + "</td><td style='text-align:left;' id='comment_" + i + "'>" + result[i].comment + "</td></tr>"
                        
                    }
                } else {
                    string = string + "<tr><td>" + result.id + "</td><td>" + result.name + "</td><td>" + result.comment + "</td></tr>"
                }
                document.getElementById("insert").innerHTML = string;

                for(let j = 0; j < size ; j++) {

                    var arrayOfLines = fold(result[j].comment, 50, 'ws');
                    var foldedString = arrayOfLines.join('<br/>');
                    document.getElementById("comment_" + j).innerHTML=foldedString;
                }
            }

            if (!id) {
                let array = [];

                for (let i = 0 ; i < size ; i++) {
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

    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", "https://retoolapi.dev/DO1qZf/pachi_api", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(body));
    GET(true, true);
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
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            GET(true, false);
            clearBoxes();
        }
    };
    xhttp.open("DELETE", "https://retoolapi.dev/DO1qZf/pachi_api/" + id, true);
    xhttp.send();
    setTimeout(GET(true), 1000);
}

function DELETE_ALL() {
    let array = localStorage.getItem("indexes");
    array = JSON.parse("[" + array + "]");
    let range = localStorage.getItem("size");
    let confirmation = document.getElementsByName('delete_textbox')[0].value;
    let i = 0;

    if (confirmation == "delete all") {
        const timeValue = setInterval(function() {
            clearBoxes();
            if (i < range - 1) {
                DELETE(true, array[i]);
            }

            i++;

            if (i == range) {
                GET(true);
                clearInterval(timeValue);
            }
        }, 1000);
    }
}

function fold(s, n, useSpaces, a) {
    a = a || [];
    if (s.length <= n) {
        a.push(s);
        return a;
    }
    var line = s.substring(0, n);
    if (! useSpaces) { // insert newlines anywhere
        a.push(line);
        return fold(s.substring(n), n, useSpaces, a);
    }
    else { // attempt to insert newlines after whitespace
        var lastSpaceRgx = /\s(?!.*\s)/;
        var idx = line.search(lastSpaceRgx);
        var nextIdx = n;
        if (idx > 0) {
            line = line.substring(0, idx);
            nextIdx = idx;
        }
        a.push(line);
        return fold(s.substring(nextIdx), n, useSpaces, a);
    }
}
