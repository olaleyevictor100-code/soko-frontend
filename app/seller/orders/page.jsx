'use client';
import {useEffect,useState} from 'react';
import {Guard,useAuth} from '@/lib/auth';
import {market,ST,money} from '@/lib/market';
function Inner({user}){
 const [o,setO]=useState([]),[n,setN]=useState(0);useEffect(()=>{market.orders(x=>x.sid===user.sid).then(setO)},[n,user]);
 const paid=o.filter(x=>x.status===4).reduce((a,x)=>a+x.net,0),held=o.filter(x=>x.status<4).reduce((a,x)=>a+x.net,0);
 return <div className="wrap"><h2>Orders</h2><div className="grid" style={{marginBottom:16}}><div className="card"><b>{money(paid)}</b><div className="mut">Paid out</div></div><div className="card"><b>{money(held)}</b><div className="mut">Held until buyers confirm</div></div></div>
  {!o.length&&<p className="mut">No orders yet.</p>}{o.map(x=><div className="card" key={x.id} style={{marginBottom:12}}><div className="row"><b>{x.id} · {x.buyerName}</b><span className="tag">{ST[x.status]}</span></div>
  <p className="mut">{x.items.map(i=>i.name+' ×'+i.qty).join(', ')}<br/>Order {money(x.sub)} · platform charge on you {money(x.sellerFee)} · net {money(x.net)}{x.rating>0&&` · rated ${x.rating}★`}</p>
  {x.status<3&&<button className="btn" onClick={async()=>{await market.advance(x.id);setN(n+1)}}>Mark as {ST[x.status+1]}</button>}{x.status===3&&<span className="mut">Waiting for buyer to confirm receipt</span>}</div>)}</div>;
}
export default function Page(){const {user}=useAuth();return <Guard role="seller">{user&&<Inner user={user}/>}</Guard>}
