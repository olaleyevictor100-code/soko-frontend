'use client';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import {api} from '@/lib/api';
import StoreCard from '@/components/StoreCard';
export default function Home(){
 const [l,setL]=useState([]);useEffect(()=>{api.listStores().then(setL)},[]);
 return <div className="wrap"><div className="hero"><h1>Find trusted businesses anywhere in Nigeria.</h1><p>Shop, book services and pay safely. Sellers are paid after your item arrives.</p>
  <div className="bar"><Link href="/signup" className="btn ac">Sign up to shop</Link><Link href="/signup" className="btn">Open a store</Link><Link href="/signup" className="btn">Become an agent</Link></div></div>
  <h2>Businesses on Soko</h2><div className="grid">{l.map(s=><StoreCard key={s.id} s={s}/>)}</div>
  <p className="mut"><Link href="/admin/login">Staff login</Link></p></div>;
}
