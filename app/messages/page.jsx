'use client';
import {Guard,useAuth} from '@/lib/auth';
import Inbox from '@/components/Inbox';
export default function Page(){const {user}=useAuth();return <Guard role="buyer"><div className="wrap"><h2>Messages</h2>{user&&<Inbox role="buyer" user={user}/>}</div></Guard>}
