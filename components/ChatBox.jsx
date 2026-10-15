'use client';
import {useState} from 'react';
import {market} from '@/lib/market';
export default function ChatBox({sid,bid,me,meta}){
 const [t,setT]=useState(''),[,n]=useState(0),msgs=market.thread(sid,bid);
 const send=()=>{if(!t.trim())return;market.send(sid,bid,me,t.trim(),meta);setT('');n(x=>x+1)};
 return <div className="card"><div style={{maxHeight:220,overflow:'auto'}}>{msgs.map((m,i)=><div key={i} style={{textAlign:m.from===me?'right':'left',margin:'4px 0'}}><span className="tag" style={{padding:'6px 12px',background:m.from===me?'var(--pri)':'var(--bd)',color:m.from===me?'#fff':'inherit'}}>{m.text}</span></div>)}{!msgs.length&&<p className="mut">No messages yet.</p>}</div>
 <div className="bar" style={{marginTop:8}}><input value={t} onChange={e=>setT(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Type a message"/><button className="btn" onClick={send}>Send</button></div></div>;
}
