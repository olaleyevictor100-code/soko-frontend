'use client';
import {useState} from 'react';
import {market} from '@/lib/market';
import ChatBox from './ChatBox';
export default function Inbox({role,user}){
 const th=market.threads(t=>role==='buyer'?t.bid===user.id:t.sid===user.sid),[sel,setSel]=useState(null),cur=sel||th[0];
 if(!cur)return <p className="mut">{role==='buyer'?'No conversations yet. Open a store to start one.':'No buyer messages yet.'}</p>;
 return <div className="grid" style={{gridTemplateColumns:'minmax(160px,1fr) 2fr'}}><div className="card">{th.map(t=><div className="row" key={t.sid+'-'+t.bid} style={{cursor:'pointer'}} onClick={()=>setSel(t)}><b>{role==='buyer'?t.storeName:t.buyerName}</b></div>)}</div>
  <ChatBox key={cur.sid+'-'+cur.bid} sid={cur.sid} bid={cur.bid} me={role==='buyer'?'b':'s'}/></div>;
}
