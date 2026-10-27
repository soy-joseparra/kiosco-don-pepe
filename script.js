// Kiosco Don Pepe — catálogo de demostración.
// IMPORTANTE: reemplazá DEMO_WHATSAPP por el número real antes de usar pedidos reales.
// Formato internacional sin +, espacios ni guiones. Ejemplo ficticio: 5492640000000
const DEMO_WHATSAPP = "5492640000000";

const products = [
  {id:1,name:"Gaseosa cola 1,5 L",category:"Bebidas",price:2450,emoji:"🥤",tint:"#e2edff",tag:"Popular"},
  {id:2,name:"Agua mineral 1,5 L",category:"Bebidas",price:1200,emoji:"💧",tint:"#dff6ff"},
  {id:3,name:"Jugo de naranja",category:"Bebidas",price:1550,emoji:"🧃",tint:"#fff0d8"},
  {id:4,name:"Energizante 473 ml",category:"Bebidas",price:2100,emoji:"⚡",tint:"#e8e3ff"},
  {id:5,name:"Galletitas de chocolate",category:"Galletitas",price:1350,emoji:"🍪",tint:"#fff0df",tag:"Favorito"},
  {id:6,name:"Galletitas crackers",category:"Galletitas",price:1100,emoji:"🥨",tint:"#fff4cc"},
  {id:7,name:"Alfajor triple",category:"Golosinas",price:950,emoji:"🍫",tint:"#f9e3db",tag:"Dulce"},
  {id:8,name:"Chocolate con leche",category:"Golosinas",price:1800,emoji:"🍫",tint:"#f1e2d9"},
  {id:9,name:"Caramelos surtidos (bolsita)",category:"Golosinas",price:700,emoji:"🍬",tint:"#ffe3ef"},
  {id:10,name:"Chupetín frutal",category:"Golosinas",price:450,emoji:"🍭",tint:"#ffe4eb"},
  {id:11,name:"Papas fritas clásicas",category:"Snacks",price:1600,emoji:"🍟",tint:"#fff0c7",tag:"Crocrantes"},
  {id:12,name:"Maní salado",category:"Snacks",price:900,emoji:"🥜",tint:"#f8e7d2"},
  {id:13,name:"Turrón de maní",category:"Snacks",price:500,emoji:"🍯",tint:"#ffedc2"},
  {id:14,name:"Yerba mate 1 kg",category:"Almacén",price:3900,emoji:"🧉",tint:"#e2f3df"},
  {id:15,name:"Azúcar 1 kg",category:"Almacén",price:1450,emoji:"🧂",tint:"#f0f2f5"},
  {id:16,name:"Fideos secos 500 g",category:"Almacén",price:1250,emoji:"🍝",tint:"#fff0d8"}
];

const money = n => new Intl.NumberFormat("es-AR",{style:"currency",currency:"ARS",maximumFractionDigits:0}).format(n);
const cart = new Map();
let activeCategory = "Todos";
const categories = ["Todos", ...new Set(products.map(p=>p.category))];
const $ = id => document.getElementById(id);

function renderCategories(){
  $("categories").innerHTML = categories.map(cat =>
    `<button class="chip ${cat===activeCategory?"active":""}" data-category="${cat}">${cat}</button>`
  ).join("");
  $("categories").querySelectorAll("button").forEach(button=>{
    button.addEventListener("click",()=>{
      activeCategory=button.dataset.category;
      renderCategories(); renderProducts();
    });
  });
}
function renderProducts(){
  const query=$("search").value.trim().toLocaleLowerCase("es");
  let visible=products.filter(p=>(activeCategory==="Todos"||p.category===activeCategory) &&
    (p.name+" "+p.category).toLocaleLowerCase("es").includes(query));
  const sort=$("sort").value;
  if(sort==="low") visible.sort((a,b)=>a.price-b.price);
  if(sort==="high") visible.sort((a,b)=>b.price-a.price);
  if(sort==="az") visible.sort((a,b)=>a.name.localeCompare(b.name,"es"));
  $("products").innerHTML=visible.length ? visible.map(p=>`
    <article class="product">
      <div class="product-visual" style="--tint:${p.tint}">
        ${p.tag?`<span class="tag">${p.tag}</span>`:""}
        <span class="product-emoji" role="img" aria-label="${p.category}">${p.emoji}</span>
      </div>
      <div class="product-info">
        <span class="category-label">${p.category}</span>
        <h4>${p.name}</h4>
        <div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add" data-add="${p.id}" aria-label="Agregar ${p.name}" title="Agregar al carrito">+</button></div>
      </div>
    </article>`).join("") : `<div class="empty">No encontramos productos con esa búsqueda.<br>Probá con otra palabra o categoría.</div>`;
  $("products").querySelectorAll("[data-add]").forEach(btn=>btn.addEventListener("click",()=>addToCart(Number(btn.dataset.add))));
}
function addToCart(id){
  cart.set(id,(cart.get(id)||0)+1); renderCart(); showToast("¡Agregado al carrito!");
}
function changeQty(id,delta){
  const next=(cart.get(id)||0)+delta;
  if(next<=0)cart.delete(id);else cart.set(id,next);
  renderCart();
}
function totalItems(){return [...cart.values()].reduce((sum,n)=>sum+n,0)}
function totalPrice(){return products.reduce((sum,p)=>sum+p.price*(cart.get(p.id)||0),0)}
function renderCart(){
  $("cartCount").textContent=totalItems();
  $("total").textContent=money(totalPrice());
  $("sendOrder").disabled=cart.size===0;
  if(cart.size===0){$("cartItems").innerHTML='<div class="cart-empty"><div style="font-size:3rem">🛍️</div><h3>Tu carrito está vacío</h3><p>Agregá algo rico para empezar.</p></div>';return}
  $("cartItems").innerHTML=products.filter(p=>cart.has(p.id)).map(p=>`
    <div class="cart-row">
      <div class="cart-icon" style="background:${p.tint}">${p.emoji}</div>
      <div><h4>${p.name}</h4><p>${money(p.price)} c/u</p>
        <div class="qty"><button data-minus="${p.id}" aria-label="Restar uno">−</button><strong>${cart.get(p.id)}</strong><button data-plus="${p.id}" aria-label="Sumar uno">+</button></div>
        <button class="remove" data-remove="${p.id}">Quitar</button>
      </div>
      <strong>${money(p.price*cart.get(p.id))}</strong>
    </div>`).join("");
  $("cartItems").querySelectorAll("[data-minus]").forEach(b=>b.addEventListener("click",()=>changeQty(Number(b.dataset.minus),-1)));
  $("cartItems").querySelectorAll("[data-plus]").forEach(b=>b.addEventListener("click",()=>changeQty(Number(b.dataset.plus),1)));
  $("cartItems").querySelectorAll("[data-remove]").forEach(b=>b.addEventListener("click",()=>{cart.delete(Number(b.dataset.remove));renderCart()}));
}
function openCart(){ $("overlay").classList.add("open");$("cartPanel").classList.add("open");document.body.style.overflow="hidden";$("closeCart").focus()}
function closeCart(){ $("overlay").classList.remove("open");$("cartPanel").classList.remove("open");document.body.style.overflow=""}
function showToast(message){
  $("toast").textContent=message;$("toast").classList.add("show");
  clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>$("toast").classList.remove("show"),1800);
}
$("search").addEventListener("input",renderProducts);
$("sort").addEventListener("change",renderProducts);
$("openCart").addEventListener("click",openCart);
$("closeCart").addEventListener("click",closeCart);
$("overlay").addEventListener("click",closeCart);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCart()});
$("sendOrder").addEventListener("click",()=>{
  if(cart.size===0)return;
  if(!/^\d{10,15}$/.test(DEMO_WHATSAPP)||DEMO_WHATSAPP==="5492640000000"){
    alert("Este es un catálogo de demostración. Para enviar pedidos, abrí script.js y reemplazá DEMO_WHATSAPP por el WhatsApp real del comercio.");
    return;
  }
  const name=$("customerName").value.trim();
  const lines=[`¡Hola! Quiero hacer un pedido en Kiosco Don Pepe.${name?`\nNombre: ${name}`:""}`,"","Mi pedido:"];
  products.filter(p=>cart.has(p.id)).forEach(p=>lines.push(`• ${p.name} x${cart.get(p.id)} — ${money(p.price*cart.get(p.id))}`));
  lines.push("",`Total estimado: ${money(totalPrice())}`,"","¿Me confirman disponibilidad y total? (Precios sujetos a confirmación)");
  window.open(`https://wa.me/${DEMO_WHATSAPP}?text=${encodeURIComponent(lines.join("\n"))}`,"_blank","noopener,noreferrer");
});
$("year").textContent=new Date().getFullYear();
renderCategories();renderProducts();renderCart();
