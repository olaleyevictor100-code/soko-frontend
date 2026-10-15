'use client';
import {useEffect,useState} from 'react';
import {api,LOCS,CATS} from '@/lib/api';
import {Guard} from '@/lib/auth';
import StoreCard from '@/components/StoreCard';
export default function Shop(){
 const [f,setF]=useState({loc:'',cat:'',q:''}),[l,setL]=useState([]);
 useEffect(()=>{api.listStores(f).then(setL)},[f]);
 const set=k=>e=>setF({...f,[k]:e.target.value});
 return <Guard role="buyer"><div className="wrap"><h2>What are you looking for?</h2>
  <div className="bar"><select value={f.loc} onChange={set('loc')}><option value="">All of Nigeria</option>{LOCS.map(x=><option key={x}>{x}</option>)}</select>
  <select value={f.cat} onChange={set('cat')}><option value="">All categories</option>{CATS.map(x=><option key={x}>{x}</option>)}</select><input placeholder="Search" value={f.q} onChange={set('q')}/></div>
  {l.length?<div className="grid">{l.map(s=><StoreCard key={s.id} s={s}/>)}</div>:<p className="mut">No stores match.</p>}</div></Guard>;
}
