// MOCK for cart, orders, chat, ads, commissions and finance. Same rule as api.js:
// replace each function body with real server calls. Money maths MUST move to the server.
import {api} from './api';
export const ST=['Payment Confirmed','Accepted','Dispatched','Delivered','Completed'];
export const PACKAGES=[{name:'Daily',days:1,price:1500},{name:'Weekly',days:7,price:8000},{name:'Monthly',days:30,price:25000}];
export const money=n=>'₦'+Math.round(n).toLocaleString();
let cart=null,orders=[],threads={},ads=[{sid:1,pkg:'Weekly'}],adRev=8000,paid=[];
const wait=v=>new Promise(r=>setTimeout(()=>r(v),100));
export const market={
 getCart:()=>cart,
 addToCart(store,p){if(cart&&cart.sid!==store.id)return false;cart=cart||{sid:store.id,storeName:store.name,items:[]};const i=cart.items.find(x=>x.id===p.id);i?i.qty++:cart.items.push({id:p.id,name:p.name,price:p.price,kind:p.kind,qty:1});return true},
 removeItem(i){cart.items.splice(i,1);if(!cart.items.length)cart=null},
 clearCart(){cart=null},
 async quote(){const c=await api.getCharges(),sub=cart.items.reduce((a,i)=>a+i.price*i.qty,0),delivery=cart.items.some(i=>i.kind==='product')?500:0,fee=c.fixed+sub*c.percent/100,buyerFee=c.payer==='buyer'?fee:c.payer==='shared'?fee/2:0,sellerFee=fee-buyerFee;return{sub,delivery,fee,buyerFee,sellerFee,total:sub+delivery+buyerFee,net:sub+delivery-sellerFee}},
 async checkout(user){const q=await market.quote(),o={id:'SK'+Math.random().toString(36).slice(2,8).toUpperCase(),sid:cart.sid,storeName:cart.storeName,buyerId:user.id,buyerName:user.name,items:cart.items,...q,status:0,rating:0};orders.unshift(o);cart=null;return wait(o)},
 orders:f=>wait(orders.filter(f)),
 advance:id=>{const o=orders.find(x=>x.id===id);if(o.status<3)o.status++;return wait(true)},
 confirm:id=>{orders.find(x=>x.id===id).status=4;return wait(true)},
 rate:(id,n)=>{orders.find(x=>x.id===id).rating=n;return wait(true)},
 thread:(sid,bid)=>(threads[sid+'-'+bid]||{msgs:[]}).msgs,
 threads:f=>Object.values(threads).filter(f),
 send(sid,bid,from,text,meta){const k=sid+'-'+bid,t=threads[k]=threads[k]||{sid,bid,storeName:'',buyerName:'',msgs:[]};if(meta)Object.assign(t,meta);t.msgs.push({from,text})},
 adIds:()=>ads.map(a=>a.sid),activeAd:sid=>ads.find(a=>a.sid===sid),
 buyAd(sid,name){const p=PACKAGES.find(x=>x.name===name);ads=ads.filter(a=>a.sid!==sid);ads.push({sid,pkg:name});adRev+=p.price},
 setPrice(name,price){PACKAGES.find(x=>x.name===name).price=price},
 commStatus:s=>paid.includes(s.id)?'Paid':s.status==='approved'?'Approved':s.status==='pending'?'Pending':'Rejected',
 payAll(stores){stores.filter(s=>s.ag&&s.status==='approved').forEach(s=>{if(!paid.includes(s.id))paid.push(s.id)})},
 async finance(){const st=await api.allStores(),{fee}=await api.agentSummary(0),ag=st.filter(s=>s.ag&&s.status==='approved'),sum=(f,a)=>a.reduce((t,o)=>t+f(o),0);
  return wait({orders:orders.length,gmv:sum(o=>o.sub+o.delivery,orders),orderFees:sum(o=>o.fee,orders),adRev,held:sum(o=>o.net,orders.filter(o=>o.status<4)),released:sum(o=>o.net,orders.filter(o=>o.status===4)),agentPaid:ag.filter(s=>paid.includes(s.id)).length*fee,agentOwed:ag.filter(s=>!paid.includes(s.id)).length*fee})},
};
