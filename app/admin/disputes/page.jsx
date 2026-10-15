'use client';
import {useEffect,useState} from 'react';
import {Guard} from '@/lib/auth';
import {market,money} from '@/lib/market';
export default function Disputes(){
 const [o,setO]=useState([]),[n,setN]=useState(0);useEffect(()=>{market.orders(x=>x.dispute).then(setO)},[n]);
 const go=async(id,d)=>{await market.resolve(id,d);setN(n+1)};
 return <Guard role="admin"><div className="wrap"><h2>Disputes</h2>{!o.length&&<p className="mut">No disputes.</p>}{o.map(x=><div className="card" key={x.id} style={{marginBottom:12}}>
  <div className="row"><b>{x.id} · {x.storeName} · {x.buyerName}</b><span className="tag">{x.dispute.state}</span></div><p className="mut">Reason: {x.dispute.reason} · Order total {money(x.total)}</p>
  {x.dispute.state==='Open'&&<><button className="btn" onClick={()=>go(x.id,'refund')}>Refund buyer</button> <button className="btn ac" onClick={()=>go(x.id,'release')}>Release to seller</button></>}</div>)}</div></Guard>;
}
