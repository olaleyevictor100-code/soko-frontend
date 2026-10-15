'use client';
import {useState} from 'react';
import {Guard,useAuth} from '@/lib/auth';
import {market,PACKAGES,money} from '@/lib/market';
function Inner({user}){
 const [,n]=useState(0),a=market.activeAd(user.sid);
 return <div className="wrap"><h2>Promote your store</h2><p className="mut">{a?`Active: ${a.pkg} package. Your store shows as Sponsored in search.`:'No active advertisement.'}</p>
  <div className="grid">{PACKAGES.map(p=><div className="card" key={p.name}><h3>{p.name}</h3><b>{money(p.price)}</b><p className="mut">{p.days} day(s) of sponsored placement</p><button className="btn ac" onClick={()=>{market.buyAd(user.sid,p.name);n(x=>x+1)}}>Pay and activate (test mode)</button></div>)}</div></div>;
}
export default function Page(){const {user}=useAuth();return <Guard role="seller">{user&&<Inner user={user}/>}</Guard>}
