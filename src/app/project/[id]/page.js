import React from 'react';
import { createClient } from '@/utils/supabase/client';
import ProjectDetail from '@/component/ProjectDetail';

const supabase = createClient();


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


export async function GenerateMetadata({params}){
  const { id } = await params
  const data = await getData(id);

  return {
    title:`${data?.title || 'Project'}- Minimal Portfolio`, 
    //data? = data가 참이면 그대로 title이 나오고 거짓이면 'Project'가 나온다. (if문을 줄인것~)
    description:  "welcome to my portfolio"
  }
}

//data?.title 
//'?'의 명칭은 옵셔널 체이닝
//상황따라 다른게 들어올 수 있는게 체이닝

export default async function Project({params}){
  const { id } = await params
  const data = await getData(id);

  return(
    <ProjectDetail data={data}/>
  )
}
