import React, { useState, useEffect } from "react";
import "./Navbar.css";
import menu_icon from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search.png";
import upload_icon from "../../assets/upload.png";
import more_icon from "../../assets/more.png";
import notification_icon from "../../assets/notification.png";
import profile_icon from "../../assets/jack.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../Store/Store";
import axios from "axios";
import { API_KEY3 } from "../../Data";
import { useNavigate } from "react-router-dom";
 import YouTubeIcon from '@mui/icons-material/YouTube';

const Navbar = ({ setSidebar }) => {
  const navigate = useNavigate();
  const { SearchData, userdata } = useAuth();
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/search',
        {
          params: {
            q: query,
            part: 'snippet',
            maxResults: 30,
            key: API_KEY3,
          },
        }
      );

      setVideos(response.data.items);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const FeedSend = () => {
    SearchData(videos);
    navigate("/SearchPage");
  };

  useEffect(() => {
    if (videos.length > 0) {
      FeedSend();
    }
  }, [videos]);

  return (
    <nav className="flex-div ">
      <div className="nav-left flex-div">
        <img
          className="menu-icon"
          onClick={() => {
            setSidebar(prev => !prev);
          }}
          src={menu_icon}
          alt=""
        />
        <Link to={"/"}>
          <span className="content ">
        <YouTubeIcon fontSize="large" />
        <span className="youtube ">YouTube</span>
        </span>

       
        </Link>
      </div>

      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
          />
          <img src={search_icon} alt="search" onClick={handleSearch} />
        </div>
      </div>

      <div className="nav-right flex-div">
        <img src={upload_icon} alt="" />
        <img src={more_icon} alt="" />
        <img src={notification_icon} alt="" />
        <Link to="/Login">
          <div className="flex items-center">
            <img className="user-icon w-8 h-8 rounded-full" src={profile_icon} alt="" />
            <h2 className="text-white ml-2">{userdata}</h2>
          </div></Link>
      </div>
    </nav>
  );
};

export default Navbar;
