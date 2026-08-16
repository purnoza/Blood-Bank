function goBack() {
    window.location.href = "index.html";
}


/* =========================
   ADMIN REGISTRATION
========================= */

const showAdminRegister =
    document.getElementById("showAdminRegister");

const adminRegisterForm =
    document.getElementById("adminRegisterForm");


if (showAdminRegister) {

    showAdminRegister.addEventListener("click", function () {

        adminRegisterForm.classList.toggle("hidden");

    });

}


/* ===========
Admin 
============*/


const DB_KEY = "bloodBankDB";


function getDatabase(){

    let db =
        JSON.parse(
            localStorage.getItem(DB_KEY)
        );

    if(!db){

        db = {

            donors:[],

            recipients:[],

            requests:[],

            donations:[],

            inventory:[],

            bloodIssues:[],

            notifications:[],

            staff:[]

        };

        localStorage.setItem(
            DB_KEY,
            JSON.stringify(db)
        );

    }


    /* Protect old database versions */

    db.donors = db.donors || [];
    db.recipients = db.recipients || [];
    db.requests = db.requests || [];
    db.donations = db.donations || [];
    db.inventory = db.inventory || [];
    db.bloodIssues = db.bloodIssues || [];
    db.notifications = db.notifications || [];
    db.staff = db.staff || [];


    return db;
}


function saveDatabase(db){

    localStorage.setItem(
        DB_KEY,
        JSON.stringify(db)
    );

}


/* =====================================================
   LOGIN
===================================================== */

function login(){

    const username =
        document.getElementById("username")
        .value
        .trim();

    const password =
        document.getElementById("password")
        .value
        .trim();


    const savedPassword =
        localStorage.getItem(
            "adminPassword"
        ) || "admin123";


    if(
        username === "admin" &&
        password === savedPassword
    ){

        document.getElementById(
            "loginPage"
        ).style.display = "none";


        document.getElementById(
            "dashboardPage"
        ).style.display = "block";


        document.getElementById(
            "error"
        ).style.display = "none";


        clearLoginFields();

        loadAllData();

    }

    else{

        document.getElementById(
            "error"
        ).style.display = "block";

    }

}


/* =====================================================
   CLEAR LOGIN
===================================================== */

function clearLoginFields(){

    document.getElementById(
        "username"
    ).value = "";

    document.getElementById(
        "password"
    ).value = "";

}


/* =====================================================
   BACK
===================================================== */

function goBack(){

    window.location.href =
        "index.html";

}


/* =====================================================
   LOGOUT
===================================================== */

function logout(){

    document.getElementById(
        "dashboardPage"
    ).style.display = "none";


    document.getElementById(
        "loginPage"
    ).style.display = "flex";


    clearLoginFields();


    document.getElementById(
        "error"
    ).style.display = "none";

}


/* =====================================================
   NAVIGATION
===================================================== */

function showSection(id,element){

    document
        .querySelectorAll(".section")
        .forEach(function(section){

            section.classList.remove(
                "active"
            );

        });


    document
        .getElementById(id)
        .classList.add("active");


    document
        .querySelectorAll(".sidebar a")
        .forEach(function(link){

            link.classList.remove(
                "active"
            );

        });


    element.classList.add("active");


    loadAllData();

}


/* =====================================================
   FORM
===================================================== */

function showForm(id){

    document.getElementById(id)
        .style.display = "block";

}


function hideForm(id){

    document.getElementById(id)
        .style.display = "none";

}


/* =====================================================
   DONORS
===================================================== */

function addDonor(){

    const db = getDatabase();


    const name =
        document.getElementById(
            "donorName"
        ).value.trim();

    const blood =
        document.getElementById(
            "donorBlood"
        ).value.trim();

    const phone =
        document.getElementById(
            "donorPhone"
        ).value.trim();

    const location =
        document.getElementById(
            "donorLocation"
        ).value.trim();

    const availability =
        document.getElementById(
            "donorAvailability"
        ).value;


    if(
        name === "" ||
        blood === "" ||
        phone === "" ||
        location === "" ||
        availability === ""
    ){

        alert(
            "Please fill all donor fields."
        );

        return;

    }


    db.donors.push({

        id:
            "DONOR" +
            Date.now(),

        name:name,

        blood:blood,

        phone:phone,

        location:location,

        availability:availability

    });


    saveDatabase(db);

    renderDonors();


    document.getElementById(
        "donorName"
    ).value = "";

    document.getElementById(
        "donorBlood"
    ).value = "";

    document.getElementById(
        "donorPhone"
    ).value = "";

    document.getElementById(
        "donorLocation"
    ).value = "";

    document.getElementById(
        "donorAvailability"
    ).value = "";


    hideForm("donorForm");


    alert(
        "Donor added successfully."
    );

}


function renderDonors(){

    const db = getDatabase();

    const tbody =
        document.getElementById(
            "donorTableBody"
        );

    tbody.innerHTML = "";


    db.donors.forEach(
        function(donor,index){

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>${donor.name}</td>

                <td>${donor.blood}</td>

                <td>${donor.phone}</td>

                <td>${donor.location}</td>

                <td class="available">
                    ${donor.availability || "Available"}
                </td>

                <td>

                    <button
                        class="btn blue-btn"
                        onclick="editDonor(${index})">
                        Edit
                    </button>

                    <button
                        class="btn red-btn"
                        onclick="deleteDonor(${index})">
                        Delete
                    </button>

                </td>

            `;


            tbody.appendChild(row);

        }
    );

}


function editDonor(index){

    const db = getDatabase();

    const donor =
        db.donors[index];


    const name =
        prompt(
            "Donor name:",
            donor.name
        );

    if(name === null) return;


    const phone =
        prompt(
            "Phone:",
            donor.phone
        );

    if(phone === null) return;


    const location =
        prompt(
            "Location:",
            donor.location
        );

    if(location === null) return;


    const blood =
        prompt(
            "Blood group:",
            donor.blood
        );

    if(blood === null) return;


    donor.name = name;
    donor.phone = phone;
    donor.location = location;
    donor.blood = blood;


    saveDatabase(db);

    renderDonors();


    alert(
        "Donor updated successfully."
    );

}


function deleteDonor(index){

    if(
        !confirm(
            "Delete this donor?"
        )
    ){

        return;

    }


    const db = getDatabase();

    db.donors.splice(
        index,
        1
    );

    saveDatabase(db);

    renderDonors();


    alert(
        "Donor deleted successfully."
    );

}


function searchDonors(){

    const search =
        document.getElementById(
            "donorSearch"
        )
        .value
        .toLowerCase();


    document
        .querySelectorAll(
            "#donorTableBody tr"
        )
        .forEach(function(row){

            row.style.display =
                row.textContent
                .toLowerCase()
                .includes(search)
                ? ""
                : "none";

        });

}


/* =====================================================
   RECIPIENTS
===================================================== */

function addRecipient(){

    const db = getDatabase();


    const name =
        document.getElementById(
            "recipientName"
        ).value.trim();

    const email =
        document.getElementById(
            "recipientEmail"
        ).value.trim();

    const phone =
        document.getElementById(
            "recipientPhone"
        ).value.trim();

    const location =
        document.getElementById(
            "recipientLocation"
        ).value.trim();

    const blood =
        document.getElementById(
            "recipientBlood"
        ).value.trim();


    if(
        name === "" ||
        email === "" ||
        phone === "" ||
        location === "" ||
        blood === ""
    ){

        alert(
            "Please fill all recipient fields."
        );

        return;

    }


    db.recipients.push({

        id:
            "REC" +
            Date.now(),

        name:name,

        email:email,

        phone:phone,

        location:location,

        blood:blood

    });


    saveDatabase(db);

    renderRecipients();


    document.getElementById(
        "recipientName"
    ).value = "";

    document.getElementById(
        "recipientEmail"
    ).value = "";

    document.getElementById(
        "recipientPhone"
    ).value = "";

    document.getElementById(
        "recipientLocation"
    ).value = "";

    document.getElementById(
        "recipientBlood"
    ).value = "";


    hideForm(
        "recipientForm"
    );


    alert(
        "Recipient added successfully."
    );

}


function renderRecipients(){

    const db = getDatabase();

    const tbody =
        document.getElementById(
            "recipientTableBody"
        );

    tbody.innerHTML = "";


    db.recipients.forEach(
        function(recipient,index){

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>${recipient.name}</td>

                <td>${recipient.email || "-"}</td>

                <td>${recipient.phone}</td>

                <td>${recipient.location}</td>

                <td>${recipient.blood || "-"}</td>

                <td>

                    <button
                        class="btn blue-btn"
                        onclick="editRecipient(${index})">
                        Edit
                    </button>

                    <button
                        class="btn red-btn"
                        onclick="deleteRecipient(${index})">
                        Delete
                    </button>

                </td>

            `;


            tbody.appendChild(row);

        }
    );

}


function editRecipient(index){

    const db = getDatabase();

    const recipient =
        db.recipients[index];


    const name =
        prompt(
            "Recipient name:",
            recipient.name
        );

    if(name === null) return;


    const phone =
        prompt(
            "Phone:",
            recipient.phone
        );

    if(phone === null) return;


    const location =
        prompt(
            "Location:",
            recipient.location
        );

    if(location === null) return;


    recipient.name = name;
    recipient.phone = phone;
    recipient.location = location;


    saveDatabase(db);

    renderRecipients();


    alert(
        "Recipient updated successfully."
    );

}


function deleteRecipient(index){

    if(
        !confirm(
            "Delete this recipient?"
        )
    ){

        return;

    }


    const db = getDatabase();

    db.recipients.splice(
        index,
        1
    );

    saveDatabase(db);

    renderRecipients();


    alert(
        "Recipient deleted successfully."
    );

}


/* =====================================================
   REQUEST MANAGEMENT
===================================================== */

function renderRequests(){

    const db = getDatabase();

    const tbody =
        document.getElementById(
            "requestTableBody"
        );

    tbody.innerHTML = "";


    db.requests.forEach(
        function(request){

            const row =
                document.createElement("tr");


            let statusClass =
                "pending";


            if(
                request.status === "Approved" ||
                request.status === "Donor Accepted"
            ){

                statusClass =
                    "approved";

            }


            if(
                request.status === "Rejected"
            ){

                statusClass =
                    "rejected";

            }


            if(
                request.status === "Completed"
            ){

                statusClass =
                    "completed";

            }


            row.innerHTML = `

                <td>${request.id}</td>

                <td>${request.recipientName || "-"}</td>

                <td>${request.blood || "-"}</td>

                <td>${request.units || 0}</td>

                <td>${request.hospital || "-"}</td>

                <td>${request.donorName || "No donor"}</td>

                <td class="${statusClass}">
                    ${request.status || "Pending"}
                </td>

                <td>

                    ${
                        request.status !== "Approved" &&
                        request.status !== "Completed"
                        ?
                        `
                        <button
                            class="btn green-btn"
                            onclick="approveRequest('${request.id}')">
                            Approve
                        </button>
                        `
                        :
                        ""
                    }

                    ${
                        request.status !== "Rejected" &&
                        request.status !== "Completed"
                        ?
                        `
                        <button
                            class="btn red-btn"
                            onclick="rejectRequest('${request.id}')">
                            Reject
                        </button>
                        `
                        :
                        ""
                    }

                </td>

            `;


            tbody.appendChild(row);

        }
    );

}


function approveRequest(requestId){

    const db = getDatabase();


    const request =
        db.requests.find(
            function(item){

                return item.id === requestId;

            }
        );


    if(!request) return;


    request.status =
        "Approved";

    request.adminStatus =
        "Approved";


    db.notifications.push({

        id:
            "NOT" + Date.now(),

        role:
            "recipient",

        userId:
            request.recipientId,

        requestId:
            request.id,

        message:
            "Your blood request has been approved by Admin.",

        date:
            new Date().toLocaleString()

    });


    db.notifications.push({

        id:
            "NOT" + Date.now() + "S",

        role:
            "staff",

        userId:
            "STAFF001",

        requestId:
            request.id,

        message:
            "Blood request " +
            request.id +
            " has been approved and is ready for blood issue.",

        date:
            new Date().toLocaleString()

    });


    saveDatabase(db);

    renderRequests();

    renderNotifications();


    alert(
        "Blood request approved."
    );

}


function rejectRequest(requestId){

    const db = getDatabase();


    const request =
        db.requests.find(
            function(item){

                return item.id === requestId;

            }
        );


    if(!request) return;


    request.status =
        "Rejected";

    request.adminStatus =
        "Rejected";


    db.notifications.push({

        id:
            "NOT" + Date.now(),

        role:
            "recipient",

        userId:
            request.recipientId,

        requestId:
            request.id,

        message:
            "Your blood request was rejected by Admin.",

        date:
            new Date().toLocaleString()

    });


    saveDatabase(db);

    renderRequests();

    renderNotifications();


    alert(
        "Blood request rejected."
    );

}


/* =====================================================
   INVENTORY
===================================================== */

function addInventory(){

    const db = getDatabase();


    const blood =
        document.getElementById(
            "inventoryBlood"
        ).value;

    const units =
        Number(
            document.getElementById(
                "inventoryUnits"
            ).value
        );

    const expiry =
        document.getElementById(
            "inventoryExpiry"
        ).value;


    if(
        blood === "" ||
        units <= 0 ||
        expiry === ""
    ){

        alert(
            "Enter valid blood stock information."
        );

        return;

    }


    const existing =
        db.inventory.find(
            function(item){

                return item.blood === blood;

            }
        );


    if(existing){

        existing.units += units;

        existing.expiry =
            expiry;

    }

    else{

        db.inventory.push({

            blood:blood,

            units:units,

            expiry:expiry

        });

    }


    saveDatabase(db);

    renderInventory();


    document.getElementById(
        "inventoryBlood"
    ).value = "";

    document.getElementById(
        "inventoryUnits"
    ).value = "";

    document.getElementById(
        "inventoryExpiry"
    ).value = "";


    hideForm(
        "inventoryForm"
    );


    alert(
        "Blood stock added successfully."
    );

}


function renderInventory(){

    const db = getDatabase();

    const tbody =
        document.getElementById(
            "inventoryTableBody"
        );

    tbody.innerHTML = "";


    db.inventory.forEach(
        function(item,index){

            const expiry =
                new Date(
                    item.expiry
                );

            const today =
                new Date();


            let status =
                "Available";

            let className =
                "available";


            if(
                expiry < today
            ){

                status =
                    "Expired";

                className =
                    "expired";

            }


            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>${item.blood}</td>

                <td>${item.units}</td>

                <td>${item.expiry}</td>

                <td class="${className}">
                    ${status}
                </td>

                <td>

                    <button
                        class="btn blue-btn"
                        onclick="updateInventory(${index})">
                        Update
                    </button>

                    <button
                        class="btn red-btn"
                        onclick="removeInventory(${index})">
                        Remove
                    </button>

                </td>

            `;


            tbody.appendChild(row);

        }
    );

}


function updateInventory(index){

    const db = getDatabase();

    const item =
        db.inventory[index];


    const units =
        prompt(
            "Enter new quantity:",
            item.units
        );


    if(units === null) return;


    const quantity =
        Number(units);


    if(
        isNaN(quantity) ||
        quantity < 0
    ){

        alert(
            "Invalid quantity."
        );

        return;

    }


    item.units =
        quantity;


    saveDatabase(db);

    renderInventory();


    alert(
        "Stock updated successfully."
    );

}


function removeInventory(index){

    const db = getDatabase();

    const item =
        db.inventory[index];


    if(
        !confirm(
            "Remove this blood stock?"
        )
    ){

        return;

    }


    db.inventory.splice(
        index,
        1
    );


    saveDatabase(db);

    renderInventory();


    alert(
        "Blood stock removed."
    );

}


/* =====================================================
   ISSUE BLOOD
===================================================== */

function issueBlood(){

    const db = getDatabase();


    const requestId =
        document.getElementById(
            "issueRequestId"
        ).value.trim();

    const units =
        Number(
            document.getElementById(
                "issueUnits"
            ).value
        );


    if(
        requestId === "" ||
        units <= 0
    ){

        alert(
            "Enter Request ID and units."
        );

        return;

    }


    const request =
        db.requests.find(
            function(item){

                return item.id === requestId;

            }
        );


    if(!request){

        alert(
            "Request not found."
        );

        return;

    }


    if(
        request.status !==
        "Approved"
    ){

        alert(
            "This request must be approved first."
        );

        return;

    }


    const stock =
        db.inventory.find(
            function(item){

                return (
                    item.blood ===
                    request.blood
                );

            }
        );


    if(!stock){

        alert(
            "Blood stock not available."
        );

        return;

    }


    if(
        stock.units < units
    ){

        alert(
            "Not enough blood units available."
        );

        return;

    }


    stock.units -=
        units;


    request.issueStatus =
        "Completed";

    request.status =
        "Completed";

    request.issuedUnits =
        units;


    db.bloodIssues.push({

        id:
            "ISSUE" + Date.now(),

        requestId:
            request.id,

        recipientId:
            request.recipientId,

        recipientName:
            request.recipientName,

        blood:
            request.blood,

        units:
            units,

        hospital:
            request.hospital,

        date:
            new Date().toLocaleString()

    });


    db.notifications.push({

        id:
            "NOT" + Date.now(),

        role:
            "recipient",

        userId:
            request.recipientId,

        requestId:
            request.id,

        message:
            "Blood has been issued successfully.",

        date:
            new Date().toLocaleString()

    });


    saveDatabase(db);

    renderInventory();

    renderRequests();

    renderNotifications();


    document.getElementById(
        "issueRequestId"
    ).value = "";

    document.getElementById(
        "issueUnits"
    ).value = "";


    alert(
        "Blood issued successfully."
    );

}


/* =====================================================
   DONATION MANAGEMENT
===================================================== */

function renderDonations(){

    const db = getDatabase();

    const tbody =
        document.getElementById(
            "donationTableBody"
        );

    tbody.innerHTML = "";


    db.donations.forEach(
        function(donation,index){

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>${donation.donorName || "-"}</td>

                <td>${donation.blood || "-"}</td>

                <td>${donation.date || "-"}</td>

                <td>${donation.units || 0}</td>

                <td>${donation.status || "Pending"}</td>

                <td>

                    <button
                        class="btn green-btn"
                        onclick="approveDonation(${index})">
                        Approve
                    </button>

                    <button
                        class="btn red-btn"
                        onclick="rejectDonation(${index})">
                        Reject
                    </button>

                </td>

            `;


            tbody.appendChild(row);

        }
    );

}


function approveDonation(index){

    const db = getDatabase();

    const donation =
        db.donations[index];


    if(!donation) return;


    donation.status =
        "Approved";


    saveDatabase(db);

    renderDonations();


    alert(
        "Donation approved."
    );

}


function rejectDonation(index){

    const db = getDatabase();

    const donation =
        db.donations[index];


    if(!donation) return;


    donation.status =
        "Rejected";


    saveDatabase(db);

    renderDonations();


    alert(
        "Donation rejected."
    );

}


/* =====================================================
   NOTIFICATIONS
===================================================== */

function renderNotifications(){

    const db = getDatabase();

    const container =
        document.getElementById(
            "dashboardNotifications"
        );


    container.innerHTML = "";


    const notifications =
        db.notifications
        .filter(
            function(notification){

                return (
                    notification.role ===
                    "admin"
                );

            }
        )
        .slice(-10)
        .reverse();


    if(
        notifications.length === 0
    ){

        container.innerHTML =
            "<p>No new notifications.</p>";

        return;

    }


    notifications.forEach(
        function(notification){

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "notification";


            div.innerHTML = `

                <b>Notification:</b>
                ${notification.message}

                <br>

                <small>
                    ${notification.date}
                </small>

            `;


            container.appendChild(div);

        }
    );

}


/* =====================================================
   REPORTS
===================================================== */

function generateReports(){

    const db = getDatabase();


    const available =
        db.inventory.reduce(
            function(total,item){

                return total +
                    Number(item.units || 0);

            },
            0
        );


    const issued =
        db.bloodIssues.reduce(
            function(total,item){

                return total +
                    Number(item.units || 0);

            },
            0
        );


    const expired =
        db.inventory
        .filter(
            function(item){

                return new Date(item.expiry)
                    < new Date();

            }
        )
        .reduce(
            function(total,item){

                return total +
                    Number(item.units || 0);

            },
            0
        );


    document.getElementById(
        "reportDonors"
    ).textContent =
        db.donors.length;


    document.getElementById(
        "reportRecipients"
    ).textContent =
        db.recipients.length;


    document.getElementById(
        "reportAvailable"
    ).textContent =
        available;


    document.getElementById(
        "reportIssued"
    ).textContent =
        issued;


    document.getElementById(
        "reportExpired"
    ).textContent =
        expired;


    document.getElementById(
        "reportRequests"
    ).textContent =
        db.requests.length;


    document.getElementById(
        "reportCompleted"
    ).textContent =
        db.requests.filter(
            function(request){

                return request.status ===
                    "Completed";

            }
        ).length;

}


/* =====================================================
   DASHBOARD
===================================================== */

function updateDashboard(){

    const db = getDatabase();


    const totalUnits =
        db.inventory.reduce(
            function(total,item){

                return total +
                    Number(item.units || 0);

            },
            0
        );


    const issued =
        db.bloodIssues.reduce(
            function(total,item){

                return total +
                    Number(item.units || 0);

            },
            0
        );


    const pending =
        db.requests.filter(
            function(request){

                return (
                    request.status ===
                    "Pending" ||

                    request.status ===
                    "Donor Accepted"
                );

            }
        ).length;


    document.getElementById(
        "totalDonors"
    ).textContent =
        db.donors.length;


    document.getElementById(
        "totalRecipients"
    ).textContent =
        db.recipients.length;


    document.getElementById(
        "totalBloodUnits"
    ).textContent =
        totalUnits;


    document.getElementById(
        "pendingRequests"
    ).textContent =
        pending;


    document.getElementById(
        "issuedUnits"
    ).textContent =
        issued;


    document.getElementById(
        "expiredUnits"
    ).textContent =
        db.inventory.filter(
            function(item){

                return new Date(item.expiry)
                    < new Date();

            }
        ).reduce(
            function(total,item){

                return total +
                    Number(item.units || 0);

            },
            0
        );


    generateReports();

}


/* =====================================================
   SYSTEM USERS
===================================================== */

function renderUsers(){

    const db = getDatabase();

    const tbody =
        document.getElementById(
            "usersTableBody"
        );


    tbody.innerHTML = "";


    db.donors.forEach(
        function(donor){

            tbody.innerHTML += `

                <tr>

                    <td>Donor</td>

                    <td>${donor.name}</td>

                    <td>${donor.id}</td>

                    <td class="available">
                        Active
                    </td>

                </tr>

            `;

        }
    );


    db.recipients.forEach(
        function(recipient){

            tbody.innerHTML += `

                <tr>

                    <td>Recipient</td>

                    <td>${recipient.name}</td>

                    <td>${recipient.id}</td>

                    <td class="available">
                        Active
                    </td>

                </tr>

            `;

        }
    );


    db.staff.forEach(
        function(staff){

            tbody.innerHTML += `

                <tr>

                    <td>Staff</td>

                    <td>${staff.name || "-"}</td>

                    <td>${staff.id || "-"}</td>

                    <td class="available">
                        Active
                    </td>

                </tr>

            `;

        }
    );


    tbody.innerHTML += `

        <tr>

            <td>Admin</td>

            <td>Administrator</td>

            <td>ADMIN001</td>

            <td class="available">
                Active
            </td>

        </tr>

    `;

}


/* =====================================================
   ADMIN PROFILE
===================================================== */

function saveAdminProfile(){

    const name =
        document.getElementById(
            "adminName"
        ).value.trim();

    const email =
        document.getElementById(
            "adminEmail"
        ).value.trim();

    const phone =
        document.getElementById(
            "adminPhone"
        ).value.trim();


    if(
        name === "" ||
        email === "" ||
        phone === ""
    ){

        alert(
            "Please fill all profile fields."
        );

        return;

    }


    localStorage.setItem(
        "adminName",
        name
    );

    localStorage.setItem(
        "adminEmail",
        email
    );

    localStorage.setItem(
        "adminPhone",
        phone
    );


    document.getElementById(
        "adminWelcome"
    ).textContent =
        name;


    alert(
        "Admin profile updated successfully."
    );

}


/* =====================================================
   CHANGE PASSWORD
===================================================== */

function changeAdminPassword(){

    const current =
        document.getElementById(
            "currentPassword"
        ).value;

    const newPassword =
        document.getElementById(
            "newAdminPassword"
        ).value;

    const confirmPassword =
        document.getElementById(
            "confirmAdminPassword"
        ).value;


    const savedPassword =
        localStorage.getItem(
            "adminPassword"
        ) || "admin123";


    if(
        current === "" ||
        newPassword === "" ||
        confirmPassword === ""
    ){

        alert(
            "Please fill all password fields."
        );

        return;

    }


    if(
        current !== savedPassword
    ){

        alert(
            "Current password is incorrect."
        );

        return;

    }


    if(
        newPassword !==
        confirmPassword
    ){

        alert(
            "Passwords do not match."
        );

        return;

    }


    localStorage.setItem(
        "adminPassword",
        newPassword
    );


    document.getElementById(
        "currentPassword"
    ).value = "";

    document.getElementById(
        "newAdminPassword"
    ).value = "";

    document.getElementById(
        "confirmAdminPassword"
    ).value = "";


    alert(
        "Admin password changed successfully."
    );

}


/* =====================================================
   LOAD ALL DATA
===================================================== */

function loadAllData(){

    getDatabase();

    renderDonors();

    renderRecipients();

    renderRequests();

    renderInventory();

    renderDonations();

    renderNotifications();

    renderUsers();

    updateDashboard();


    const savedName =
        localStorage.getItem(
            "adminName"
        );


    if(savedName){

        document.getElementById(
            "adminName"
        ).value =
            savedName;

        document.getElementById(
            "adminWelcome"
        ).textContent =
            savedName;

    }

}


/* =====================================================
   INITIAL DATABASE
===================================================== */

getDatabase();

