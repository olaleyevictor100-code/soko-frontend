'use client';
import {useEffect,useState} from 'react';
import {api} from '@/lib/api';
import {Guard} from '@/lib/auth';
import Pic from '@/components/Pic';
import {market} from '@/lib/market';
import StoreChat from '@/components/StoreChat';
export default function Store({params}){
 const [d,setD]=useState(null);useEffect(()=>{api.getStore(params.id).then(setD)},[params.id]);
 if(!d)return null;const {store:s,products:p}=d;
 return <Guard role="buyer"><div className="wrap"><Pic src={s.cover} seed={s.name} style={{height:230}}/><h2>{s.name}</h2><p className="mut">{s.cat} · {s.loc}</p><p>{s.desc}</p>
  {s.gallery.length>0&&<><h3>Our work</h3><div className="grid">{s.gallery.map((g,i)=><Pic key={i} src={g}/>)}</div></>}
  <h3>Catalog</h3><div className="card">{p.map(x=><div className="row" key={x.id}><span>{x.name}<div className="mut">₦{x.price.toLocaleString()}</div></span><button className="btn" onClick={()=>{if(!market.addToCart(s,x)){if(confirm('Your cart has items from another store. Start a new cart?')){market.clearCart();market.addToCart(s,x)}else return}alert('Added to cart')}}>{x.kind==='service'?'Book':'Add to cart'}</button></div>)}</div><StoreChat sid={s.id} storeName={s.name}/></div></Guard>;
}
