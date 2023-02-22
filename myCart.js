
//? Fetch

window.addEventListener("load", () => {
    fetchAndRenderSmallImages()
    fetchAndRenderBigImages()
    fetchAndRenderContent()
})

// --------------SMALL Images --------------->>
let smallImageSection = document.querySelector("#Small_Img")

async function fetchAndRenderSmallImages(queryParamString = null) {
    try {
        let resp = await fetch(`http://localhost:3000/Products${queryParamString ? queryParamString : ""}`)
        let data = await resp.json()
        let productData = data.map((item) => ({
            SmallImageUrl: item.smallImages,
        }))
        renderSmallImagesSection(productData)

    } catch (error) {
        console.log(error)
    }
}

function renderSmallImagesSection(cardsData) {
    let cardSection = `
 ${cardsData.map((item) => smallImages(item.SmallImageUrl)).join("")}`;
    smallImageSection.innerHTML = cardSection
}

function smallImages(SmallImageUrl) {
    return `
            <img src="${SmallImageUrl[0]}"
                alt="">
            <img src="${SmallImageUrl[1]}"
                alt="">
            <img src="${SmallImageUrl[2]}"
                alt="">
            <img src="${SmallImageUrl[3]}"
                alt="">
            <img src="${SmallImageUrl[4]}"
                alt="">
            <img src="${SmallImageUrl[5]}"
                alt="">
            <img src="${SmallImageUrl[6]}"
                alt="">
    `
}
// --------------SMALL Images Function ENDS --------------->>


// --------------BIG Image Function --------------->>

let BigImageSection = document.querySelector("#Big-Img")

async function fetchAndRenderBigImages(queryParamString = null) {
    try {
        let resp = await fetch(`http://localhost:3000/Products${queryParamString ? queryParamString : ""}`)
        let data = await resp.json()
        let productData = data.map((item) => ({
            imageUrl: item.images,
        }))
        renderBIGImageSection(productData)

    } catch (error) {
        console.log(error)
    }
}

function renderBIGImageSection(cardsData) {
    let cardSection = `
 ${cardsData.map((item) => BigImage(item.imageUrl)).join("")}`;
    BigImageSection.innerHTML = cardSection
}


function BigImage(imageUrl) {
    return ` <img src="${imageUrl}"alt="">`
}

// --------------BIG Image Function ENDS--------------->>

// --------------Content Section Function STARTS --------------->>

let ContentSection = document.querySelector("#content")

async function fetchAndRenderContent(queryParamString = null) {
    try {
        let resp = await fetch(`http://localhost:3000/Products${queryParamString ? queryParamString : ""}`)
        let data = await resp.json()
        let productData = data.map((item) => ({
            imageUrl: item.images,
            name: item.title,
            price: item.price,
            quantity: item.quantity
        }))
        renderContentSection(productData)

    } catch (error) {
        console.log(error)
    }
}


function renderContentSection(cardsData) {
    let cardSection = `
<div> ${cardsData.map((item) => getContent(item.imageUrl, item.name, item.price, item.quantity)).join("")}</div>`;
    ContentSection.innerHTML = cardSection

    let cartArr = JSON.parse(sessionStorage.getItem("cart")) || []

    //! <--------------Add to Cart Pop-up JAVSCRIPT------------->


    const openModalButtons = document.querySelectorAll('[data-modal-target]')
    const closeModalButtons = document.querySelectorAll('[data-close-button]')
    const overlay = document.getElementById('overlay')


    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.querySelector(button.dataset.modalTarget)
            openModal(modal)
        })
    })

    overlay.addEventListener('click', () => {
        const modals = document.querySelectorAll('.modal.active')
        modals.forEach(modal => {
            closeModal(modal)
        })
    })

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal')
            closeModal(modal)
        })
    })

    function openModal(modal) {
        if (modal == null) return
        modal.classList.add('active')
        overlay.classList.add('active')
    }

    function closeModal(modal) {
        if (modal == null) return
        modal.classList.remove('active')
        overlay.classList.remove('active')
    }


    //! <---------------- Add to Cart popup ENDS------------->

    // Local Storage ADD to cart

    let addtocart = document.querySelector("#AddToLocalStorage")

    addtocart.addEventListener("click", (element) => {
        if (checkDuplicate(element)) {
            alert("Product Already In The Cart")
        } else {
            cartArr.push({ ...element, quantity: 1 })
            sessionStorage.setItem("cart", JSON.stringify(cardsData))
            // add here next page redirection for vishal
            alert("Product Has Successfully Been Added")
        }
    })

    // ? Function to check Duplicate
    function checkDuplicate(element) {
        for (let i = 0; i < cartArr.length; i++) {
            if (element.id == cartArr[i].id) {
                return true
            }
        }
        return false
    }

}

function getContent(imageUrl, name, price, quantity) {
    return `
            <h1>${name}</h1>

            <p id="Sku">SKU: 414500</p>
            <!-- append here -->

            <p id="priceSKU">${price}</p>



            <p id="crate">CRATE & BARREL EXCLUSIVE</p>
            <div class="box">
                <p>SEE WHAT'S AVAILABLE SOONEST</p>
            </div>
            <a href="#" id="onDIsp">ON DISPLAY IM MY STORE?</a>

            <div id="borderBottom"></div>

            <div class="numberOne">
                <div class="PBox">
                    <p>1</p>
                </div>
                <p>Fabric </p>
                <p>+</p>
            </div>

            <div id="borderBottom"></div>

            <div class="numberOne">
                <div class="PBox">
                    <p>2</p>
                </div>
                <p>Leg </p>
                <p>+</p>
            </div>

            <div id="borderBottom"></div>

            <p>SHIP IT</p>
            <p>This item is made just for you. Anticipated delivery by late April.</p>
            <p>ZIP Code:60540</p>

            <div class="ImageCrate">
                <div class="crateImage">
                    <img src="https://cb.scene7.com/is/image/Crate/cb_mPDP_20230111_CBCC?&wid=200&qlt=90&op_sharpen=1"
                        alt="">
                </div>

                <div id="crateContent">
                    <u> <span style="font-weight: bold;"> Now through Feb.28:</span> <span style="color: #666666"> Zero
                            interest if paid in full
                            within 24 months*** on qualifying purchases.</span></u>
                </div>
            </div>

            <!-- Buttons with quantity -->
            <div id="quantity">

                <div id="buttons">
                    <button>&#45</button>
                    <span>${quantity}</span>
                    <button>&#43</button>
                </div>

                <div id="buttonPrice">
                    <p>${price}</p>
                </div>
            </div>
<div id="largeButtons">
<button data-modal-target="#modal" id="AddTOCart">ADD TO CART</button> <br>
<button id="AddTOReg">ADD TO REGISTRY</button>
</div>


${/* This is Add to cart pop up */""}

<div class="modal" id="modal">
<div class="modal-header">
    <button data-close-button class="close-button">&times;</button>
</div>
<div class="modal-body">
 
    <div class="confirm">
        <h1>Confirm Your Selection</h1>
    </div>
    <div id="flex">
        <div id="image">
            <img src="${imageUrl}"
                alt="error">
        </div>
        <div id="AcceptTerm">
            <p>We're pleased to make this item just for you. Our goal is to get every detail right, and we'll be
                getting started as soon as your order is placed. For this reason, made-to-order items cannot be
                canceled, returned, or exchanged.</p>
            <p>To continue, please accept these terms and add the item to your cart. If you decline, this item
                will
                not be added.</p>

            <button id="AddToLocalStorage">ACCEPT TERMS AND ADD TO CART</button> <br>
            <button data-close-button class="close-button">DECLINE</button>
        </div>
    </div>
</div>
</div>
<div id="overlay"></div>

${/* Add to cart pop up ENDS here*/""}


<div class="extraInfo">
<button>DETAIL</button> <br>
<button>REVIEWS</button><br>
<button>DIMENSION</button><br>
<button>CARE</button><br>
</div>
`
}


// --------------Content Section Function ENDS --------------->>


// ?--------Carousel starts----------->

function display() {
    for (let i = left; i <= right; i++) {
        document.getElementById("c" + i).style.display = "inline-block";
    }
    for (let i = left1; i <= right1; i++) {
        document.getElementById("d" + i).style.display = "inline-block";

    }
    // for (let i = left2; i <= right2; i++) {
    //     document.getElementById("e" + i).style.display = "inline-block";

    // }
}

let left = 1;
let right = 4;

function moveRight() {
    console.log("*******")
    if (left <= 4 && right <= 7) {
        document.getElementById("c" + left).style.display = "none";
        left += 1;
        right += 1;
        for (let i = left; i <= right; i++) {
            document.getElementById("c" + i).style.display = "inline-block";
        }
    }
    else {
        return;
    }
}

function moveLeft() {
    if (left >= 2 && right >= 5) {
        document.getElementById("c" + right).style.display = "none";
        left -= 1;
        right -= 1;
        for (let i = left; i <= right; i++) {
            document.getElementById("c" + i).style.display = "inline-block";
        }
    }
    else {
        return;
    }
}



let left1 = 1;
let right1 = 4;

function moveRight1() {
    console.log("*******")
    if (left1 <= 4 && right1 <= 7) {
        document.getElementById("d" + left1).style.display = "none";
        left1 += 1;
        right1 += 1;
        for (let i = left1; i <= right1; i++) {
            document.getElementById("d" + i).style.display = "inline-block";
        }
    }
    else {
        return;
    }
}

function moveLeft1() {
    if (left1 >= 2 && right1 >= 5) {
        document.getElementById("d" + right1).style.display = "none";
        left1 -= 1;
        right1 -= 1;
        for (let i = left1; i <= right1; i++) {
            document.getElementById("d" + i).style.display = "inline-block";
        }
    }
    else {
        return;
    }
}




