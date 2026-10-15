'use client';
import {useEffect,useState} from 'react';
import {useRouter} from 'next/navigation';
import {Guard,useAuth} from '@/lib/auth';
import {market,money} from '@/lib/market';
export default function Cart(){
 const {user}=useAuth(),r=useRouter(),[n,setN]=useState(0),[q,setQ]=useState(null),c=market.getCart();
 useEffect(()=>{market.getCart()?market.quote().then(setQ):setQ(null)},[n]);
 return <Guard role="buyer"><div className="wrap"><h2>Checkout</h2>{!c||!q?<p className="mut">Your cart is empty. Open a store and add something.</p>:<div className="card"><h3>{c.storeName}</h3>
  {c.items.map((i,k)=><div className="row" key={i.id}><span>{i.name} × {i.qty}</span><span>{money(i.price*i.qty)} <button className="btn ac" onClick={()=>{market.removeItem(k);setN(n+1)}}>Remove</button></span></div>)}
  <div className="row"><span>Subtotal</span><span>{money(q.sub)}</span></div><div className="row"><span>Delivery</span><span>{money(q.delivery)}</span></div>{q.buyerFee>0&&<div className="row"><span>Platform service charge</span><span>{money(q.buyerFee)}</span></div>}
  <div className="row"><b>Total</b><b>{money(q.total)}</b></div><p className="mut">Your money is held until you confirm receipt, then released to the seller.</p>
  <button className="btn" onClick={async()=>{await market.checkout(user);r.push('/orders')}}>Pay {money(q.total)} (test mode)</button></div>}</div></Guard>;
}
