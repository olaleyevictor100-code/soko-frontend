'use client';
import {useEffect,useState} from 'react';
import {api,LOCS,CATS} from '@/lib/api';
import {Guard,useAuth} from '@/lib/auth';
import {market} from '@/lib/market';
export default function Agent(){
 const {user}=useAuth(),[d,setD]=useState(null),load=()=>user&&api.agentSummary(user.id).then(setD);useEffect(()=>{load()},[user]);
 async function reg(e){e.preventDefault();const f=Object.fromEntries(new FormData(e.target));await api.registerStore(user.id,f);e.target.reset();load()}
 return <Guard role="agent"><div className="wrap"><h2>Your registrations</h2>{d&&<div className="grid"><div className="card">{d.stores.map(s=><div className="row" key={s.id}><span>{s.name}</span><span className="tag">{market.commStatus(s)} · ₦{d.fee}</span></div>)}{!d.stores.length&&<p className="mut">Register your first store.</p>}</div>
  <form className="card" onSubmit={reg}><h3>Register a business</h3><input name="name" placeholder="Business name" required/><select name="cat">{CATS.map(c=><option key={c}>{c}</option>)}</select><select name="loc">{LOCS.map(c=><option key={c}>{c}</option>)}</select><input name="desc" placeholder="Short description"/><button className="btn">Submit for approval</button></form></div>}</div></Guard>;
}
