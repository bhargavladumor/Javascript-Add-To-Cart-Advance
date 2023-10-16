var name1 = document.getElementById("name1");
var old_price = document.getElementById("old_price");
var price = document.getElementById("price");
var rating = document.getElementById("rating");
var qty = document.getElementById("qty");
var image = document.getElementById("image");
var addedItems = document.querySelector(".cart");
var addP = document.querySelector(".addData");

var products = [];
var added_products = [];

var pro = JSON.parse(localStorage.getItem("product"))
if (pro == null) {
    products = [];
    document.querySelector(".empty").style.display = "block";
}
else {
    products = pro;
}

function addData() {
    var obj = {
        name: name1.value,
        old_price: old_price.value,
        price: price.value,
        rating: rating.value,
        qty: qty.value,
        image: image.files[0].name,
        id : Math.floor(Math.random()*900+100)
    }
    products.push(obj);
    localStorage.setItem("product", JSON.stringify(products))
    viewData();
    name1.value = '';
    old_price.value = '';
    price.value = '';
    rating.value = '';
    qty.value = '';
    image.value = '';
    document.querySelector(".cart").style.right = "-400px";
    document.querySelector(".addData").style.left = "-450px";
}

viewData();
function viewData() {
    var items = JSON.parse(localStorage.getItem("product"));
    
    if (items != null) {
        document.querySelector(".empty").style.display = "none";
        var resultHTML = "";
        items.map((v, i) => {
            resultHTML += `<div class="item">`;
            resultHTML += `<image src="images/${v.image}" />`;
            resultHTML += `<div class="content">`;
            resultHTML += `<h3>${v.name}</h3>`;
            resultHTML += `<h4>Old Price : &#x20B9; <del>${v.old_price}</del></h4>`;
            resultHTML += `<h4>New Price : &#x20B9; ${v.price}</h4>`;
            resultHTML += `<h4 class="rate">Rating : ${v.rating}</h4>`;
            resultHTML += `<a class="btn" href="javascript:addToCart(${i},${v.id})">Add To Cart</a>`
            resultHTML += `</div>`;
            resultHTML += `<a class="deleteBtn" href="javascript:deleteProduct(${i})"><i class="ri-delete-bin-6-fill"></i></a>`;
            resultHTML += "</div>";
        });
        document.getElementById("productList").innerHTML = resultHTML;
    }
    if(items == null || items.length == 0)
    {
        document.querySelector(".empty").style.display = "block";
    }
    
    addedItems.style.right = "-400px"
    addP.style.left = "-450px"
}

function deleteProduct(index)
{
    products.splice(index,1);
    localStorage.setItem("product", JSON.stringify(products))

    document.getElementById("message").innerHTML = "Product deleted successfully !";
    document.getElementById("message").style.visibility = "visible";
    setTimeout(()=>{
        document.getElementById("message").style.visibility = "hidden";
    },4000)
    viewData();
}

function addToCart(p_index, p_id)
{
    var cart = JSON.parse(localStorage.getItem("cart"))
    if (cart == null) {
        added_products = []
    }
    else {
        added_products = cart;
    }
    if(cart == null)
    {
        added_products.push(products[p_index]);
        localStorage.setItem("cart", JSON.stringify(added_products));
        
        document.getElementById("message").innerHTML = "Added to cart successfully !";
        document.getElementById("message").style.visibility = "visible";
        setTimeout(()=>{
            document.getElementById("message").style.visibility = "hidden";
        },4000);
        viewCart();
    }
    else
    {
        var test;
        added_products.map((v)=>{
            if(v.id == p_id)
            {
                document.getElementById("message").innerHTML = "Product is already in cart!";
                document.getElementById("message").style.visibility = "visible";
                setTimeout(()=>{
                    document.getElementById("message").style.visibility = "hidden";
                },4000);
                test = true;
            }
        })
        if(!test)
        {
            added_products.push(products[p_index]);
            localStorage.setItem("cart", JSON.stringify(added_products));
            
            document.getElementById("message").innerHTML = "Added to cart successfully !";
            document.getElementById("message").style.visibility = "visible";
            setTimeout(()=>{
                document.getElementById("message").style.visibility = "hidden";
            },4000);
        }
        viewCart(); 
    }
    document.querySelector(".cart").style.right = "-400px";
    document.querySelector(".addData").style.left = "-450px";
}

document.getElementById("pro-cart").addEventListener('click',cartPanel = ()=>{
    if(addedItems.style.right === "0px")
    {
        addedItems.style.right = "-400px"
    }
    else
    {
        addedItems.style.right = "0px"
    }
})

addPanel=()=>{
    if(addP.style.left === "0px")
    {
        addP.style.left = "-450px"
    }
    else
    {
        addP.style.left = "0px"
    }
}

var innerItems;
function viewCart()
{
    innerItems = JSON.parse(localStorage.getItem("cart"));
    if (innerItems != null) {
        var totalAmt = 0;
        var innerResultHTML = "";
        var itemNo = 0;
        innerItems.map((v, i) => {
            innerResultHTML += `<div class="cart_product">`;
            innerResultHTML += `<div class="pro_index">${i+1}.</div>`;
            innerResultHTML += `<div class="innerImage">`;
            innerResultHTML += `<img src="images/${v.image}" height="50">`;
            innerResultHTML += `</div>`;
            innerResultHTML += `<div class="innerText">`;
            innerResultHTML += `<div class="innerName">${v.name}</div>`;
            innerResultHTML += `<div class="innerPrice">&#x20B9; ${v.price}</div>`;
            innerResultHTML += `</div>`;
            innerResultHTML += `<div class="qty">`
            innerResultHTML += `<a href="javascript:decrement(${v.id}, ${v.qty})" class="decre">-</a>`
            innerResultHTML += `<div class="qtyNo">${v.qty}</div>`
            innerResultHTML += `<a href="javascript:increment(${v.id}, ${v.qty})" class="incre">+</a>`
            innerResultHTML += `</div>`
            innerResultHTML += `<div class="tPrice">&#x20B9; ${v.price * v.qty}</div>`;
            innerResultHTML += `<div class="innerRemove">`;
            innerResultHTML += `<a href="javascript:deleteCart(${i})"><i class="ri-delete-bin-6-fill"></i></a>`;
            innerResultHTML += `</div>`;
            innerResultHTML += `</div>`;
            totalAmt += Number(v.price*v.qty);
            itemNo ++;
        });
        document.getElementById("badge").style.display = "block";
        document.getElementById("badge").innerHTML = itemNo;
        document.getElementById("cart_inner").innerHTML = innerResultHTML;
        document.getElementById("totalAmt").innerHTML = totalAmt;
    }
}
viewCart();

function deleteCart(index)
{
    innerItems.splice(index,1);
    localStorage.setItem("cart", JSON.stringify(innerItems))

    document.getElementById("message").innerHTML = "Product removed successfully !";
    document.getElementById("message").style.visibility = "visible";
    setTimeout(()=>{
        document.getElementById("message").style.visibility = "hidden";
    },4000)
    viewCart();
}

function decrement(proId, proQty)
{
    var innerItems = JSON.parse(localStorage.getItem("cart"));
    innerItems.map((v)=>{
        if(v.id == proId)
        {
            if(proQty == 1)
            {
                v.qty = 1;
            }
            else
            {
                v.qty--;
                localStorage.setItem("cart", JSON.stringify(innerItems))
            }
        }
    })
    viewCart();
}

function increment(proId, proQty)
{
    var innerItems = JSON.parse(localStorage.getItem("cart"));
    innerItems.map((v)=>{
        if(v.id == proId)
        {
            if(proQty == 10)
            {
                v.qty = 10;
            }
            else
            {
                v.qty++;
                localStorage.setItem("cart", JSON.stringify(innerItems))
            }
        }
    })
    viewCart();
}

var searchData = document.getElementById("searchData");
searchData.addEventListener('keyup',()=>{
    var resultHTML = "";
    products.map((v,i)=>{
        if(v.name.match(searchData.value))
        {       
            resultHTML += `<div class="item">`;
            resultHTML += `<image src="images/${v.image}" />`;
            resultHTML += `<div class="content">`;
            resultHTML += `<h3>${v.name}</h3>`;
            resultHTML += `<h4>Old Price : &#x20B9; <del>${v.old_price}</del></h4>`;
            resultHTML += `<h4>New Price : &#x20B9; ${v.price}</h4>`;
            resultHTML += `<h4 class="rate">Rating : ${v.rating}</h4>`;
            resultHTML += `<a class="btn" href="javascript:addToCart(${i},${v.id})">Add To Cart</a>`
            resultHTML += `</div>`;
            resultHTML += `<a class="deleteBtn" href="javascript:deleteProduct(${i})"><i class="ri-delete-bin-6-fill"></i></a>`;
            resultHTML += "</div>";
        }
    })
    document.getElementById("productList").innerHTML = resultHTML;
})


var flag = 0;

var sortData = document.getElementById('sortData');
sortData.addEventListener('click',()=>{
    var sData = JSON.parse(localStorage.getItem('product'));
    if(flag == 0){
        for(var I=0;I<sData.length;I++)
        {
            for(var J=I+1;J<sData.length;J++)
            {
                if(JSON.parse(sData[I].price) < JSON.parse(sData[J].price))
                {
                    temp = sData[I];
                    sData[I] = sData[J];
                    sData[J] = temp;
                }
            }
        }
        document.getElementById("sortIcon").classList.remove("ri-sort-asc");
        document.getElementById("sortIcon").classList.add("ri-sort-desc");
        flag = 1;
        sortedData(sData);
    }
    else{
        for(var I=0;I<sData.length;I++)
        {
            for(var J=I+1;J<sData.length;J++)
            {
                if(JSON.parse(sData[I].price) > JSON.parse(sData[J].price))
                {
                    temp = sData[I];
                    sData[I] = sData[J];
                    sData[J] = temp;
                }
            }
        }
        document.getElementById("sortIcon").classList.add("ri-sort-asc");
        document.getElementById("sortIcon").classList.remove("ri-sort-desc");
        flag = 0;
        sortedData(sData);
    }
});

function sortedData(sData){
    if (sData != null) {
        document.querySelector(".empty").style.display = "none";
        var resultHTML = "";
        sData.map((v, i) => {
            resultHTML += `<div class="item">`;
            resultHTML += `<image src="images/${v.image}" />`;
            resultHTML += `<div class="content">`;
            resultHTML += `<h3>${v.name}</h3>`;
            resultHTML += `<h4>Old Price : &#x20B9; <del>${v.old_price}</del></h4>`;
            resultHTML += `<h4>New Price : &#x20B9; ${v.price}</h4>`;
            resultHTML += `<h4 class="rate">Rating : ${v.rating}</h4>`;
            resultHTML += `<a class="btn" href="javascript:addToCart(${i},${v.id})">Add To Cart</a>`
            resultHTML += `</div>`;
            resultHTML += `<a class="deleteBtn" href="javascript:deleteProduct(${i})"><i class="ri-delete-bin-6-fill"></i></a>`;
            resultHTML += "</div>";
        });
        document.getElementById("productList").innerHTML = resultHTML;
    }
    if(sData == null || sData.length == 0)
    {
        document.querySelector(".empty").style.display = "block";
    }
}
