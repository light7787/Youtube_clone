import React from 'react'
import './Video.css'
import PlayVideo from '../../Components/PlayVideo/PlayVideo'
import Recomended from '../../Components/Recomended/Recomended'
import { useParams } from 'react-router-dom'
// import { useAuth } from '../../Store/Store'
import Feed from '../../Feed/Feed'

const Video = () => {
  // const{Transferdata} = useAuth();

   const {videoId,categoryId} = useParams();

  return (
    <>
  {  <div className='play-container'>
    <PlayVideo videoId={videoId}/>
    <Recomended categoryId={categoryId} videoId={videoId}/>

    </div>
    }
    </>
    
    
  )
}

export default Video