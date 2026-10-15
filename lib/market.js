// MOCK for cart, orders, chat, ads, commissions and finance. Same rule as api.js:
// replace each function body with real server calls. Money maths MUST move to the server.
import {api} from './api';
export const ST=['Payment Confirmed','Accepted','Dispatched','Delivered','Completed'];
export const PACKAGES=[{name:'Daily',days:1,price:1500},{name:'Weekly',days:7,price:8000},{name:'Monthly',days:30,price:25000}];
export const money=n=>'₦'+Math.round(n).toLocaleString();
let cart=null,orders=[],threads={},ads=[{sid:1,pkg:'Weekly'}],adRev=8000,paid=[];
let notes=[{id:0,to:'seller:1',text:'Welcome to Soko. Complete your store profile and add products.',read:false,time:'now'}];
function notify(to,text){notes.unshift({id:Date.now()+Math.random(),to,text,read:false,time:new Date().toLocaleTimeString()});ping()}
export const keyOf=u=>u.role==='seller'?'seller:'+u.sid:u.role==='admin'?'admin':u.role+':'+u.id;
const ping=()=>{if(typeof window!=='undefined')window.dispatchEvent(new Event('soko'))};
const wait=v=>new Promise(r=>setTimeout(()=>r(v),100));
export const market={
 getCart:()=>cart,
 addToCart(store,p){if(cart&&cart.sid!==store.id)return false;cart=cart||{sid:store.id,storeName:store.name,items:[]};const i=cart.items.find(x=>x.id===p.id);i?i.qty++:cart.items.push({id:p.id,name:p.name,price:p.price,kind:p.kind,qty:1});ping();return true},
 removeItem(i){cart.items.splice(i,1);if(!cart.items.length)cart=null;ping()},
 clearCart(){cart=null;ping()},
 async quote(){const c=await api.getCharges(),sub=cart.items.reduce((a,i)=>a+i.price*i.qty,0),delivery=cart.items.some(i=>i.kind==='product')?500:0,fee=c.fixed+sub*c.percent/100,buyerFee=c.payer==='buyer'?fee:c.payer==='shared'?fee/2:0,sellerFee=fee-buyerFee;return{sub,delivery,fee,buyerFee,sellerFee,total:sub+delivery+buyerFee,net:sub+delivery-sellerFee}},
 async checkout(user){const q=await market.quote(),o={id:'SK'+Math.random().toString(36).slice(2,8).toUpperCase(),sid:cart.sid,storeName:cart.storeName,buyerId:user.id,buyerName:user.name,items:cart.items,...q,status:0,rating:0};orders.unshift(o);notify('seller:'+o.sid,'New paid order '+o.id+' from '+o.buyerName);notify('buyer:'+o.buyerId,'Payment confirmed for order '+o.id);cart=null;ping();return wait(o)},
 orders:f=>wait(orders.filter(f)),
 advance:id=>{const o=orders.find(x=>x.id===id);if(o.status<3)o.status++;notify('buyer:'+o.buyerId,'Order '+o.id+' is now: '+ST[o.status]);return wait(true)},
 confirm:id=>{const o=orders.find(x=>x.id===id);o.status=4;notify('seller:'+o.sid,'Buyer confirmed '+o.id+'. Payout of '+money(o.net)+' released.');return wait(true)},
 report(id,reason){const o=orders.find(x=>x.id===id);o.dispute={reason,state:'Open'};notify('seller:'+o.sid,'Buyer reported a problem with '+o.id);notify('admin','Dispute opened on order '+o.id);return wait(true)},
 resolve(id,d){const o=orders.find(x=>x.id===id);if(d==='refund'){o.refunded=true;o.dispute.state='Refunded to buyer'}else{o.status=4;o.dispute.state='Released to seller'}notify('buyer:'+o.buyerId,'Dispute on '+o.id+': '+o.dispute.state);notify('seller:'+o.sid,'Dispute on '+o.id+': '+o.dispute.state);return wait(true)},
 notesFor:k=>notes.filter(x=>x.to===k),unread:k=>notes.filter(x=>x.to===k&&!x.read).length,markRead(k){notes.forEach(x=>{if(x.to===k)x.read=true})},
 rate:(id,n)=>{orders.find(x=>x.id===id).rating=n;return wait(true)},
 thread:(sid,bid)=>(threads[sid+'-'+bid]||{msgs:[]}).msgs,
 threads:f=>Object.values(threads).filter(f),
 send(sid,bid,from,text,meta){const k=sid+'-'+bid,t=threads[k]=threads[k]||{sid,bid,storeName:'',buyerName:'',msgs:[]};if(meta)Object.assign(t,meta);t.msgs.push({from,text});from==='b'?notify('seller:'+sid,'New message from '+t.buyerName):notify('buyer:'+bid,'New message from '+t.storeName)},
 adIds:()=>ads.map(a=>a.sid),activeAd:sid=>ads.find(a=>a.sid===sid),
 buyAd(sid,name){const p=PACKAGES.find(x=>x.name===name);ads=ads.filter(a=>a.sid!==sid);ads.push({sid,pkg:name});adRev+=p.price;notify('seller:'+sid,'Your '+name+' ad is now live')},
 setPrice(name,price){PACKAGES.find(x=>x.name===name).price=price},
 commStatus:s=>paid.includes(s.id)?'Paid':s.status==='approved'?'Approved':s.status==='pending'?'Pending':'Rejected',
 payAll(stores){stores.filter(s=>s.ag&&s.status==='approved').forEach(s=>{if(!paid.includes(s.id)){paid.push(s.id);notify('agent:'+s.ag,'Commission paid for '+s.name)}})},
 async finance(){const st=await api.allStores(),{fee}=await api.agentSummary(0),ag=st.filter(s=>s.ag&&s.status==='approved'),ok=orders.filter(o=>!o.refunded),sum=(f,a)=>a.reduce((t,o)=>t+f(o),0);
  return wait({orders:ok.length,gmv:sum(o=>o.sub+o.delivery,ok),orderFees:sum(o=>o.fee,ok),adRev,refunds:sum(o=>o.total,orders.filter(o=>o.refunded)),held:sum(o=>o.net,ok.filter(o=>o.status<4)),released:sum(o=>o.net,ok.filter(o=>o.status===4)),agentPaid:ag.filter(s=>paid.includes(s.id)).length*fee,agentOwed:ag.filter(s=>!paid.includes(s.id)).length*fee})},
};
