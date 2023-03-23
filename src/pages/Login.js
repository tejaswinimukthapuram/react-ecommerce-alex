import React from 'react'
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useState, useEffect } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from 'axios'
import environment from '../environment'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues:{
            username:"",
            password:""
        },
        enableReinitialize:true,
        validationSchema: Yup.object({
          username: Yup.string()
            .min(3, "should be more than 3 characters")
            .max(150, "Must be 150 characters or less")
            .required("Required"),
          password: Yup.string()
            .min(3, "Must be  3 characters or more")
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          
        }),
        onSubmit: (values) => {
          
            axios.post(`${environment.api}/user/login`, values)
            .then((res)=>{
                console.log(res)
                const token = res.data.token
                if(token){
                    localStorage.setItem("token", token)
                    navigate('/');
                }
               
            })
            .catch((err)=>{
                alert("Unauthorised Access")
            })
       
      }
    })
    
  return (
    <>
    <Container>
        <Row>
            <Col>
            <Form onSubmit={formik.handleSubmit}>
            <Form.Group className='mb-3' controlId='username'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                name='username'
                value = {formik.values.username}
                onChange={formik.handleChange}
                placeholder='Enter Username'
              />
              <Form.Text className='text-danger'>
                {formik.touched.username && formik.errors.username ? (
                  <div className='text-danger'>{formik.errors.username}</div>
                ) : null}
              </Form.Text>
            </Form.Group> 
            

            
            <Form.Group className='mb-3' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='text'
                name='password'
                value = {formik.values.password}
                onChange={formik.handleChange}
                placeholder='Enter Password'
              />
              <Form.Text className='text-danger'>
                {formik.touched.password && formik.errors.password ? (
                  <div className='text-danger'>{formik.errors.password}</div>
                ) : null}
              </Form.Text>
            </Form.Group> 
            <Button variant='primary' type='submit'>
              Submit
            </Button>
            </Form>
            </Col>
        </Row>
    </Container>

    </>
  )
}

export default Login

