import './globals.css';
import {AuthProvider} from '@/lib/auth';
import Nav from '@/components/Nav';
export const metadata={title:'Soko – Local Marketplace',description:'Buy and sell anywhere in Nigeria'};
export default function Root({children}){return <html lang="en"><body><AuthProvider><Nav/>{children}</AuthProvider></body></html>}
