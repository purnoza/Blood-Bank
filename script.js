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

