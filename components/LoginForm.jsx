'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {useAuth,HOME} from '@/lib/auth';
export default function LoginForm({roles}){
 const [role,setRole]=useState(roles[0]),[err,setErr]=useState(''),{login}=useAuth(),r=useRouter();
 async function submit(e){e.preventDefault();const f=new FormData(e.target);try{await login(f.get('email'),f.get('password'),role);r.push(HOME[role])}catch(x){setErr(x.message)}}
 return <div className="wrap" style={{maxWidth:440}}><form className="card" onSubmit={submit}><h2>{role==='admin'?'Staff login':'Log in'}</h2>
  {roles.length>1&&<div className="bar" style={{marginBottom:8}}>{roles.map(x=><button type="button" key={x} className={x===role?'btn':'btn ac'} onClick={()=>setRole(x)}>{x}</button>)}</div>}
  <input name="email" type="email" placeholder="Email" required/><input name="password" type="password" placeholder="Password" required minLength={6}/>
  {err&&<p style={{color:'#c0392b'}}>{err}</p>}<button className="btn" style={{width:'100%'}}>Log in as {role}</button>
  <p className="mut">Demo (password demo123): buyer@demo.com, seller@demo.com, agent@demo.com. Admin: admin@soko.app / admin123</p></form></div>;
}
