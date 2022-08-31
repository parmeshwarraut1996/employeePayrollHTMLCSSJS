// Creating a global employee payroll list-array which will contain objects read from local storage
let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    //if (site_properties.use_local_storage.match("true")) {
        getEmployeePayrollDataFromStorage();
   // } else getEmployeePayrollDataFromServer();
});


const createInnerHtml = () => {
    // If the employee payroll list is empty i.e. no data stored in the local storage then return from the method
    if (empPayrollList.length == 0) return;
    // Defining the common header html tags for the table to be displayed at the page
    const headerHtml =
        "<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>";
    // Defining the inner html tag in which all the elements will be appended to populate the table
    let innerHtml = `${headerHtml}`;
    // Iterating over the list of elemen ts in employee payroll list
    // Continuously appending each row structure of html page to the innerHtml tag using placeholder, template literals
    for (const empPayrollData of empPayrollList) {
        innerHtml = `${innerHtml}
    <tr>
          <td><img class="profile" alt="" src="${empPayrollData._profilePic}"></td>
          <td>${empPayrollData._name}</td>
          <td>${empPayrollData._gender}</td>
          <td>${getDeptHtml(empPayrollData._department)}</td>
          <td>${empPayrollData._salary}</td>
          <td>${stringifyDate(empPayrollData._startDate)}</td>
          <td>
            <img id="${empPayrollData._id}" onclick="remove(this)" alt="delete" width="30px" src="../Assets/icons/delete-black-18dp.svg">
            <img id="${empPayrollData._id}" onclick="update(this)" alt="edit" width="30px" src="../Assets/icons/create-black-18dp.svg">
          </td>
    </tr>`;
    }
    // Manipulating the inner Html content of the table display with the assigned value
    // Still the page is static and has to be made dynamic in subsequent stages
    document.querySelector("#display").innerHTML = innerHtml;
};

const getEmployeePayrollDataFromStorage = () => {
    empPayrollList = localStorage.getItem('EmployeePayrollList') ? JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
    processEmployeePayrollDataResponse();
}

const processEmployeePayrollDataResponse = () => {
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
}

const getEmployeePayrollDataFromServer = () => {
    makeServiceCall("GET", site_properties.server_url, true)
        .then(responseText => {
            empPayrollList = JSON.parse(responseText);
            processEmployeePayrollDataResponse();
        })
        .catch(error => {
            console.log("GET Error Status: " + JSON.stringify(error));
            empPayrollList = [];
            processEmployeePayrollDataResponse();
        });
}




/**
 *  Method that defines the feed of multiple department to the employee payroll home page
 * @param {*} deptList 
 */
const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml}<div class="dept-label">${dept}</div>`;
    }
    return deptHtml;
};

/**
 *  to delete the row of employee
 * @param {*} node 
 */

const remove = (node) => {
    let employeePayrollData = empPayrollList.find(empData => empData.id == node.id);
    //alert(JSON.stringify(empPayrollList))
    //  alert(employeePayrollData)
    if (!employeePayrollData) return;
    // alert("hie" + employeePayrollData)
    const index = empPayrollList.map(empData => empData.id).indexOf(employeePayrollData.id);
    //alert(index)
    empPayrollList.splice(index, 1);
    if (site_properties.use_local_storage.match("true")) {
        localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
        document.querySelector(".emp-count").textContent = empPayrollList.length;
        createInnerHtml();
    } else {
        const deleteURL = site_properties.server_url + employeePayrollData.id.toString();
        makeServiceCall("DELETE", deleteURL, false)
            .then(responseText => {
                createInnerHtml();
            })
            .catch(error => {
                console.log("DELETE Error Status: " + JSON.stringify(error));
            });
    }
}




/**
 * to update the row of employee
 * @param {*} node 
 */
const update = (node) => {
console.log("node",node);
    let empPayrollData = empPayrollList.find((empData) => empData._id == node.id);
    console.log("id in update",empPayrollData);
    if (!empPayrollData) return;
    localStorage.setItem("editEmp", JSON.stringify(empPayrollData));
    window.location.replace(site_properties.add_emp_payroll_page);
}



