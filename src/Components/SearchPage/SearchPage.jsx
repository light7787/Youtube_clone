import React from 'react'
import { useAuth } from '../../Store/Store';
import { Link } from 'react-router-dom';
import './SearchPage.css'
import moment from 'moment'
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const navigate = useNavigate();

 
  const {authDataSearch} = useAuth();
 console.log(authDataSearch);
 const goTovideo = (videoId) =>{
  navigate(`/video/0/${videoId}`)
 }
  return (
    <div>
     
    
    <div className='feed bg-black '>{authDataSearch&&authDataSearch.map((item, index) => {
      return (
        
         <div className='card' onClick={() => goTovideo(item.id.videoId)}>
              <img src={item.snippet.thumbnails.medium.url} alt="" />
              <h2>{item.snippet.title}</h2>
              <h3>{item.snippet.channelTitle}</h3>
              <p> {moment(item.snippet.publishedAt).fromNow()}</p>
              </div>
         
      )
  })}
  </div>
  </div>

  )
}

export default SearchPage