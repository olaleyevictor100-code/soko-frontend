import Link from 'next/link';
import Pic from './Pic';
export default function StoreCard({s,sp}){
 return <Link href={`/stores/${s.id}`} style={{textDecoration:'none'}}><div className="card" style={{borderTop:'4px solid var(--ac)'}}><Pic src={s.cover} seed={s.name}/>{sp&&<span className="tag" style={{background:'var(--ac)',color:'#10142b',display:'inline-block',marginTop:8}}>Sponsored</span>}<h3 style={{margin:'10px 0 2px'}}>{s.name}</h3><div className="mut">{s.cat} · {s.loc}</div></div></Link>;
}
