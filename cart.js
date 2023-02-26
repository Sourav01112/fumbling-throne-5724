let container=document.getElementById("cart-bag");



window.addEventListener("load",()=>{
    getcard();
});

// async function fetchCarddata(){
//     try{
//         let item_data = await fetch("./db.json")
//         let data = await item_data.json();
//         console.log(data.Products)
//         getcard(data.Products);
//     }
//     catch(error){
//         console.log(error);
//     }
// }

let cartArr=JSON.parse(localStorage.getItem("cart"))||[]
console.log(cartArr)
let all_total=document.getElementById("all-total");
let shipping_charges=document.getElementById("shipping-charge");
let shipping_discount=document.getElementById("shipping-discount");
let grand_total=document.getElementById("grand-total");
let promocode=document.getElementById("promocode");
let promo_button=document.getElementById("apply");
let totalitems=document.getElementById("totalitems");
let checkout=document.getElementById("checkout");
let tax=document.getElementById("tax");
let cartnum=document.getElementById("cartnum");

function getcard(){
    container.innerHTML="";
    cartArr.forEach(element => {
      let item=document.createElement("div");
      let hr=document.createElement("hr");
      let image=document.createElement("img");
      image.setAttribute("src",element.image);

      let upper=document.createElement("div");

      let title=document.createElement("h2");
      title.innerText= element.title;

      let buttons=document.createElement("div");
      let increment=document.createElement("button");
      increment.innerText="+";
      increment.addEventListener("click",()=>{
        element = element.quantity++;
        localStorage.setItem("cart",JSON.stringify(cartArr))
        getcard();
      })

      let quantity=document.createElement("p");
      quantity.innerText= element.quantity;

      let decrement=document.createElement("button");
      decrement.innerText="-";
      decrement.addEventListener("click",()=>{
        if(element.quantity>1){
            element=element.quantity--;
            localStorage.setItem("cart",JSON.stringify(cartArr))
            getcard();
        }
      })

      let price=document.createElement("h3");
      price.innerText= `$${element.price}`;

      let inner=document.createElement("div");
      
      let type=document.createElement("p");
      type.innerText= "Type:  "+element.type;

      let color=document.createElement("p");
      color.innerText= "Color:  "+element.color;

      let Delete=document.createElement("button");
      Delete.innerText="Remove";
      Delete.addEventListener("click",()=>{
        cartArr = cartArr.filter((ele)=>{
            return ele.id!==element.id;
        })
        localStorage.setItem("cart",JSON.stringify(cartArr))
        showcart();
        getcard();
      })
      
      buttons.append(increment,quantity,decrement);
      upper.append(buttons,price,Delete)
      inner.append(title,color,type);
      item.append(image,inner,upper);
      container.append(item,hr);
    });

    //calculating the price here
    let sum=0;
    for(let i=0;i<cartArr.length;i++){
        sum+=cartArr[i].price*cartArr[i].quantity;
    }
    if(sum>0){
        all_total.innerText=sum;
    }else{
        all_total.innerText=0;
    }
    

    let alltotal=0;
    if(sum>=5000){
        shipping_charges.innerText=25;
        shipping_discount.innerText=25;
        tax.innerText=0
        alltotal=sum;
        grand_total.innerText=sum;
    }
    else if(sum<5000){
        if(sum>0){
            grand_total.innerText=(sum+25);
        }
        tax.innerText=0;
        alltotal=(sum+25);
        if(sum>0){
        shipping_charges.innerText=25;
        }
        shipping_discount.innerText=0;
    }

    //promo code applying here
    promo_button.addEventListener("click",()=>{
        if(promocode.value=="flat50"){
            grand_total.innerText=(alltotal-50);
        }
        else if(promocode.value=="flat100"){
            grand_total.innerText=(alltotal-100);
        }
        else if(promocode.value==""){
            grand_total.innerText=alltotal;
        }
        else{
            alert("Enter valid promo code");
        }
    })
}
getcard();

//showing cart details
function showcart(){
if(cartArr.length==0){
    totalitems.innerText=`(${0} items)`
    grand_total.innerText=0;
    all_total.innerText=0;
    shipping_charges.innerText=0;
    shipping_discount.innerText=0;
    tax.innerText=0;
}
else if(cartArr.length>0){
    totalitems.innerText=`(${cartArr.length} items)`;
    cartnum.innerText= cartArr.length;
}
}
showcart();

//checkout code is here

checkout.addEventListener("click",()=>{
    if(cartArr.length<1){
        alert("First add some items in cart");
    }
    else{
        cartArr=null;
        localStorage.setItem("cart",JSON.stringify(cartArr));
        alert("🎉Congratulations🎉 Order Placed Successfully, Item Will be Deliverd Soon")
        grand_total.innerText=0;
        all_total.innerText=0;
        shipping_charges.innerText=0;
        shipping_discount.innerText=0;
        tax.innerText=0;
        getcard();
    }
    window.location.assign("popup.html");
})
