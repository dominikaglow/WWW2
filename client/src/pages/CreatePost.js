import React from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
//axios -> making requests
import axios from "axios";
//react-router-dom is used for client-side routing in React applications.
import {useHistory} from "react-router-dom";


function CreatePost(){
    let history = useHistory();

    const initialValues = {
        title:"",
        postText: "",
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        postText: Yup.string().required(),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts", data).then((response) => {
            history.push("/");
        });
    };
    return (
        <div className="createPostPage">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form className="formContainer">
                    <label>Title: </label>
                    <ErrorMessage name="title" component="span"/>
                    <Field
                        id="inputCreatePost"
                        name="title"
                        placeholder="Enter title here">
                    </Field>

                    <label>Post: </label>
                    <ErrorMessage name="postText" component="span"/>
                    <Field
                        id="inputCreatePost"
                        name="postText"
                        placeholder="Enter content here">
                    </Field>
                    <button type="submit">Upload review</button>
                </Form>
            </Formik>
        </div>
    );
}

export default CreatePost;