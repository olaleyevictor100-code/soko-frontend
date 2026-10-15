'use client';
import {useEffect,useState} from 'react';
import {useRouter} from 'next/navigation';
import {api} from '@/lib/api';
import {useAuth} from '@/lib/auth';
import {market} from '@/lib/market';
export default function Account(){
 const {user,ready,logout}=useAuth(),r=useRouter(),[b,setB]=useState(null);
 useEffect(()=>{if(!user)return;(async()=>{const x=[];
  if(user.role==='buyer'){const o=await market.orders(i=>i.buyerId===user.id&&i.status<4&&!i.refunded);if(o.length)x.push(o.length+' order(s) are still in progress or in dispute')}
  if(user.role==='seller'){const o=await market.orders(i=>i.sid===user.sid&&i.status<4&&!i.refunded);if(o.length)x.push(o.length+' order(s) are still in progress or in dispute')}
  if(user.role==='agent'){const {stores}=await api.agentSummary(user.id);const u=stores.filter(s=>market.commStatus(s)==='Approved');if(u.length)x.push(u.length+' commission payment(s) are still unpaid')}
  setB(x)})()},[user]);
 if(!ready)return null;
 if(!user)return <div className="wrap"><p>Please <a href="/login">log in</a> first.</p></div>;
 if(user.role==='admin')return <div className="wrap"><p>Administrator accounts can't be deleted here.</p></div>;
 return <div className="wrap" style={{maxWidth:560}}><h2>Account</h2><div className="card"><p><b>{user.name}</b><br/><span className="mut">{user.email} · {user.role}</span></p><h3>Delete my account</h3>
  <p className="mut">This signs you out and removes your profile{user.role==='seller'?' and closes your store':''}. Order and payment records are kept for accounting and legal reasons, as described in the privacy policy.</p>
  {b&&b.length>0&&<><p>You can delete your account once these are settled:</p><ul>{b.map(x=><li key={x}>{x}</li>)}</ul></>}
  {b&&!b.length&&<button className="btn ac" onClick={async()=>{if(confirm('Delete your account permanently?')){await api.deleteUser(user.id);logout();r.push('/')}}}>Delete my account</button>}</div></div>;
}
