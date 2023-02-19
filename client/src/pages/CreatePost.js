import React from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import {useHistory} from "react-router-dom";


function CreatePost(){
    let history = useHistory();

    const initialValues = {
        title:"",
        postText: "",
        // username: "",
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        postText: Yup.string().required(),
        // username: Yup.string().min(3).max(20).required(), /*min 3 znaki, max 20 znakow*/
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

                    {/*<label>Username: </label>*/}
                    {/*<ErrorMessage name="username" component="span"/>*/}
                    {/*<Field*/}
                    {/*    id="inputCreatePost"*/}
                    {/*    name="username"*/}
                    {/*    placeholder="Enter username here">*/}
                    {/*</Field>*/}
                    <button type="submit">Upload review</button>
                </Form>
            </Formik>
        </div>
    );
}

export default CreatePost;