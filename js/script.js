// ALL JAVASCRIPT FUNCTIONS//
function signup() {
    //alert('function work!!');
    //récuprer les valeurs d'input de signup.html
    var FirstName = document.getElementById('FirstName').value;
    var validFirstName = checkLength(FirstName, 3);
    if (validFirstName == false) {
        document.getElementById('firstNameErreur').innerHTML = 'pleas check ur name'
    }
    else {
        document.getElementById('firstNameErreur').innerHTML = ''
    }
    var LastName = document.getElementById('LastName').value;
    var validLastName = checkLength(LastName, 5);
    if (validLastName == false) {
        document.getElementById('lastNameErreur').innerHTML = 'please check ur last name'
    }
    else {
        document.getElementById('lastNameErreur').innerHTML = ''
    }
    var Email = document.getElementById('email').value;

    var passeword = document.getElementById('pwd').value;
    var validPwd = checkLength(passeword, 6);
    if (validPwd == false) {
        document.getElementById('PwdErreur').innerHTML = 'please check ur passweord'
    }
    else {
        document.getElementById('PwdErreur').innerHTML = ''
    }


    var confirmePwd = document.getElementById('pwd1').value;
    var p = confirm(passeword, confirmePwd);
    if (p == false) {
        document.getElementById('confi').innerHTML = 'password false'

    } else {
        document.getElementById('confi').innerHTML = ''

    }
    var tel = document.getElementById('tel').value;
    var validTel = checktel(tel, 8);
    if (validTel == false) {
        document.getElementById('telErreur').innerHTML = 'ur tel invailbal'
    }
    else {
        document.getElementById('telErreur').innerHTML = ''
    }


    if (validFirstName == true && validLastName == true && validPwd == true && p == true && validTel == true) {



        var usersTab = JSON.parse(localStorage.getItem("user") || "[]");
        //creat JSON object
        var user = {
            id: generateId(usersTab) + 1,
            fName: FirstName,
            lName: LastName,
            email: Email,
            pwd: passeword,
            confirmePwd: confirmePwd,
            tel: tel,
            
        };
        //save object to localStorage
        //JSON.stringify => convert Object to string
        //setItem : save value into key into Ls


        usersTab.push(user);
        localStorage.setItem('user', JSON.stringify(usersTab));


    }
}
// ADD Product
//function that saves prducts into Ls//
function addProduct() {
    // get input values//
    var name = document.getElementById('name').value;
    var validName = checkLength(name, 4)
    if (validName == false) {
        document.getElementById('erreurName').innerHTML = 'name invalid'
    }
    else {
        document.getElementById('erreurName').innerHTML = ''
    }

    var price = document.getElementById('price').value;
    var priceValid = checkNumberValue(price, 0)
    if (priceValid == false) {
        document.getElementById('erreurprice').innerHTML = 'price should be >0'
    }
    else {
        document.getElementById('erreurprice').innerHTML = ''
    }

    var stock = document.getElementById('stock').value;
    var stockValid = checkNumberValue(stock, 20)
    if (stockValid == false) {
        document.getElementById('erreurStock').innerHTML = 'stock should be >20'
    }
    else {
        document.getElementById('erreurStock').innerHTML = ''
    }

    var categorie = document.getElementById('categorie').value;
    if (validName == true && priceValid == true && stockValid == true) {
        // creat JSON object//
        var productsTab = JSON.parse(localStorage.getItem('Product') || '[]');
        var Product = {
            id: generateId(productsTab) + 1,
            prName: name,
            prPrice: price,
            prStock: stock,
            prCategorie: categorie
        };
        //save object to localStorage//
        // mchit LS ta7didan clé product w jebt menha la valeur w ken mlgitch cle nrej3 tab vide,w sabitou fi var esmha productsTab

        //pouchit onjet esmou product fi productTab
        productsTab.push(Product);
        // 9lebt productTab vers string w ba3ed rej3tha LS bedhbt fi clé product
        localStorage.setItem('Product', JSON.stringify(productsTab));




    }
}

//declaration d'une fonction qui verifi la longeur d'une chaine par rapport a nbr de caracter
function checkLength(ch, n) {
    if (ch.length < n) {
        return false;
    } else {
        return true;
    }
}
//declaration d'une fonction qui verifi la longeur de num de telephone
function checktel(tel, n) {
    if (tel.length < n) {
        return false;
    } else {
        return true;
    }
}
// declaration d'une fonction qui verifi la confirmation de password (check if 2 string are equal and  return t/f)
function confirm(ch, ch1) {
    // if (ch==ch1){
    //    return true;
    // } else{
    // return false;
    //}
    return (ch == ch1);
}
//declaration d'une fonction 
function checkNumberValue(val, n) {
    return (Number(val) > n);
}

// function  login that checks if user exist by email and pwd
function login() {
    var email = document.getElementById('loginE').value;
    var pwd = document.getElementById('loginP').value;
    var usersTab = JSON.parse(localStorage.getItem('user'));
    var findedUser;
    for (var i = 0; i < usersTab.length; i++) {
        if (usersTab[i].email == email && usersTab[i].pwd == pwd) {
            findedUser = usersTab[i];
            break;

        }

    }
    if (findedUser) {
        localStorage.setItem('connectedUserID', findedUser.id);
        location.replace("index.html");
    } else {
        document.getElementById('loginEreeur').innerHTML = 'please check email and password';
        document.getElementById('loginEreeur').style.color = "red";
    }
    //function that generate Id
}
function generateId(T) {
    var max;
    if (T.length == 0) {
        max = 0;

    } else {
        max = T[0].id;
        for (var i = 0; i < T.length; i++) {
            if (T[i].id > max) {
                max = T[i].id;

            }

        }


    }
    return max;


}
//function that generat html bloc t.length *
function displayProducts() {
    var productsTab = JSON.parse(localStorage.getItem("Product") || "[]");
    //productsTab[{id,prName,prStock,prCategory},{},{}..]
    var content = '';
    for (var i = 0; i < productsTab.length; i++) {
        content = content +`
            <div class="row" style="margin-top: 200px;">
        
        <div class="col-lg-3 col-md-6">
            <div class="single-product">
                <img class="img-fluid" src="img/product/p1.jpg" alt=""></img>
                <div class="product-details"> </div>
                    <h6>${productsTab[i].prName}</h6>
                    <div class="price">
                        <h6>Stock:${productsTab[i].prStock}</h6>
                        <h6 class="l-through">Price ${productsTab[i].prPrice}$</h6>
                    </div>
	</div>
    </div>
    <div> <button onclick="goToDisplayProduct(${productsTab[i].id} )" >Display</button></div>
    </div> ;`



    }
    document.getElementById("productsDiv").innerHTML = content;
}
function goToDisplayProduct(id) {
    localStorage.setItem("displayedProduct", id);
    location.replace("productDetails.html")
}
function displayedProductDetails() {
    var idProduct = localStorage.getItem("displayedProduct");
    var productsTab = JSON.parse(localStorage.getItem("Product"));
    var findedProduct;
    for (let i = 0; i < productsTab.length; i++) {
        if (productsTab[i].id == idProduct) {
            findedProduct = productsTab[i];
            break;

        }



    }
    document.getElementById("productName").innerHTML = findedProduct.prName;
    document.getElementById("productPrice").innerHTML = findedProduct.prPrice;
    document.getElementById("productCategory").innerHTML = findedProduct.prCategorie;
    if (findedProduct.prStock > 0) {
        document.getElementById("productStock").innerHTML = "in stock";

    } else {
        document.getElementById("productStock").innerHTML = "out of stock";
    }
}
//function that save order into ls
function addToBasket() {
    var qty = document.getElementById("quantity").value;
    var connectedUserID = localStorage.getItem("connectedUserID");
    var productId = localStorage.getItem("displayedProduct");

    var ordersTab = JSON.parse(localStorage.getItem('orders') || '[]');
    var product=searchObjectByIdAndKey(productId,'product')

   if (qty>0 && qty<= product.prStock){
   //get all orders from ls
   var ordersTab=JSON.parse(localStorage.getItem('orders') ||'[]')
   //creat order object
   var order = {
    id: generateId(ordersTab) + 1,
    idProduct: productId,
    userid: connectedUserID,
    quantity: qty
};

ordersTab.push(order);
localStorage.setItem('orders', JSON.stringify(ordersTab));
//update product stock
var product=JSON.parse(localStorage.getItem('product')||'[]')
//search product by id and update stock
for (var i = 0; i < product.length; i++) {
    if (product[i].id==productId){
        product[i].prStock=product[i].prStock-qty;
        break;
    }
}
   } else{
       alert('please check qty or stock unavailbal')
   }

}
// function addCategory that creat category object into LS (key:categories)
function addCategory() {
    var name = document.getElementById("categoryName").value;
    if (name.length >= 2) {
        //afficher un msg vide
        document.getElementById("nameCategoryErreur").innerHTML = "";

    } else {
        //afficher msg errur
        document.getElementById("nameCategoryErreur").innerHTML = "min length name > 2";
    }
    //creat JSON object

    var categoriesTab = JSON.parse(localStorage.getItem('categories')||'[]')
    var category = {
        id: generateId(categoriesTab) + 1,
        name: name
    };


    categoriesTab.push(category);
    localStorage.setItem("categories", JSON.stringify(categoriesTab));
}
//functio, displayOrders That display all users orders into table
function displayOrders() {
    //get all orders from ls from odres key
    var ordersTab = JSON.parse(localStorage.getItem('orders') || '[]')
    var content = '';
    //loop tr orderstab .length times
    for (let i = 0; i < ordersTab.length; i++) {
        content = content + `
              <tr>
                                <td>
                                   ${ordersTab[i].id} 
                                </td>
                                <td>
                                ${searchObjectByIdAndKey(ordersTab[i].idProduct,'Product').prName}  
                                </td>
                                <td>
                                ${searchObjectByIdAndKey(ordersTab[i].idProduct,'Product').prPrice} 
                                </td>
                                <td>
                                ${ordersTab[i].quantity}
                                </td>
                                <td>
                                ${ordersTab[i].quantity} 
                                </td>
                                <td>
                                ${ordersTab[i].quantity} 
                                </td>
                                <td>
                                ${ordersTab[i].quantity} 
                                </td>
                                <td>
                                <button class="btn btn-danger" onclick="deleteOrder()"> delete </button 
                                </td>
                            </tr>`

    }
    document.getElementById('ordersTab').innerHTML = content;
}
function searchUser (x) {
    var usersTab=JSON.parse(localStorage.getItem('user')||'[]');
    var findedUser;
    for (let i = 0; i < usersTab.length; i++) {
        if(usersTab[i].id==x){
            findedUser=usersTab[i];
            break;
        }
        
    }
    return findedUser
  }
 function searchProduct(x){
     var productTab=JSON.localStorage.getItem('Product')||'[]';
     var findedProduct;
     for (let i = 0; i < usersTab.length; i++) {
         if(productTab[i].id==x){
            findedProduct=usersTab[i];
             break;
         }
         
     }
     return findedProduct
 } 
 //1ere solution search object by id from array 
 function searchObjectById(x,t){
    
    var findedObject;
    for (let i = 0; i < t.length; i++) {
        if(productTab[i].id==x){
            findedObject=t[i];
            break;
        }
        
    }
    return findedObject;
}
 //2er=me solution search object by id from array 
 function searchObjectByIdAndKey(x,key){
     var t=JSON.parse(localStorage.getItem(key)||'[]');
     var findedObject;
    for (let i = 0; i < t.length; i++) {
        if(t[i].id==x){
            findedObject=t[i];
            break;
        }
        
    }
    return findedObject;
 }
function deleteOrder(x){
    var orders=JSON.parse(localStorage.getItem('orders')||'[]')
    orders.splice(x,1);
    localStorage.setItem('orders',JSON.stringify(orders));
    location.reload();
}
//function that return order position by id frome order
function searchOrderPositionById(idParam){
    var t=JSON.parse(localStorage.getItem ('orders') ||'[]')
    var position;
    for (var i=0;i<t.length;i++){
        if (t[i].id==idParam){
            position=i;
            break
        }
        }
        return position;
    }
  function updateProduct(id,qty){
    var product=JSON.parse(localStorage.getItem('product')||'[]')
    //search product by id and update stock
    for (var i = 0; i < product.length; i++) {
        if (product[i].id==productId){
            product[i].prStock=product[i].prStock-qty;
            break;
        }
    }
    //set all product into ls after update
    localStorage.setItem('product',JSON.stringify(product));
  }  
  //fucntion that return alla object from ls from key
  function getObjectsFromLS(key){
      return JSON.parse(localStorage.getItem (key) ||'[]')
  }

  //function generat header
  function generateHeader () {
      var connectedUserID=localStorage.getItem('connectedUserID');
      
      var content=''
      if (connectedUserID){
          // user is connected
          var connectedUserID=searchObjectByIdAndKey(connectedUserID,'user')
          content= content+`
         
          <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li></ul>
          <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li></ul>
          <li class="nav-item"><a class="nav-link" href="login.html">Login</a></li></ul>
          <li class="nav-item"><a class="nav-link" href="profile.html">hello ${connectedUserID.fName}</a></li></ul>
         
          <li class="nav-item"><a class="nav-link" href="Products.html">Products</a></li></ul>
          <li class="nav-item"><a class="nav-link" onclick="logout()">log out</a></li></ul>`

      } else{
           // user is  not connected
           content= content+`
         
           <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li></ul>
           <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li></ul>
           <li class="nav-item"><a class="nav-link" href="signup.html">Signup</a></li></ul>`

      }
      document.getElementById('headerId').innerHTML=content;
    }


    function  logout() {  
        localStorage.removeItem('connectedUserID')
        location.replace('index.html')
    }
    function profile()  { 
        var connectedUserID=localStorage.getItem('connectedUserID');
        var content='';
        if (connectedUserID) {
            var connectedUserID=searchObjectByIdAndKey(connectedUserID,'user')
            content=content+`
            <div class="col-md-12 form-group">
            <input type="text" class="form-control"  placeholder="${connectedUserID.fName}"  id="LastName">
            <span id="lastNameErreur" ></span>
               
            </div>
            <div class="col-md-12 form-group">
                <input type="text" class="form-control"  placeholder="${connectedUserID.lName}" id="LastName">
                <span id="lastNameErreur" ></span>
            </div>
            <div class="col-md-12 form-group">
                <input type="email" class="form-control"  placeholder="${connectedUserID.email}" id="email">
            </div>
            <div class="col-md-12 form-group">
                <input type="number" class="form-control"  placeholder="${connectedUserID.tel}" id="pwd">
                <span id="PwdErreur" ></span>
            </div>
            
            <div class="col-md-12 form-group">
                
            </div>
            
        </div>`
        }
          document.getElementById('profileDiv').innerHTML=content  

     }
     function signupStor()  { 
         //alert('function work!!');
    //récuprer les valeurs d'input de signup.html
    var FirstName = document.getElementById('FirstName').value;
    var validFirstName = checkLength(FirstName, 3);
    if (validFirstName == false) {
        document.getElementById('firstNameErreur').innerHTML = 'pleas check ur name'
    }
    else {
        document.getElementById('firstNameErreur').innerHTML = ''
    }
    var LastName = document.getElementById('LastName').value;
    var validLastName = checkLength(LastName, 5);
    if (validLastName == false) {
        document.getElementById('lastNameErreur').innerHTML = 'please check ur last name'
    }
    else {
        document.getElementById('lastNameErreur').innerHTML = ''
    }
    var Email = document.getElementById('email').value;

    var passeword = document.getElementById('pwd').value;
    var validPwd = checkLength(passeword, 6);
    if (validPwd == false) {
        document.getElementById('PwdErreur').innerHTML = 'please check ur passweord'
    }
    else {
        document.getElementById('PwdErreur').innerHTML = ''
    }


    var confirmePwd = document.getElementById('pwd1').value;
    var p = confirm(passeword, confirmePwd);
    if (p == false) {
        document.getElementById('confi').innerHTML = 'password false'

    } else {
        document.getElementById('confi').innerHTML = ''

    }
    var tel = document.getElementById('tel').value;
    var validTel = checktel(tel, 8);
    if (validTel == false) {
        document.getElementById('telErreur').innerHTML = 'ur tel invailbal'
    }
    else {
        document.getElementById('telErreur').innerHTML = ''
    }
    var Adresse = document.getElementById('adresse').value;


    if (validFirstName == true && validLastName == true && validPwd == true && p == true && validTel == true) {
        location.replace('index.html')
        



        var usersTab = JSON.parse(localStorage.getItem("user") || "[]");
        //creat JSON object
        var user = {
            id: generateId(usersTab) + 1,
            fName: FirstName,
            lName: LastName,
            email: Email,
            pwd: passeword,
            confirmePwd: confirmePwd,
            tel: tel,
            Adresse:Adresse,
            role:'stor'
        };
        //save object to localStorage
        //JSON.stringify => convert Object to string
        //setItem : save value into key into Ls


        usersTab.push(user);
        localStorage.setItem('user', JSON.stringify(usersTab));


    }

      }
      function display() { 
          //get all orders from ls from odres key
    var userTab = JSON.parse(localStorage.getItem('user') || '[]')
    var content = '';
    //loop tr orderstab .length times
    for (let i = 0; i < userTab.length; i++) {
        content = content + `
              <tr>
                                <td>
                                   ${userTab[i].id} 
                                </td> 
                                <td>
                                   ${userTab[i].fName} 
                                </td> 
                                <td>
                                   ${userTab[i].lName} 
                                </td> 
                                <td>
                                   ${userTab[i].email} 
                                </td> 

    }           </tr>`
}
document.getElementById('displayDiv').innerHTML=content  


      }