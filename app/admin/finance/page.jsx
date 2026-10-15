'use client';
import {useEffect,useState} from 'react';
import {api} from '@/lib/api';
import {Guard} from '@/lib/auth';
import {market,PACKAGES,money} from '@/lib/market';
export default function Finance(){
 const [f,setF]=useState(null),[n,setN]=useState(0);useEffect(()=>{market.finance().then(setF)},[n]);
 const card=(l,v,h)=><div className="card" key={l}><b>{v}</b><div className="mut">{l}</div>{h&&<div className="mut">{h}</div>}</div>;
 return <Guard role="admin"><div className="wrap"><h2>Finance</h2>{f&&<><div className="grid">{[card('Goods and services sold',money(f.gmv),'Not company income'),card('Order-charge revenue',money(f.orderFees)),card('Advertising revenue',money(f.adRev)),card('Held for sellers',money(f.held)),card('Refunded to buyers',money(f.refunds)),card('Released to sellers',money(f.released)),card('Agent commission paid',money(f.agentPaid)),card('Agent commission owed',money(f.agentOwed))]}</div>
  <p><button className="btn" onClick={async()=>{market.payAll(await api.allStores());setN(n+1)}}>Process agent payouts</button></p></>}
  <h3>Advertising prices</h3><div className="card">{PACKAGES.map(p=><div className="row" key={p.name}><span>{p.name} · {p.days} day(s)</span><input type="number" min="0" defaultValue={p.price} style={{width:120}} onBlur={e=>market.setPrice(p.name,+e.target.value)}/></div>)}</div></div></Guard>;
}
