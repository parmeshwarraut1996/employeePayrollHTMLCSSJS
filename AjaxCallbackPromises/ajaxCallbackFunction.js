let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function makeAJAXCall(methodType, url, callback, async = true, data) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        console.log(methodType + " State Changed Called. Ready State: " +
            xhr.readyState + " Status:" + xhr.status);
        if (xhr.readyState === 4) {
            //matching all 200 series responses
            if (xhr.status === 200 || xhr.status === 201) {
                callback(xhr.responseText);
            } else if (xhr.status >= 400) {
                console.log("Handle 400 Client Error or 500 Server Error");
            }
        }
    }

    xhr.open(methodType, url, async);
   
    if (data) {
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    } else xhr.send();
    console.log(methodType + " request sent to the server");
}

const getURL = "http://localhost:3000/employees/1";

function getUserDetails(data) {
    console.log("Get User Data:" + data);
}

// makeAJAXCall("GET", getURL, getUserDetails);

// const deleteURL = "http://localhost:3000/employees/4";
// function userDeleted(data) {
//     console.log("User Deleted " + data);
// }
// makeAJAXCall("DELETE", deleteURL, userDeleted, false);

const postURL = "http://localhost:3000/employees";
const emplData = { "name": "Aman", "salary": "80000" };


function userAdded(data) {
    console.log("User Added: " + data);
}

makeAJAXCall("POST", postURL, userAdded, true, emplData);
