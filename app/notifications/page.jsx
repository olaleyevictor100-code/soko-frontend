'use client';
import {useEffect,useState} from 'react';
import {useAuth} from '@/lib/auth';
import {market,keyOf} from '@/lib/market';
export default function Page(){
 const {user,ready}=useAuth(),[n,setN]=useState([]);
 useEffect(()=>{if(user){setN(market.notesFor(keyOf(user)).map(x=>({...x})));market.markRead(keyOf(user))}},[user]);
 if(!ready)return null;
 if(!user)return <div className="wrap"><p>Please <a href="/login">log in</a> to see your notifications.</p></div>;
 return <div className="wrap"><h2>Notifications</h2>{!n.length&&<p className="mut">Nothing yet.</p>}<div className="card">{n.map(x=><div className="row" key={x.id}><span style={{fontWeight:x.read?400:700}}>{x.text}</span><span className="mut">{x.time}</span></div>)}</div></div>;
}
