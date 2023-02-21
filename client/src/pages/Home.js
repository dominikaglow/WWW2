import React from "react";
import axios from "axios"
import {useEffect, useState} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import {useHistory} from "react-router-dom";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

/*setup api request*/
function Home() {
    /*list containing posts from api request*/
    const [listOfPosts, setListOfPosts] = useState([]);
    let history = useHistory();

    //By using this useEffect, you tell React that your component needs to do something after render.
    useEffect(() => {
        /*collect data, keep it in response and put it in listOfPosts*/
        axios.get("http://localhost:3001/posts").then((response) => {
            setListOfPosts(response.data);
        });
    }, []);
    return (
        <div className="swiper">
            <h1>MOVIES</h1>
            <Swiper
                spaceBetween={20}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                <div className="AppInHome">

                    {listOfPosts.map((value, key) =>{
                        return(
                            <SwiperSlide className="postAppearance">
                                <div
                                    className="post"
                                    onClick={() => {
                                        history.push(`/post/${value.id}`);
                                    }}
                                >
                                    <div className="title"> {value.title} </div>
                                    <div className="bodyPost"> {value.postText} </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </div>
            </Swiper>
        </div>
    )
}

export default Home;
