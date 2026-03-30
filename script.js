const data=[
{id:1,name:"HP Laptop",price:50000,category:"Electronics",rating:4.5,img:"https://m.media-amazon.com/images/I/71jG+e7roXL.jpg"},
{id:2,name:"Boat Headphones",price:2000,category:"Electronics",rating:4.2,img:"https://m.media-amazon.com/images/I/61u1VALn6JL._SL1500_.jpg"},
{id:3,name:"Nike Shoes",price:3000,category:"Fashion",rating:4.3,img:"https://m.media-amazon.com/images/I/71li-ujtlUL._UY500_.jpg"},
{id:4,name:"Cotton T-Shirt",price:800,category:"Fashion",rating:3.8,img:"https://m.media-amazon.com/images/I/61y6Vt6+f9L._UY741_.jpg"},
{id:5,name:"Wooden Chair",price:1500,category:"Home",rating:4.0,img:"https://m.media-amazon.com/images/I/81oN2N6d8UL._SL1500_.jpg"},
{id:6,name:"Novel Book",price:400,category:"Books",rating:4.6,img:"https://m.media-amazon.com/images/I/81iqZ2HHD-L.jpg"}
];

const products=document.getElementById("products");

function display(items){
  products.innerHTML="";
  items.forEach(p=>{
    products.innerHTML+=`
    <div class="card">
      <img src="${p.img}">
      <h4>${p.name}</h4>
      <p>₹${p.price}</p>
      <div class="rating">⭐ ${p.rating}</div>
      <button>Add to Cart</button>
    </div>`;
  });
}

display(data);
function filter(){
  let category=document.getElementById("category").value;
  let price=document.getElementById("price").value;
  let rating=document.getElementById("rating").value;
  let search=document.getElementById("search").value.toLowerCase();

  let filtered=data.filter(p=>
    (!category||p.category===category)&&
    (!rating||p.rating>=rating)&&
    (p.name.toLowerCase().includes(search))&&
    (!price||
      (price==="low"&&p.price<1000)||
      (price==="mid"&&p.price>=1000&&p.price<=10000)||
      (price==="high"&&p.price>10000)
    )
  );

  let sort=document.getElementById("sort").value;

  if(sort==="low") filtered.sort((a,b)=>a.price-b.price);
  if(sort==="high") filtered.sort((a,b)=>b.price-a.price);
  if(sort==="rating") filtered.sort((a,b)=>b.rating-a.rating);

  display(filtered);
}

document.querySelectorAll("select,input").forEach(el=>el.addEventListener("change",filter));
document.getElementById("search").addEventListener("keyup",filter);