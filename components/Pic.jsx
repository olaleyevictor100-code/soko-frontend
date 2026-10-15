const hue=s=>Math.abs([...String(s)].reduce((a,c)=>a*31+c.charCodeAt(0)|0,7))%360;
// Shows the real photo when `src` exists, otherwise a coloured placeholder.
export default function Pic({src,seed,label='🛍️',style}){
 if(src)return <img className="pic" src={src} alt="" style={style}/>;
 return <div className="pic" style={{background:`linear-gradient(135deg,hsl(${hue(seed)},65%,50%),hsl(${(hue(seed)+50)%360},70%,32%))`,...style}}>{label}</div>;
}
