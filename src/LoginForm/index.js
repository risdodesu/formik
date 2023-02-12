import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const errorStyle = {color:"red", height:"20px"}
const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
        username: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        password: Yup.string()
          .max(127, 'Must be 127 characters or less')
          .required('Required'),
      }), 

    onSubmit: values => {
      setIsLoading(true)
        // integrasi API tinggal panggil API setelah submit
        axios({
          method: 'get',
          url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`,
        })
          .then(function (response){
            const request_token = response.data.request_token;
            console.log(request_token);
              axios({
                method: 'post',
                url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${API_KEY}`,
                data: {
                  username: values.username,
                  password: values.password,
                  request_token: request_token
                }
              })
              .then(function (response){
                console.log(response.data)
                  axios({
                    method: 'post',
                    url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}`,
                    data: {
                      request_token: request_token
                    }
                  })
                  .then(function (response){
                    const session_id = response.data.session_id;
                    if(session_id) {
                      // redirect ke halaman user profile/home/timeline
                      alert("Berhasil login dengan session id : " + session_id)
                      setIsLoading(false)
                    }
                    // console.log(session_id)
                  })
                  .catch(function(error){
                    alert(error.message)
                    setIsLoading(false)
                  })
              })
              .catch(function(error){
                alert(error.message)
                setIsLoading(false)
              })
        })
          .catch(function(error){
            alert(error.message)
            setIsLoading(false)
        })
        // URL jangan lupa append host di depan values image
    }
  });

  return (
    <Form onSubmit={formik.handleSubmit}>

      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.username}/>
        <Form.Text>
            <div style={errorStyle}>{formik.errors.username && formik.errors.username}</div>
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}/>
        <Form.Text>
            <div style={errorStyle}>{formik.errors.password && formik.errors.password}</div>
        </Form.Text>
      </Form.Group>

      <Button disabled={!formik.isValid || isLoading} variant="success" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;