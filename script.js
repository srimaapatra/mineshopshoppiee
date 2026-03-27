const products = [
{id:1,name:"Laptop",price:50000,category:"Electronics",rating:4.5,img:"https://via.placeholder.com/200"},
{id:2,name:"Headphones",price:2000,category:"Electronics",rating:4.2,img:"https://via.placeholder.com/200"},
{id:3,name:"T-Shirt",price:500,category:"Fashion",rating:3.8,img:"https://via.placeholder.com/200"},
{id:4,name:"Shoes",price:2500,category:"Fashion",rating:4.1,img:"https://via.placeholder.com/200"},
{id:5,name:"Sofa",price:15000,category:"Home",rating:4.6,img:"https://via.placeholder.com/200"},
{id:6,name:"Book",price:300,category:"Books",rating:4.0,img:"https://via.placeholder.com/200"}
];

let filteredProducts = [...products];
let cart = JSON.parse(localStorage.getItem("cart"))||[];

function render(){
  const list=document.getElementById("productList");
  list.innerHTML="";
  filteredProducts.forEach(p=>{
    list.innerHTML+=`
      <div class="card">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <p class="rating">⭐ ${p.rating}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>`;
  });
}
function filterCategory(cat){
  filteredProducts = cat==='all'? [...products] : products.filter(p=>p.category===cat);
  applyFilters();
}

function applyFilters(){
  let data=[...filteredProducts];

  const price=document.getElementById("priceFilter").value;
  const rating=document.getElementById("ratingFilter").value;
  const sort=document.getElementById("sort").value;

  if(price==='low') data=data.filter(p=>p.price<1000);
  if(price==='mid') data=data.filter(p=>p.price>=1000&&p.price<=5000);
  if(price==='high') data=data.filter(p=>p.price>5000);

  if(rating!=='all') data=data.filter(p=>p.rating>=rating);

  if(sort==='low') data.sort((a,b)=>a.price-b.price);
  if(sort==='high') data.sort((a,b)=>b.price-a.price);
  if(sort==='rating') data.sort((a,b)=>b.rating-a.rating);

  filteredProducts=data;
  render();
}
function addToCart(id){
  const item=products.find(p=>p.id===id);
  cart.push(item);
  localStorage.setItem("cart",JSON.stringify(cart));
  document.getElementById("cartCount").innerText=cart.length;
}

render();
document.getElementById("cartCount").innerText=cart.length;
