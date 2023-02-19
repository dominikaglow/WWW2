import React, { useEffect, useState, useContext } from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Post(){
    let {id} = useParams(); /*id wiersza z bazy*/

    /*state containing information that we need*/
    const [postObject, setPostObject] = useState({});

    const [comments, setComments] = useState([]);

    /*state containing what user is writing as the input*/
    const [newComment, setNewComment] = useState("")

    const { authState } = useContext(AuthContext);

    //useEffect jest wywolywane przy kazdej zmianie chyba, ze jest [] to raz gdy strona sie renderuje
    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
            setPostObject(response.data);
        });

        /*api request to get list of all comments for one post*/
        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
            setComments(response.data);
        });
    }, []);

    /*funkcja, ktora bedzie wywolywana przy kazdym wcisnieciu przycisku*/
    const addComment = () => {
        axios.post("http://localhost:3001/comments", {
            commentBody: newComment,
            PostId: id,
        },
            {
                headers: {
                    //pobranie jaka wartosc jest w accessToken w application
                    accessToken: localStorage.getItem("accessToken"),
                },
            }
            ).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            }
            else{
                /*automatyczne pojawianie sie nowego komentarza bez odswiezania strony*/
                const commentToAdd = {
                    commentBody: newComment,
                    username: response.data.username,
                };
                /*...comments - previous list of comments*/
                setComments([...comments, commentToAdd]);
                /*czyszczenie pola na komentarz z poprzedniej zawartosci*/
                setNewComment("");
            }
        });
    };

    const deleteComment = (id) => {
        axios
            .delete(`http://localhost:3001/comments/${id}`, {
                headers: { accessToken: localStorage.getItem("accessToken") },
            })
            .then(() => {
                setComments(
                    comments.filter((val) => {
                        return val.id !== id;
                    })
                );
            });
    };

    return(
        <div className="postPage">
            <div className="frameLeft">
                <div className="leftSide">
                    <div className="title">{postObject.title}</div>
                    <div className="postText">{postObject.postText}</div>
                    {/*<div className="footer">{postObject.username}</div>*/}
                </div>
            </div>
            <div className="rightSide">
                <div className="addCommentContainer">
                    {/*(event) => {setNewComment(event.target.value)} - grab value directly from input and send them to a state*/}
                    <input
                        type="text"
                        placeholder="Comment..."
                        value={newComment}
                        onChange={(event) => {
                            setNewComment(event.target.value);
                        }}
                    />
                    <button onClick={addComment}>Add Comment</button>
                </div>
                <div className="listOfComments">
                    {comments.map((comment, key) => {
                        return(
                            <div key={key} className="comment">
                                <div className="userN">
                                    <label>{comment.username}: </label>
                                </div>
                                <div></div>
                                {comment.commentBody}
                                {authState.username === "admin" && (
                                    <button
                                        onClick={() => {
                                            deleteComment(comment.id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Post;