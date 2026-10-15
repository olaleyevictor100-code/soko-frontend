'use client';
import {createContext,useContext,useEffect,useState} from 'react';
import {api} from './api';
const C=createContext(null);
export const useAuth=()=>useContext(C);
export const HOME={buyer:'/shop',seller:'/seller',agent:'/agent',admin:'/admin'};
export function AuthProvider({children}){
 const [user,setUser]=useState(null),[ready,setReady]=useState(false);
 useEffect(()=>{try{setUser(JSON.parse(localStorage.getItem('soko_user')))}catch{}setReady(true)},[]);
 const set=u=>{setUser(u);try{u?localStorage.setItem('soko_user',JSON.stringify(u)):localStorage.removeItem('soko_user')}catch{}};
 const login=async(e,p,r)=>{const u=await api.login(e,p,r);set(u);return u};
 const signup=async d=>{const u=await api.signup(d);set(u);return u};
 return <C.Provider value={{user,ready,login,signup,logout:()=>set(null)}}>{children}</C.Provider>;
}
// Client-side guard for the demo only. Real access control must be enforced on the server.
export function Guard({role,children}){
 const {user,ready}=useAuth();
 if(!ready)return null;
 if(!user||user.role!==role)return <div className="wrap"><p>Please <a href={role==='admin'?'/admin/login':'/login'}>log in</a> as {role}.</p></div>;
 return children;
}
