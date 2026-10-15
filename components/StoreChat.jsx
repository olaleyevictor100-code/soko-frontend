'use client';
import {useAuth} from '@/lib/auth';
import ChatBox from './ChatBox';
export default function StoreChat({sid,storeName}){
 const {user}=useAuth();if(!user||user.role!=='buyer')return null;
 return <><h3>Chat with {storeName}</h3><ChatBox sid={sid} bid={user.id} me="b" meta={{storeName,buyerName:user.name}}/></>;
}
