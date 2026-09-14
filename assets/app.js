const DEFAULT_PRODUCTS=[
{name:"Solar Panel",brand:"Citizen / Premier / Adani / Waaree / Luminous",category:"Panel",description:"High-efficiency solar panels selected to suit the project."},
{name:"Solar Inverter",brand:"INVT / Luminous / Polycab / Havells / Microtek",category:"Inverter",description:"Grid and hybrid inverter options based on system requirement."}
];
const DEFAULT_PROPERTIES=[
{type:"Plot",location:"Deoria Road, Gorakhpur",price:"Contact for price",area:"Ask for details",description:"Residential plot enquiry."},
{type:"Plot",location:"Jhangha Road, Gorakhpur",price:"Contact for price",area:"Ask for details",description:"Property listing available through S.K. Traders."}
];
function get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}}
function set(k,v){localStorage.setItem(k,JSON.stringify(v))}
function toast(t){const x=document.createElement("div");x.className="toast";x.textContent=t;document.body.appendChild(x);setTimeout(()=>x.remove(),2600)}
function toggleMenu(){document.querySelector("#nav")?.classList.toggle("open")}
function wa(text){window.open("https://wa.me/917880892940?text="+encodeURIComponent(text),"_blank")}
function renderProducts(){
 const box=document.querySelector("#solarProducts"); if(!box)return;
 const ps=get("products",DEFAULT_PRODUCTS); box.innerHTML=ps.map(p=>`<article class="product"><div class="product-img">${p.category==="Panel"?"â˜€":"â–¦"}</div><div><h3>${p.name}</h3><p><b>${p.brand||""}</b></p><p>${p.description||""}</p></div></article>`).join("");
}
function renderProperties(){
 const box=document.querySelector("#propertyGrid"); if(!box)return;
 const ps=get("properties",DEFAULT_PROPERTIES); box.innerHTML=ps.filter(x=>x.status!=="rejected").map(p=>`<article class="listing"><div class="listing-photo">âŒ‚</div><div class="listing-body"><span class="tag">${p.type}</span><h3>${p.location}</h3><p><b>${p.price}</b> â€¢ ${p.area||""}</p><p>${p.description||""}</p></div></article>`).join("");
}
function addLead(lead){const a=get("leads",[]);a.unshift({...lead,date:new Date().toLocaleString("en-IN")});set("leads",a)}
document.addEventListener("DOMContentLoaded",()=>{
 renderProducts();renderProperties();
 document.querySelector("#solarForm")?.addEventListener("submit",e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));addLead({type:"Solar",...d});wa(`*S.K. Traders - Solar Enquiry*%0AName: ${d.name}%0AMobile: ${d.phone}%0AAddress: ${d.address}%0ASystem Load: ${d.load}%0ASystem: ${d.system}%0ABrand: ${d.brand||"Not specified"}`);toast("Enquiry saved. WhatsApp opened.");e.target.reset()});
 document.querySelector("#propertyForm")?.addEventListener("submit",e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));delete d.image;d.status="pending";const a=get("properties",DEFAULT_PROPERTIES);a.unshift(d);set("properties",a);addLead({type:"Property Listing",...d});wa(`*S.K. Traders - Property Listing*%0AOwner: ${d.owner}%0AMobile: ${d.phone}%0AType: ${d.type}%0ALocation: ${d.location}%0APrice: ${d.price}%0AArea: ${d.area||""}%0ADetails: ${d.description||""}`);toast("Property submitted. WhatsApp opened.");e.target.reset();renderProperties()});
 document.querySelector("#productForm")?.addEventListener("submit",e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));const a=get("products",DEFAULT_PRODUCTS);a.unshift(d);set("products",a);toast("Product saved");e.target.reset();renderAdminProducts()});
 document.querySelector("#settingsForm")?.addEventListener("submit",e=>{e.preventDefault();set("settings",Object.fromEntries(new FormData(e.target)));toast("Settings saved")});
 if(localStorage.getItem("sk_admin")==="1")showDashboard();
});
function adminLogin(){if(document.querySelector("#adminUser").value==="admin"&&document.querySelector("#adminPass").value==="sktraders2026"){localStorage.setItem("sk_admin","1");showDashboard()}else toast("Invalid demo login")}
function showDashboard(){document.querySelector("#loginBox").hidden=true;document.querySelector("#dashboard").hidden=false;renderAdminLeads();renderAdminProperties();renderAdminProducts()}
function logout(){localStorage.removeItem("sk_admin");location.reload()}
function showTab(t){document.querySelectorAll(".dash-tab").forEach(x=>x.hidden=true);document.querySelector("#tab-"+t).hidden=false}
function renderAdminLeads(){const b=document.querySelector("#leadsTable");if(!b)return;const a=get("leads",[]);b.innerHTML=a.map(x=>`<tr><td>${x.type||""}</td><td>${x.name||x.owner||""}</td><td>${x.phone||""}</td><td>${x.load||x.location||""}</td><td>${x.date||""}</td></tr>`).join("")||`<tr><td colspan="5">No leads yet.</td></tr>`}
function renderAdminProperties(){const b=document.querySelector("#adminProperties");if(!b)return;const a=get("properties",DEFAULT_PROPERTIES);b.innerHTML=a.map((x,i)=>`<div class="admin-item"><div><b>${x.type}</b> â€” ${x.location}<br><small>${x.price} â€¢ ${x.area||""} â€¢ ${x.status||"published"}</small></div><button class="btn outline" onclick="removeProperty(${i})">Delete</button></div>`).join("")}
function removeProperty(i){const a=get("properties",DEFAULT_PROPERTIES);a.splice(i,1);set("properties",a);renderAdminProperties();renderProperties()}
function renderAdminProducts(){const b=document.querySelector("#adminProducts");if(!b)return;const a=get("products",DEFAULT_PRODUCTS);b.innerHTML=a.map((x,i)=>`<div class="admin-item"><div><b>${x.name}</b> â€” ${x.brand||""}<br><small>${x.category}</small></div><button class="btn outline" onclick="removeProduct(${i})">Delete</button></div>`).join("")}
function removeProduct(i){const a=get("products",DEFAULT_PRODUCTS);a.splice(i,1);set("products",a);renderAdminProducts();renderProducts()}
