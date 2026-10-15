'use client';
import {useEffect,useState} from 'react';
import {Guard,useAuth} from '@/lib/auth';
import {market,ST,money} from '@/lib/market';
function Inner({user}){
 const [o,setO]=useState([]),[n,setN]=useState(0);useEffect(()=>{market.orders(x=>x.buyerId===user.id).then(setO)},[n,user]);
 const act=async f=>{await f();setN(n+1)};
 return <div className="wrap"><h2>My orders</h2>{!o.length&&<p className="mut">No orders yet.</p>}{o.map(x=><div className="card" key={x.id} style={{marginBottom:12}}>
  <div className="row"><b>{x.id} · {x.storeName}</b><span className="tag">{ST[x.status]}</span></div>
  <div className="bar">{ST.map((s,i)=><i key={s} style={{height:5,borderRadius:3,background:i<=x.status?'var(--pri)':'var(--bd)'}}/>)}</div>
  <p className="mut">{x.items.map(i=>i.name+' ×'+i.qty).join(', ')} · {money(x.total)}</p>
  {x.status===3&&<button className="btn" onClick={()=>act(()=>market.confirm(x.id))}>Confirm I received this</button>}
  {x.status===4&&!x.rating&&<div>Rate: {[1,2,3,4,5].map(k=><button key={k} className="btn ac" style={{marginRight:4}} onClick={()=>act(()=>market.rate(x.id,k))}>{k}★</button>)}</div>}
  {x.rating>0&&<p className="mut">You rated this {x.rating}★</p>}</div>)}</div>;
}
export default function Page(){const {user}=useAuth();return <Guard role="buyer">{user&&<Inner user={user}/>}</Guard>}
