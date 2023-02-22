
//? Fetch

window.addEventListener("load", () => {
    // fetchAndRenderProduct()
    fetchAndRenderSmallImages()
})

// async function fetchAndRenderProduct(queryParamString = null) {
//     try {
//         let resp = await fetch(`http://localhost:3000/Products${queryParamString ? queryParamString : ""}`)
//         let data = await resp.json()
//         let productData = data.map((item) => ({
//             // SmallimageUrl: item.smallImages,
//             imageUrl: item.images,
//             name: item.title,
//             price: item.price,
//             quantity: item.quantity
//         }))
//         renderCardSection(productData)

//     } catch (error) {
//         console.log(error)
//     }
// }



let mainSection = document.querySelector(".Big_cont")


function renderCardSection(cardsData) {
    let cardSection = `
<div> ${cardsData.map((item) => getCard(item.imageUrl, item.name, item.price, item.quantity)).join("")}</div>`;
    mainSection.innerHTML = cardSection

    let cartArr = JSON.parse(sessionStorage.getItem("cart")) || []

    //* <---------------- Add to Cart ------------->

    let addToCart = document.querySelector("#AddTOCart")
    addToCart.addEventListener("click", (element) => {
        if (checkDuplicate(element)) {
            alert("Product has already been Added")
        } else {
            cartArr.push({ ...element, quantity: 1 })
            sessionStorage.setItem("cart", JSON.stringify(cardsData))
            alert("Product has been Added")
        }
    })

    function checkDuplicate(element) {
        for (let i = 0; i < cartArr.length; i++) {
            if (cartArr[i].id == element.id) {
                return true
            }
        }
        return false
    }

}



//* --------------SMALL Images --------------->>

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
<div> ${cardsData.map((item) => getCard(item.SmallImageUrl)).join("")}</div>`;
    mainSection.innerHTML = cardSection
}

function smallImages(SmallImageUrl){
    return `
    <div id="Small_Img">
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
        </div>
    `
}

function getCard(imageUrl, name, price, quantity) {
    return `
        <div id="Big-Img">
            <img src="${imageUrl}"
                alt="">
        </div>



        <div id="content">
           
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

            <button id="AddTOCart">ADD TO CART</button>
            <button id="AddTOReg">ADD TO REGISTRY</button>

        </div>

`

}




