'use client';
import Link from 'next/link';
import {useState,useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useAuth} from '@/lib/auth';
import {market,keyOf} from '@/lib/market';
const LINKS={buyer:[['/shop','Discover'],['/cart','Cart'],['/orders','Orders'],['/messages','Messages'],['/account','Account']],seller:[['/seller','Store'],['/seller/orders','Orders'],['/seller/messages','Messages'],['/seller/ads','Advertising'],['/account','Account']],agent:[['/agent','Dashboard'],['/account','Account']],admin:[['/admin','Dashboard'],['/admin/finance','Finance'],['/admin/disputes','Disputes']]};
export default function Nav(){
 const {user,logout}=useAuth(),r=useRouter(),[,tick]=useState(0),un=user?market.unread(keyOf(user)):0;
 useEffect(()=>{const h=()=>tick(x=>x+1);window.addEventListener('soko',h);return()=>window.removeEventListener('soko',h)},[]);
 return <nav className="nav"><Link href="/" className="logo">Soko<b>.</b></Link>
  {user?<>{LINKS[user.role].map(([h,n])=><Link key={h} href={h}>{n==='Cart'?'🛒 Cart'+(market.getCart()?' ('+market.getCart().items.reduce((a,i)=>a+i.qty,0)+')':''):n}</Link>)}<Link href="/notifications">Alerts{un>0?` (${un})`:''}</Link><span>{user.name}</span><button className="btn ac" onClick={()=>{logout();r.push('/')}}>Log out</button></>
  :<><Link href="/login">Log in</Link><Link href="/signup" className="btn">Sign up</Link></>}</nav>;
}
