let openNav = document.querySelector(".openNav");
let sidebar = document.querySelector("#sidebar");
let navbar = document.querySelector("#navbar-container");

let li = document.querySelectorAll("li");

openNav.addEventListener("click", () => {
    if (openNav.classList == "openNav") {
        sidebar.style.left = "300px";
        navbar.style.display = "block";
        navbar.style.transition = "0.5s";
        navbar.style.left = "0px";
        openNav.innerHTML = '<i class="fas fa-times"></i>';
        openNav.classList = "closeNav";
    } else {
        sidebar.style.left = "0px";
        navbar.style.display = "none";
        navbar.style.transition = "0.5s";
        navbar.style.left = "-300px";
        openNav.innerHTML = '<span></span><span></span><span></span>';
        openNav.classList = "openNav";
    }
});

li.forEach(items => {
    items.addEventListener("click", () => {
        li.forEach(remove => {
            remove.classList.remove("active");
        })
        items.classList.add("active");
    });
});

let getData = JSON.parse(localStorage.getItem("cart"))
let tbodyEl = document.querySelector("tbody")

window.addEventListener("load", () => {
    display(getData)
})


function Display(getData) {
    tbodyEl.innerHTML = ""

    getData.forEach(function (element, index) {
        let tr = document.createElement("tr")

        let name = document.createElement("td")
        name.innerText = element.title

        let status = document.createElement("td")
        status.innerText = element.status

        let total = document.createElement("td")
        price.innerText = element.price

        tr.append(name, status, total)
        tbodyEl.append(tr)

    })
}

let openEdit = document.getElementById("openIt")

openEdit.addEventListener("click", () => {
    window.location.assign("admin.html")
})