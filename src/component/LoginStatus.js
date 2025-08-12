"use client";
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginStatus(){
  const supabase = createClient();
  const [user, setUser] = useState(null); //로그인한 유저 정보 할당
  
  useEffect(()=>{
    (async ()=>{
      //유저 정보 조회
      const { data: { result } } = await supabase.auth.getUser(); 
      setUser(result);
      console.log(result);
    })();
    console.log(user);
  },[user, supabase.auth]);

  console.log(user);
  
  return(
    <li><button className="btn btn-primary">Logout</button></li>
  )
}