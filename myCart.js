
//? Fetch

window.addEventListener("load", () => {
    fetchAndRenderSmallImages()
    fetchAndRenderBigImages()
    fetchAndRenderContent()
})
let globalArr = []

// --------------SMALL Images --------------->>
let smallImageSection = document.querySelector("#Small_Img")

async function fetchAndRenderSmallImages(queryParamString = null) {
    try {
        let resp = await fetch(`http://localhost:3000/Products/3/${queryParamString ? queryParamString : ""}`)
        let data = await resp.json()

        renderSmallImagesSection(data.smallImages)
    } catch (error) {
        console.log(error)
    }
}

function renderSmallImagesSection(cardsData) {
    // console.log(cardsData)
    let cardSection = `
 ${cardsData.map((item) => smallImages(item)).join("")}`;
    smallImageSection.innerHTML = cardSection

}

function smallImages(SmallImageUrl) {
    return `
            <img class="slides" src="${SmallImageUrl}"
                alt="">
    `
}
// --------------SMALL Images Function ENDS --------------->>


// --------------BIG Image Function --------------->>

let BigImageSection = document.querySelector("#Big-Img")

async function fetchAndRenderBigImages(queryParamString = null) {
    try {
        let resp = await fetch(`http://localhost:3000/Products/3/${queryParamString ? queryParamString : ""}`)
        let data = await resp.json()

        // console.log(data)
        renderBIGImageSection(data.images)

    } catch (error) {
        console.log(error)
    }
}

function renderBIGImageSection(cardsData) {
    // console.log(cardsData)
    let cardSection = `
 ${BigImage(cardsData)}`;
    BigImageSection.innerHTML = cardSection

}

function BigImage(imageUrl) {
    return `  <img src="${imageUrl}"alt="">`
}

// --------------BIG Image Function ENDS--------------->>

// --------------Content Section Function STARTS --------------->>

let ContentSection = document.querySelector("#content")

async function fetchAndRenderContent() {
    try {
        let resp = await fetch(`http://localhost:3000/Products/3`)
        let data = await resp.json()
        // console.log(data)
        globalArr = data
        console.log(globalArr)
        renderContentSection(data.title, data.price, data.images)



    } catch (error) {
        console.log(error)
    }
}
// 



function renderContentSection(title, price, images) {
    // console.log(cardsData)
    let cardSection = `${getContent(title, price, images)} `;

    ContentSection.innerHTML = cardSection



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

    let cartArr = JSON.parse(localStorage.getItem("cart")) || []

    addtocart.addEventListener("click", (element) => {
        if (checkDuplicate(element)) {
            alert("Product Already In The Cart")
        } else {
            // globalArr.push({ ...element, quantity: 1 })
            localStorage.setItem("cart", JSON.stringify(globalArr))
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


    // * <div> Hide - show function

    let xtrabutton = document.getElementById("xtra")

    //  let toggle = button => {

    xtrabutton.addEventListener("click", () => {

        let element = document.getElementById("mydiv");
        let hidden = element.getAttribute("hidden");

        if (hidden) {
            element.removeAttribute("hidden");
            xtrabutton.innerText = "DETAILS";
        } else {
            element.setAttribute("hidden", "hidden");
            xtrabutton.innerText = `DETAILS`;
        }
    })

    // Quantity Increment or Decrement button Function

    let incrementBTN = document.getElementById("incr")
    incrementBTN.addEventListener("click", (element) => {
        element.quantity++
        console.log(element.quantity)
        localStorage.setItem("cart", JSON.stringify(globalArr))
    })


    let decrementBTN = document.getElementById("decr")
    decrementBTN.addEventListener("click", (element) => {
        element.quantity--
        console.log(element.quantity)
        localStorage.setItem("cart", JSON.stringify(globalArr))
    })


}




function getContent(title, price, images, quantity) {
    return `
            <h1>${title}</h1>

            <p id="Sku">SKU: 414500</p>
            <!-- append here -->

            <p id="priceSKU">${price}</p>



            <p id="crate">CRATE & BARREL EXCLUSIVE</p>
            <div class="box">
                <p>SEE WHAT'S AVAILABLE SOONEST</p>
            </div>
            <a href="#" id="onDIsp">ON DISPLAY IM MY STORE?</a>

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
                    <button id="decr">&#45</button>
                    <span>${quantity}</span>
                    <button id="incr">&#43</button>
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
            <img src="${images}"
                alt="error">
        </div>
        <div id="AcceptTerm">
            <p>We're pleased to make this item just for you. Our goal is to get every detail right, and we'll be
                getting started as soon as your order is placed. For this reason, made-to-order items cannot be
                canceled, returned, or exchanged.</p>
            <p>To continue, please accept these terms and add the item to your cart. If you decline, this item
                will
                not be added.</p>

            <button id="AddToLocalStorage" class="hover-underline-animation2">ACCEPT TERMS AND ADD TO CART</button> <br>
            <button data-close-button class="close-button" id="hover-underline-animation3">DECLINE</button>
        </div>
    </div>
</div>
</div>
<div id="overlay"></div>

${/* Add to cart pop up ENDS here*/""}

<button id="xtra" class="extraInfo">Details</button>

<div id="mydiv">

<p>A Crate & Barrel classic, the Petrie chair sits at the intersection of mid-century and today, with clean lines and tailored cushions expertly button-tufted by hand. The chair's pure 1960s aesthetic is scaled deep so you can sit firm and upright, with the option of slouching back in comfort. Green cotton velvet tailors the chair's sleek, boxy cushions and slim track arms with rich color, durability and a luxuriously soft hand.</p>

<p>Petrie Velvet Mid-Century Chair 35"Wx36"Dx32"H</p>
<ul type="disk">
<li>Frame is benchmade with hardwood that's kiln-dried to prevent warping</li>
<li>Cotton velvet</li>
<li>Sinuous wire spring suspension system</li>
<li>Seat cushion has soy-based polyfoam wrapped in fiber encased in downproof ticking</li>
<li>Back cushion has a blend of virgin and recycled fiber encased in downproof ticking</li>
<li>Hardwood legs finished with a dark ebony stain</li>
<li>Topstitched and button-tufted detail</li>
<li>See product label or call customer service for additional details on product content</li>
</ul>

</div>

<button id="xtra" class="extraInfo">REVIEWS</button>
<button id="xtra" class="extraInfo">DIMENSION</button>
<button id="xtra" class="extraInfo">CARE</button>

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

}

let left = 1;
let right = 4;

function moveRight() {
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


// ? INDIVIDUAL cards ADD to BUTTON


let BtnINP = document.querySelector("#indiCardBTN")
BtnINP.addEventListener("click", (element) => {
    cartArr.push(element)
    sessionStorage.setItem("cart", JSON.stringify(cardsData))
})



