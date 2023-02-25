 let data = []
 async function display(color, type) {
     try {
      //  condition for filter___start
       let url = "";
       if (color && type) {
        url = `http://localhost:3000/Products?color=${color}&type=${type}`
       } else if (type) {
        url = `http://localhost:3000/Products?type=${type}`
       } else if (color) {
        url = `http://localhost:3000/Products?color=${color}`
       } else {
       url = "http://localhost:3000/Products";
       }
      //  condition End_
      
        let res = await fetch(url)
        res =  await res.json();
        console.log(res);
        data  = res;
       displaypro(data);
     } catch (error) {
      console.log(error)
     }
}
 display();
 
 let Products = document.getElementById("append");
  function displaypro(data){
    Products.innerHTML="";
    console.log(data)
    data.forEach(element => {
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
    
     
  }

// filter by [ color && type ]
  function filterdata() {
    let filterbycolor = document.getElementById("color").value;
    let filterbytype = document.getElementById("type").value
    console.log(filterbycolor,filterbytype,"======")
    display(filterbycolor, filterbytype);
  }

 
 
// standup________
  // function SingleProduct(id){
  //   console.log(id);
  // }