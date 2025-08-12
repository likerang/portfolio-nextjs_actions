"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import ProjectDetail from '@/component/ProjectDetail';
import { useSearchParams } from 'next/navigation';

export default function ProjectClient(){
  const supabase = createClient();
  const sp = useSearchParams();
  console.log(sp);
  const id = sp.get('id');

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(()=>{
    if(!id) return;
    const supabase = createClient();

    ( async ()=>{
      const {data:result,error} = await supabase
      .from("portfolio")
      .select()
      .eq('id', id)
      .single(); //.single을 쓰면 배열로 안가지고오고 값을 가져온다.
      if(error){
        console.log(error);
        return null;
      }
      setData(result);
    })()
  },[id]);
  
  /*
  async function getData(id){
    const {data,error} = await supabase
    .from("portfolio")
    .select()
    .eq('id', id)
    .single(); //.single을 쓰면 배열로 안가지고오고 값을 가져온다.
    if(error){
      console.log(error);
      return null;
    }
    return data;
  }
  */
  
  /*
  export async function GenerateMetadata({params}){
    const { id } = await params
    const data = await getData(id);
  
    return {
      title:`${data?.title || 'Project'}- Minimal Portfolio`, 
      //data? = data가 참이면 그대로 title이 나오고 거짓이면 'Project'가 나온다. (if문을 줄인것~)
      description:  "welcome to my portfolio"
    }
  }
  */
    return(
      <>
      {!data ? (<p>데이터 로딩중 ...</p>) : <ProjectDetail data={data}/>}
      </>
    )
}
