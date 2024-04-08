import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import video1 from "../../assets/video.mp4"
import like from "../../assets/like.png"
import dislike from "../../assets/dislike.png"
import share from "../../assets/share.png"
import save from "../../assets/save.png"

import { API_KEY, API_KEY2, API_KEY3, API_KEY4, API_KEY5, api_key, value_converter } from '../../Data'
import moment from 'moment';
import { useParams } from 'react-router-dom'
import { useAuth } from '../../Store/Store'






const PlayVideo = () => {

    const {videoId} = useParams();
    const {SubscriberList} = useAuth();
    
   
    const[apiData,setApiData] = useState(null);
    const [channelData,setChannelData] = useState(null);
    const [commentData,setCommentData] = useState([]);
    const [subscribed, setSubscribed] = useState(false);
    const userEmail = localStorage.getItem('userEmail');


    const handleSubscribeClick = () => {
        setSubscribed(!subscribed);
       
    };
   




    const fetchVideoData = async() =>{
        //Fetching Videos Data
       const videoDetails_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY3}`
       await fetch(videoDetails_url).then(res=>res.json()).then(data=>setApiData(data.items[0]));


    }
    useEffect(()=>{
        fetchVideoData();

    },[videoId])
    const fetchOtherData = async() => {
        if (apiData && apiData.snippet && apiData.snippet.channelId) {
            const ChannelDetails_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY3}`;
            await fetch(ChannelDetails_url)
                .then(res => res.json())
                .then(data => setChannelData(data.items[0]));
                
        }

    
        if (videoId) {
            const Comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY3}`;
            await fetch(Comment_url)
                .then(res => res.json())
                .then(data => setCommentData(data.items));
        }
    };
    useEffect(()=>{
        fetchOtherData();
    },[apiData])
   
   


    const storeData = (data) => {
        const dataRef = ref(database, '/userInfo/9AoFufVyt8fZejmqcURG'); // Replace 'path/to/data' with your desired database path
        set(dataRef, data)
          .then(() => {
            console.log("Data stored successfully");
          })
          .catch((error) => {
            console.error("Error storing data: ", error);
          });
      };

  return (
    <div className='play-video'>
        {/* <video src={video1} controls autoPlay muted></video> */}
        <iframe  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        <h3>{apiData&&apiData.snippet.title}</h3>
        <div className="play-video-info">
            <p>{apiData?value_converter(apiData.statistics.viewCount):"12K"} Views &bull; {moment(apiData&&apiData.snippet.publishedAt).fromNow()}</p>
            <div>
                <span><img src={like} alt="" />{apiData&&value_converter(apiData.statistics.likeCount)}</span>
                <span><img src={dislike} alt="" /></span>
                <span><img src={share} alt="" />Share</span>
                <span><img src={save} alt="" />Save</span>
            </div>
        </div>
        <hr />
        <div className="publisher">
            <img src={channelData&&channelData.snippet.thumbnails.default.url} alt="" />
            <div>
                <p>{apiData&&apiData.snippet.channelTitle}</p>
                <span>{channelData&&value_converter(channelData.statistics.subscriberCount)} subscribers</span> 
            </div>
            <button onClick={handleSubscribeClick}>
                

              {subscribed?'Subscribed':'Subscribe'}
            </button>
        </div>
        <div className="vid-description">
           <p>{apiData&&apiData.snippet.description.slice(0,250)}</p>
            <hr />
            <h4>{apiData&&value_converter(apiData.statistics.commentCount)} Comments</h4>
            {commentData&&commentData.map((item,index)=>{
                return(
                    <div key={index} className="comment">
                    <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                    <div>
                   <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}<span>1 day ago</span></h3>
                   <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                   <div className="comment-action">
                    <img src={like} alt="" />
                    <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                    <img src={dislike} alt="" />
                   </div>
                    </div>
                </div>

                )

            })}
           
           
        </div>
    </div>
  )
}

export default PlayVideo