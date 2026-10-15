'use client';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useAuth,HOME} from '@/lib/auth';
export default function Nav(){
 const {user,logout}=useAuth(),r=useRouter();
 return <nav className="nav"><Link href="/" className="logo">Soko<b>.</b></Link>
  {user?<><Link href={HOME[user.role]}>{user.role==='buyer'?'Discover':'Dashboard'}</Link><span>{user.name}</span><button className="btn ac" onClick={()=>{logout();r.push('/')}}>Log out</button></>
  :<><Link href="/login">Log in</Link><Link href="/signup" className="btn">Sign up</Link></>}</nav>;
}
