let data = []
async function display(color, type,page=1) {
    try {
     //  condition for filter___start
      let url = "";
      if (color && type) {
       url = `http://localhost:3000/Products1?color=${color}&type=${type}`
      } else if (type) {
       url = `http://localhost:3000/Products1?type=${type}`
      } else if (color) {
       url = `http://localhost:3000/Products1?color=${color}`
      }
       else {
      url = "http://localhost:3000/Products1";
      }
     //  condition End_
     
       let res = await fetch(url)
       res =  await res.json();
       console.log(res);
       data  = res;
     //  displaypro(data);

      displaypro(data,page);
      
    } catch (error) {
     console.log(error)
    }
}
display();

//  pagination ____________
let currentPage = 1;
const productsPerPage = 10;
//  ______________pagination end

// display product making card_________________________
let Products = document.getElementById("append");
 function displaypro(data){
   Products.innerHTML="";

   // pagination___________
   const startIndex = (currentPage - 1) * productsPerPage;
   const endIndex = startIndex + productsPerPage;
   const productsToShow = data.slice(startIndex, endIndex);
 //  ___________________pagination end
   
 console.log(data)

   // data .foreach____
   productsToShow.forEach(element => {
       let productcard = document.createElement('div');
        productcard.setAttribute('class','card');
        productcard.setAttribute("data-id",element.id)
        productcard.addEventListener("click", ()=>{
         SingleProduct(element.id);
        })
        let img = document.createElement('img');
        img.setAttribute('src',element.image);
        let tittle = document.createElement('span');
        tittle.innerText = element.title ;
        let price = document.createElement('h5');
        price.innerText=`$${element.price}`
        let  Newarrival = document.createElement("p");
        Newarrival.innerText = element.Newarrival
        let type = document.createElement("p");
        type.innerText=element.type
        let color = document.createElement("p");
        color.innerText=element.color
        let id = document.createElement('p');
        id.innerText= element.id ;
     
         productcard.append(img,tittle,price);
         Products.append(productcard) ;
  });


 //  pagination___________

 const numPages = Math.ceil(data.length / productsPerPage);
 const pagination = document.getElementById("pagination");
 pagination.innerHTML = "";
 for (let i = 1; i <= numPages; i++) {
   const button = document.createElement("button");
   button.innerText = i;
   if (i === currentPage) {
     button.setAttribute("disabled", true);
   }
   button.addEventListener("click", () => {
     currentPage = i;
     displaypro(data,i);
   });
   pagination.append(button);
 }

 // _________________________pagination____end
  
 
 }

// filter by [ color && type ]
 function filterdata() {
   let filterbycolor = document.getElementById("color").value;
   let filterbytype = document.getElementById("type").value
   console.log(filterbycolor,filterbytype,"======")
   display(filterbycolor, filterbytype);
 }
// filter end___________


 







// standup________Deepanshu****
 function SingleProduct(id){
  //  console.log(id);
 window.location.assign("myCartPage.html")
 }