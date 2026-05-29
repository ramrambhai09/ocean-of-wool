const defaultProducts=[
 {id:1,name:'Pastel Yarn Bundle',category:'Yarns',price:499,img:'🧶',desc:'Soft multi-color yarn pack'},
 {id:2,name:'Crochet Hook Set',category:'Tools',price:299,img:'🪡',desc:'Premium hooks for makers'},
 {id:3,name:'Amigurumi Kit',category:'Kits',price:699,img:'🧸',desc:'Cute toy making kit'},
 {id:4,name:'Granny Square Kit',category:'Kits',price:599,img:'🌸',desc:'Blanket square kit'},
 {id:5,name:'Accessory Pack',category:'Accessories',price:199,img:'🎀',desc:'Markers, needles and more'},
 {id:6,name:'Beginner Pattern Book',category:'Patterns',price:149,img:'📖',desc:'Easy crochet patterns'}
];
const categories=[['Yarns','25+ items','🧶'],['Crochet Hooks & Tools','18+ items','🪡'],['Amigurumi Kits','15+ items','🧸'],['Kits & Bundles','20+ items','🌸'],['Accessories','20+ items','🎀'],['Patterns','50+ items','📖']];
let products=JSON.parse(localStorage.getItem('oow_products'))||defaultProducts;
let cart=JSON.parse(localStorage.getItem('oow_cart'))||[];
const $=s=>document.querySelector(s);
const productGrid=$('#productGrid'),categoryGrid=$('#categoryGrid'),filter=$('#categoryFilter');
function money(n){return '₹'+Number(n).toLocaleString('en-IN')}
function toast(t){const el=$('#toast');el.textContent=t;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),1800)}
function save(){localStorage.setItem('oow_cart',JSON.stringify(cart))}
function renderCategories(){categoryGrid.innerHTML=categories.map(c=>`<div class="cat-card"><div class="cat-img">${c[2]}</div><h3>${c[0]}</h3><p>${c[1]}</p></div>`).join('');filter.innerHTML='<option value="all">All Categories</option>'+[...new Set(products.map(p=>p.category))].map(c=>`<option value="${c}">${c}</option>`).join('')}
function renderProducts(){const q=($('#searchInput').value||'').toLowerCase();const cat=filter.value;const list=products.filter(p=>(cat==='all'||p.category===cat)&&(p.name.toLowerCase().includes(q)||p.category.toLowerCase().includes(q)));productGrid.innerHTML=list.map(p=>`<div class="product-card"><div class="prod-img">${p.img||'🧶'}</div><h3>${p.name}</h3><p>${p.desc||p.category}</p><div class="price">${money(p.price)}</div><button class="add-btn" onclick="buyNow(${p.id})">Buy Now</button></div>`).join('')||'<p>No products found.</p>'}
function buyNow(id){const p=products.find(x=>x.id===id);if(!p)return;const phone='919724279077';const msg=`Hello Ocean of Wool 💖%0A%0AI want to buy this beautiful product:%0A🧶 Product: ${p.name}%0A💰 Price: ${money(p.price)}%0A✨ Category: ${p.category}%0A%0APlease share more details and availability. Thank you!`;window.open(`https://wa.me/${phone}?text=${encodeURIComponent(decodeURIComponent(msg))}`,'_blank');toast('Opening WhatsApp...')}
function renderCart(){$('#cartCount').textContent=cart.reduce((a,b)=>a+b.qty,0);$('#cartItems').innerHTML=cart.map(i=>`<div class="cart-item"><span>${i.img} ${i.name}<br><small>${i.qty} × ${money(i.price)}</small></span><button onclick="removeCart(${i.id})">Remove</button></div>`).join('')||'<p>Your cart is empty.</p>';$('#cartTotal').textContent=money(cart.reduce((a,b)=>a+b.price*b.qty,0))}
function removeCart(id){cart=cart.filter(i=>i.id!==id);save();renderCart()}
window.buyNow=buyNow;window.removeCart=removeCart;
$('#cartBtn').onclick=()=>$('#cartDrawer').classList.add('open');$('#closeCart').onclick=()=>$('#cartDrawer').classList.remove('open');$('#menuBtn').onclick=()=>$('#nav').classList.toggle('show');$('#searchInput').oninput=renderProducts;filter.onchange=renderProducts;$('#newsletterForm').onsubmit=e=>{e.preventDefault();toast('Subscribed successfully!');e.target.reset()};
renderCategories();renderProducts();renderCart();
