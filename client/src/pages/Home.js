import React from "react";
import axios from "axios"
import {useEffect, useState} from "react"; //dane beda wyswietlone od razu
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import {useHistory} from "react-router-dom";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

// function Home() {
//     const [listOfPosts, setListOfPosts] = useState([]);
//     let history = useHistory();
//
//     useEffect(() => {
//         axios.get("http://localhost:3001/posts").then((response) => {
//             setListOfPosts(response.data);
//         });
//     }, []);
//
//     return (
//         <div>
//             {listOfPosts.map((value, key) => {
//                 return (
//                     <div
//                         className="post"
//                         onClick={() => {
//                             history.push(`/post/${value.id}`);
//                         }}
//                     >
//                         <div className="title"> {value.title} </div>
//                         <div className="body">{value.postText}</div>
//                         <div className="footer">{value.username}</div>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// }

/*setup api request*/
function Home() {
    /*list containing posts from api request*/
    const [listOfPosts, setListOfPosts] = useState([]);
    let history = useHistory();
    // let navigate = useNavigate()

    useEffect(() => {
        /*odbierz dane, przechowaj je w response i wypisz je*/
        axios.get("http://localhost:3001/posts").then((response) => {
            setListOfPosts(response.data);
        }); //url that corresponds to api request
    }, []);
    /*mp through every single element*/
    return (
        <div className="swiper">
            <h1>Users reviews</h1>
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
                                        console.log(value.id);
                                    }}
                                >
                                    <div className="title"> {value.title} </div>
                                    <div className="bodyPost"> {value.postText} </div>
                                    {/*<div className="footer"> {value.username} </div>;*/}
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </div>
            </Swiper>
        </div>
        // <div className="App">
        //     {listOfPosts.map((value, key) =>{
        //     return(
        //         <div className="post">
        //             <div className="title"> {value.title} </div>;
        //             <div className="body"> {value.postText} </div>;
        //             <div className="footer"> {value.username} </div>;
        //         </div>
        //     );
        // })}
        // </div>
    )
}

export default Home;
