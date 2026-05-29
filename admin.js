const defaultProducts=[
 {id:1,name:'Pastel Yarn Bundle',category:'Yarns',price:499,img:'🧶',desc:'Soft multi-color yarn pack'},
 {id:2,name:'Crochet Hook Set',category:'Tools',price:299,img:'🪡',desc:'Premium hooks for makers'},
 {id:3,name:'Amigurumi Kit',category:'Kits',price:699,img:'🧸',desc:'Cute toy making kit'},
 {id:4,name:'Granny Square Kit',category:'Kits',price:599,img:'🌸',desc:'Blanket square kit'},
 {id:5,name:'Accessory Pack',category:'Accessories',price:199,img:'🎀',desc:'Markers, needles and more'},
 {id:6,name:'Beginner Pattern Book',category:'Patterns',price:149,img:'📖',desc:'Easy crochet patterns'}
];
let products=JSON.parse(localStorage.getItem('oow_products'))||defaultProducts;
let editId=null;
const $=s=>document.querySelector(s);
function save(){localStorage.setItem('oow_products',JSON.stringify(products))}
function showDash(){ $('#loginPage').classList.add('hidden'); $('#dashboard').classList.remove('hidden'); renderAdmin(); }
$('#loginBtn').onclick=()=>{if($('#adminUser').value==='admin'&&$('#adminPass').value==='1234'){localStorage.setItem('oow_login','yes');showDash()}else alert('Wrong login')}
$('#logoutBtn').onclick=()=>{localStorage.removeItem('oow_login');location.reload()}
if(localStorage.getItem('oow_login')==='yes') showDash();
document.querySelectorAll('.sidebar button[data-tab]').forEach(btn=>btn.onclick=()=>{document.querySelectorAll('.sidebar button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));$('#'+btn.dataset.tab).classList.add('active')});
function renderAdmin(){ $('#totalProducts').textContent=products.length; $('#totalOrders').textContent=3; $('#adminProducts').innerHTML=products.map(p=>`<div class="list-row"><span><b>${p.img} ${p.name}</b><br><small>${p.category} • ₹${p.price}</small></span><span><button onclick="editProduct(${p.id})">Edit</button> <button class="danger" onclick="deleteProduct(${p.id})">Delete</button></span></div>`).join(''); $('#ordersList').innerHTML=['#1001 - Pastel Yarn Bundle - ₹499 - Pending','#1002 - Amigurumi Kit - ₹699 - Shipped','#1003 - Pattern Book - ₹149 - Completed'].map(o=>`<div class="list-row"><b>${o}</b><button>View</button></div>`).join('') }
$('#productForm').onsubmit=e=>{e.preventDefault();const p={id:editId||Date.now(),name:$('#pName').value,category:$('#pCategory').value,price:+$('#pPrice').value,img:$('#pImage').value||'🧶',desc:$('#pDesc').value}; if(editId){products=products.map(x=>x.id===editId?p:x);editId=null}else products.push(p); save(); e.target.reset(); $('#pImage').value='🧶'; renderAdmin(); alert('Product saved')}
window.editProduct=id=>{const p=products.find(x=>x.id===id);editId=id;$('#pName').value=p.name;$('#pCategory').value=p.category;$('#pPrice').value=p.price;$('#pImage').value=p.img;$('#pDesc').value=p.desc||'';window.scrollTo({top:0,behavior:'smooth'})}
window.deleteProduct=id=>{if(confirm('Delete this product?')){products=products.filter(p=>p.id!==id);save();renderAdmin()}}
