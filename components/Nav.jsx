'use client';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useAuth} from '@/lib/auth';
const LINKS={buyer:[['/shop','Discover'],['/cart','Cart'],['/orders','Orders'],['/messages','Messages']],seller:[['/seller','Store'],['/seller/orders','Orders'],['/seller/messages','Messages'],['/seller/ads','Advertising']],agent:[['/agent','Dashboard']],admin:[['/admin','Dashboard'],['/admin/finance','Finance']]};
export default function Nav(){
 const {user,logout}=useAuth(),r=useRouter();
 return <nav className="nav"><Link href="/" className="logo">Soko<b>.</b></Link>
  {user?<>{LINKS[user.role].map(([h,n])=><Link key={h} href={h}>{n}</Link>)}<span>{user.name}</span><button className="btn ac" onClick={()=>{logout();r.push('/')}}>Log out</button></>
  :<><Link href="/login">Log in</Link><Link href="/signup" className="btn">Sign up</Link></>}</nav>;
}
