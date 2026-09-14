(()=>{
const replies=[
["hello","Hello! I'm the S.K. Traders assistant. I can help with solar, property, enquiries and site visits."],
["solar","For solar, tell me your approximate monthly electricity bill or required load. We support On-Grid and Hybrid enquiries."],
["property","For property, tell me whether you want to Buy, Sell or List a property, plus your preferred location."],
["appointment","Sure. Share your preferred date/time and whether it is a solar consultation or property site visit. Your request can then be sent to WhatsApp."],
["site visit","Sure. Tell me the location and preferred date/time for the site visit."],
["price","Pricing depends on the exact solar system/property. Share your requirement and our team can confirm the current quote."],
["contact","You can contact S.K. Traders on WhatsApp at 7-880-89-29-40."]
];
function answer(q){q=q.toLowerCase();for(const [k,v] of replies)if(q.includes(k))return v;return "I can help with Solar Installation, Property Consultancy, pricing enquiries and appointments. Please tell me what you need."}
function mount(){
 if(document.querySelector(".chat"))return;
 document.body.insertAdjacentHTML("beforeend",`<div class="chat"><div id="chatWindow" class="chat-window"><div class="chat-head"><b>S.K. Traders AI Assistant</b><small>Solar â€¢ Property â€¢ Site Visits</small></div><div id="chatMsgs" class="chat-msgs"><div class="msg bot">Namaste! How can I help you today?</div></div><div class="chat-input"><input id="chatInput" placeholder="Type your enquiry..."><button id="chatSend">âž¤</button></div></div><button class="chat-btn" id="chatBtn">âœ¦</button></div>`);
 document.querySelector("#chatBtn").onclick=()=>{const w=document.querySelector("#chatWindow");w.style.display=w.style.display==="block"?"none":"block"};
 const send=()=>{const i=document.querySelector("#chatInput"),q=i.value.trim();if(!q)return;add(q,"user");setTimeout(()=>add(answer(q),"bot"),250);i.value=""};
 document.querySelector("#chatSend").onclick=send;document.querySelector("#chatInput").addEventListener("keydown",e=>{if(e.key==="Enter")send()});
}
function add(t,c){const b=document.querySelector("#chatMsgs");b.insertAdjacentHTML("beforeend",`<div class="msg ${c}">${t}</div>`);b.scrollTop=b.scrollHeight}
document.addEventListener("DOMContentLoaded",mount);
})()
