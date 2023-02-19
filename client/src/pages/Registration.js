import React from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import {useHistory} from "react-router-dom";

function Registration(){
    const initialValues = {
        username: "",
        password: "",
    };

    let history = useHistory();

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(20).required(), /*min 3 znaki, max 20 znakow*/
        password: Yup.string().min(4).max(20).required(),
    });

    /*make input to table, we need axios*/
    //wywolywana gdy zatwierdzamy formularz
    //data zawiera to co uzytkownik wpisze w formularzu
    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data).then(() => {
            console.log(data);
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
                    <label>Username: </label>
                    <ErrorMessage name="username" component="span"/>
                    <Field
                        id="inputCreatePost"
                        name="username"
                        placeholder="Enter username here">
                    </Field>

                    <label>Password: </label>
                    <ErrorMessage name="password" component="span"/>
                    <Field
                        type="password"
                        id="inputCreatePost"
                        name="password"
                        placeholder="Enter password here">
                    </Field>
                    <button type="submit">Create account</button>
                </Form>
            </Formik>
        </div>
    )
//    name="password" sprawia, ze wpisywane haslo to kropki
}

export default Registration