 let data = []
 async function display() {
     try {
        let res = await fetch("http://localhost:3000/Products")
        res =  await res.json();
        console.log(res);
        data  =res;
       displaypro(data);
     } catch (error) {
        console.log(error)
     }
 }
 display();

 let Products = document.getElementById("append");
  function displaypro(data){
    Products.innerHTML="";

    data.forEach(element => {
        let productcard = document.createElement('div');
         productcard.setAttribute('class','card');
         
         let img = document.createElement('img');
         img.setAttribute('src',element.image);

         let tittle = document.createElement('span');
         tittle.innerText = element.title ;
          
         let price = document.createElement('h3');
         price.innerText=`$${element.price}`

          

         let id = document.createElement('p');
         id.innerText= element.id ;
      
          productcard.append(img,tittle,price);
          Products.append(productcard) ;
   });
  }