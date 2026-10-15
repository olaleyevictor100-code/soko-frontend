'use client';
import {useEffect,useState} from 'react';
import {api} from '@/lib/api';
import {Guard} from '@/lib/auth';
export default function Admin(){
 const [p,setP]=useState([]),[c,setC]=useState(null),[st,setSt]=useState(null);
 const load=()=>{api.pendingStores().then(setP);api.getCharges().then(setC);api.stats().then(setSt)};useEffect(load,[]);
 async function save(e){e.preventDefault();const f=new FormData(e.target);await api.setCharges({fixed:+f.get('fixed'),percent:+f.get('percent'),payer:f.get('payer')});load()}
 return <Guard role="admin"><div className="wrap"><h2>Platform overview</h2>{st&&<div className="grid"><div className="card"><b>{st.stores}</b> stores</div><div className="card"><b>{st.pending}</b> awaiting approval</div><div className="card"><b>{st.users}</b> accounts</div></div>}
  <h3>Store approvals</h3><div className="card">{p.map(s=><div className="row" key={s.id}><span>{s.name} · {s.cat} · {s.loc}</span><span><button className="btn" onClick={async()=>{await api.setStoreStatus(s.id,'approved');load()}}>Approve</button> <button className="btn ac" onClick={async()=>{await api.setStoreStatus(s.id,'rejected');load()}}>Reject</button></span></div>)}{!p.length&&<p className="mut">Nothing pending.</p>}</div>
  {c&&<form className="card" style={{marginTop:16}} onSubmit={save} key={JSON.stringify(c)}><h3>Order charges</h3><input name="fixed" type="number" min="0" defaultValue={c.fixed}/><input name="percent" type="number" min="0" step="0.5" defaultValue={c.percent}/><select name="payer" defaultValue={c.payer}><option>seller</option><option>buyer</option><option>shared</option></select><button className="btn">Save charges</button></form>}</div></Guard>;
}
