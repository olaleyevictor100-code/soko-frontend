'use client';
import {useEffect,useState} from 'react';
import {api} from '@/lib/api';
import {Guard,useAuth} from '@/lib/auth';
import Pic from '@/components/Pic';
// Demo only: object URLs vanish on refresh. Production: upload the File to storage and save the returned URL.
const url=f=>URL.createObjectURL(f);
export default function Seller(){
 const {user}=useAuth(),[d,setD]=useState(null),[photo,setPhoto]=useState('');
 const load=()=>user&&api.getStore(user.sid).then(x=>setD({...x}));useEffect(()=>{load()},[user]);
 if(!user||!d)return <Guard role="seller"/>;const {store:s,products:p}=d;
 async function add(e){e.preventDefault();const f=new FormData(e.target);await api.addProduct({sid:s.id,name:f.get('name'),price:+f.get('price'),kind:f.get('kind'),photo});setPhoto('');e.target.reset();load()}
 return <Guard role="seller"><div className="wrap"><h2>{s.name}</h2>{s.status!=='approved'&&<p className="card">Waiting for admin approval. Buyers cannot see your store yet.</p>}
  <div className="grid"><div className="card"><h3>Cover photo</h3><Pic src={s.cover} seed={s.name}/><input type="file" accept="image/*" onChange={async e=>{await api.updateStore(s.id,{cover:url(e.target.files[0])});load()}}/></div>
  <div className="card"><h3>Showcase gallery</h3><div className="grid">{s.gallery.map((g,i)=><Pic key={i} src={g}/>)}</div><input type="file" accept="image/*" multiple onChange={async e=>{await api.updateStore(s.id,{gallery:[...s.gallery,...[...e.target.files].map(url)]});load()}}/></div></div>
  <h3>Products and services</h3><div className="grid"><div className="card">{p.map(x=><div className="row" key={x.id}><span>{x.name}</span><span>₦{x.price.toLocaleString()}</span></div>)}</div>
  <form className="card" onSubmit={add}><input name="name" placeholder="Name" required/><input name="price" type="number" min="1" placeholder="Price (₦)" required/><select name="kind"><option value="product">Product</option><option value="service">Service</option></select>
  <input type="file" accept="image/*" onChange={e=>setPhoto(url(e.target.files[0]))}/><button className="btn">Add item</button></form></div></div></Guard>;
}
