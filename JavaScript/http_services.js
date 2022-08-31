var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function makeServiceCall(methodType, url, async = true, data = null) {

    return new Promise(function (resolve, reject) {

        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status.toString().match("^[2][0-9]{2}$")) {
                console.log("status code",xhr.status);
                console.log("response data",xhr.responseText);
                resolve(xhr.responseText);
            } else if (xhr.status.toString().match("^[4,5][0-9]{2}$")) {
                console.log("status code",xhr.status);

                reject({

                    status: xhr.status,
                    statusText: xhr.statusText
                });
            }
        }
        xhr.onerror = function () {
            console.log(xhr.status);
            reject({
                status: xhr.status,
                statusText: xhr.statusText
            });
        };
        xhr.open(methodType, url, async);
        
        if (data) {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        } else xhr.send();
    });
}

