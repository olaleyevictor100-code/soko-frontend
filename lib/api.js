// MOCK DATA LAYER. Every function here is the seam where a real backend plugs in.
// Replace each body with fetch('/api/...') calls; keep the signatures and the UI will not change.
export const LOCS=['Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT Abuja','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara'];
export const CATS=['Fashion','Food','Groceries','Electronics','Phones','Salons','Hotels','Repairs','Transport','Furniture','Pharmacy','Events','Agriculture','Building','Services'];
const S=(id,name,cat,loc,desc,ag)=>({id,name,cat,loc,desc,ag,status:'approved',cover:'',gallery:[]});
let stores=[S(1,'Adire House','Fashion','Oyo','Hand-dyed adire fabrics and ready-to-wear.',4),S(2,'Mama Put Kitchen','Food','Oyo','Jollof, amala and small chops.'),S(3,'Glow Studio','Salons','Lagos','Braids, makeup and barbing.',4),S(4,'Kano Grains & Spices','Groceries','Kano','Rice, beans and spices in bulk.'),S(5,'Wuse Auto Fix','Repairs','FCT Abuja','Mobile mechanics.',4)];
let products=[{id:1,sid:1,name:'Adire Ankara (6 yards)',price:12000,kind:'product',photo:''},{id:2,sid:2,name:'Jollof + Chicken',price:3500,kind:'product',photo:''},{id:3,sid:3,name:'Knotless braids (booking)',price:25000,kind:'service',photo:''},{id:4,sid:4,name:'Rice 50kg bag',price:78000,kind:'product',photo:''},{id:5,sid:5,name:'Engine diagnosis',price:8000,kind:'service',photo:''}];
let users=[{id:1,role:'admin',name:'Owner',email:'admin@soko.app',pw:'admin123'},{id:2,role:'buyer',name:'Ada Buyer',email:'buyer@demo.com',pw:'demo123'},{id:3,role:'seller',name:'Bisi',email:'seller@demo.com',pw:'demo123',sid:1},{id:4,role:'agent',name:'Tunde',email:'agent@demo.com',pw:'demo123'}];
let charges={fixed:200,percent:5,payer:'seller'},agentFee=1500;
const wait=v=>new Promise(r=>setTimeout(()=>r(v),120));
const pub=u=>({id:u.id,role:u.role,name:u.name,email:u.email,sid:u.sid});
export const api={
 // AUTH: replace with real auth (hashed passwords, sessions/JWT). Never keep plaintext passwords.
 async login(email,pw,role){const u=users.find(x=>x.email===email.toLowerCase()&&x.role===role&&x.pw===pw);if(!u)throw new Error('Wrong email or password for a '+role+' account');return wait(pub(u))},
 async signup(d){if(users.some(u=>u.email===d.email.toLowerCase()))throw new Error('Email already registered');const u={id:Date.now(),role:d.role,name:d.name,email:d.email.toLowerCase(),pw:d.password};
  if(d.role==='seller'){const s={...S(Date.now()+1,d.business,d.cat,d.loc,'Tell buyers about your business.'),status:'pending'};stores.push(s);u.sid=s.id}users.push(u);return wait(pub(u))},
 listStores:({loc,cat,q}={})=>wait(stores.filter(s=>s.status==='approved'&&(!loc||s.loc===loc)&&(!cat||s.cat===cat)&&(!q||(s.name+s.desc).toLowerCase().includes(q.toLowerCase())))),
 getStore:id=>wait({store:stores.find(s=>s.id===+id),products:products.filter(p=>p.sid===+id)}),
 // IMAGES: `photo`/`cover`/`gallery` hold URLs. In production upload to storage (S3/Cloudinary) and save the returned URL.
 updateStore:(id,patch)=>{Object.assign(stores.find(s=>s.id===+id),patch);return wait(true)},
 addProduct:p=>{products.push({id:Date.now(),...p});return wait(true)},
 pendingStores:()=>wait(stores.filter(s=>s.status==='pending')),
 setStoreStatus:(id,status)=>{stores.find(s=>s.id===+id).status=status;return wait(true)},
 registerStore:(agentId,d)=>{stores.push({...S(Date.now(),d.name,d.cat,d.loc,d.desc||'New store',agentId),status:'pending'});return wait(true)},
 agentSummary:id=>wait({stores:stores.filter(s=>s.ag===id),fee:agentFee}),
 getCharges:()=>wait(charges),setCharges:c=>{charges=c;return wait(true)}, // admin only; must be audit-logged server-side
 deleteUser:id=>{const u=users.find(x=>x.id===id);if(u&&u.sid)stores.find(s=>s.id===u.sid).status='closed';users=users.filter(x=>x.id!==id);return wait(true)}, // keep order/payment records server-side for legal reasons
 allStores:()=>wait(stores),
 stats:()=>wait({stores:stores.length,pending:stores.filter(s=>s.status==='pending').length,users:users.length}),
};
