'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {useAuth,HOME} from '@/lib/auth';
import {LOCS,CATS} from '@/lib/api';
export default function Signup(){
 const [role,setRole]=useState('buyer'),[err,setErr]=useState(''),{signup}=useAuth(),r=useRouter();
 async function submit(e){e.preventDefault();const d=Object.fromEntries(new FormData(e.target));try{await signup({...d,role});r.push(HOME[role])}catch(x){setErr(x.message)}}
 return <div className="wrap" style={{maxWidth:440}}><form className="card" onSubmit={submit}><h2>Create your account</h2>
  <div className="bar" style={{marginBottom:8}}>{['buyer','seller','agent'].map(x=><button type="button" key={x} className={x===role?'btn':'btn ac'} onClick={()=>setRole(x)}>{x}</button>)}</div>
  <input name="name" placeholder="Full name" required/><input name="email" type="email" placeholder="Email" required/><input name="password" type="password" placeholder="Password (6+ characters)" minLength={6} required/>
  {role==='seller'&&<><input name="business" placeholder="Business name" required/><select name="cat">{CATS.map(c=><option key={c}>{c}</option>)}</select><select name="loc">{LOCS.map(c=><option key={c}>{c}</option>)}</select></>}
  {err&&<p style={{color:'#c0392b'}}>{err}</p>}<button className="btn" style={{width:'100%'}}>Sign up as {role}</button></form></div>;
}
