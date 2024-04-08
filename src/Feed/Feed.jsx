import React, { useEffect, useState } from 'react'
import './Feed.css'

import { Link } from 'react-router-dom'
import { API_KEY, API_KEY2, API_KEY3, API_KEY4, api_key, value_converter } from '../Data'
import moment from 'moment'
import { useAuth } from '../Store/Store'
 
const Feed = ({ category }) => {
    const [data, setData] = useState([]);
   
        // const [isDarkTheme, setIsDarkTheme] = useState(false);
      
        // const toggleTheme = () => {
        //   setIsDarkTheme(!isDarkTheme);
        // };
    
    // const {authDataSearch} = useAuth();
    
    const fetchData = async () => {

        const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY3} `

        await fetch(videoList_url).then(response => response.json()).then(data => setData(data.items))
    }

    useEffect(() => {
        fetchData();
        
    }, [category])
    ;
   
    
    // const randomNumber = Math.floor(Math.random() * 51);
   

    return (
        <div className=''>
            {/* <button onClick={toggleTheme}>click</button> */}
           
           {/* {authDataSearch.length == 0 ? */}
           <div className='feed'>
           {data&&data.map((item, index) => {
                return (
                    <Link to={`video/${item.snippet.categoryId}/${item.id}`} className='card'>
                        <img className='img' src={item.snippet.thumbnails.medium.url} alt="" />
                        <h2 className='title'>{item.snippet.title}</h2>
                        <h3 className='channel'>{item.snippet.channelTitle}</h3>
                        <p className='view'>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
                    </Link>
                )
            })} </div>
        {/* :
        <div className='feed'>{authDataSearch&&authDataSearch.map((item, index) => {
            return (
                <Link to={`video/0/${item.id.videoId}`} className='card'>
                    <img src={item.snippet.thumbnails.medium.url} alt="" />
                    <h2>{item.snippet.title}</h2>
                    <h3>{item.snippet.channelTitle}</h3>
                    <p> {moment(item.snippet.publishedAt).fromNow()}</p>
                </Link>
            )
        })}
        </div> */}
    
           {/* {data&&data.map((item, index) => {
            console.log("asdugfd",item.snippet.title)
                return (
                    <Link to={`video/${item.snippet.categoryId}/${item.id}`} className='card'>
                        <img src={item.snippet.thumbnails.medium.url} alt="" />
                        <h2>{item.snippet.title}</h2>
                        <h3>{item.snippet.channelTitle}</h3>
                        <p>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
                    </Link>
                )
            })} */}
        </div>
    )
}

export default Feed
