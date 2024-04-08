import React, { useEffect, useState } from 'react'
import './Recomended.css'

import { api_key, value_converter } from '../../Data'
import { Link, useParams } from 'react-router-dom';




const Recomended = () => {
    const {categoryId} =useParams();
  
     
    const[apiData,setApiData]=useState([]);

    const fetchData = async () =>{
        const relatedVideo_url=` https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=40&regionCode=US&videoCategoryId=${categoryId}&key=${api_key}`
        await fetch(relatedVideo_url).then(res=>res.json()).then(data=>setApiData(data.items))
    }

    useEffect(()=>{
        fetchData();
    },[categoryId])

  return (
    <div className='recomended'>
        {apiData.map((item,index)=>{
            return (
                <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index}className="side-video-list">
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="vid-info">
                <h4>{item.snippet.title}</h4>
                <p>{item.snippet.channelTitle}</p>
                <p>{value_converter(item.statistics.viewCount)} Views</p>
            </div>
            </Link>

            )

        })}
        
    </div>
  )
}

export default Recomended