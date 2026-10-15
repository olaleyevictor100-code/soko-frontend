'use client';
import {Guard,useAuth} from '@/lib/auth';
import Inbox from '@/components/Inbox';
export default function Page(){const {user}=useAuth();return <Guard role="seller"><div className="wrap"><h2>Buyer messages</h2>{user&&<Inbox role="seller" user={user}/>}</div></Guard>}
