import React from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useState, useEffect } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import axios from 'axios';




const Product = () => {
  const navigate = useNavigate();
  const params = useParams();
  const {id} = params;  //ES6 approach
  console.log(id)
  // console.log(params.id);
  const defaultValues = {
    title: "",
    description: "",
    price: "",
    image: "",
  }
  const [product, setProduct] = useState(defaultValues);
  useEffect(()=>{
    if(!id){
      return;
    }
    axios("http://localhost:3001/products/"+id)
    .then(res => {
      console.log(res.data);
      const temp = {...defaultValues, ...res.data}
      console.log(temp);
      setProduct(temp);
    })
  }, [])
  
  const formik = useFormik({
    initialValues: product,
    enableReinitialize:true,
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, "should be more than 3 characters")
        .max(150, "Must be 150 characters or less")
        .required("Required"),
      description: Yup.string()
        .min(3, "Must be  3 characters or more")
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      price: Yup.string()
        .min(3, "Must be  3 characters or more")
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      image: Yup.string()
        .min(3, "Must be  3 characters or more")
        .max(500, "Must be 500 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2))
      if(id){ //id is avaible so put request
        axios.put('http://localhost:3001/products/'+id, values)
        .then(function (response) {
          console.log(response);
          navigate("/");
        })
        .catch(function (error) {
          console.log(error);
        });
      }else{ //id is not availale so post reqest
        axios.post('http://localhost:3001/products', values)
        .then(function (response) {
          console.log(response);
          navigate("/");
        })
        .catch(function (error) {
          console.log(error);
        });
      }
     
    //   fetch("http://localhost:3001/products", {method:'POST',  headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(values),
    // }).then((res)=>res.json())
    // .then((res)=>{
    //   console.log(res)
    //   navigate("/");
    // })
    // .catch((err)=>{
    //   console.log(err)
    // })
      
      // setFormState(values);
   
  }
})


  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className='mb-3' controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                name='title'
                value = {formik.values.title}
                onChange={formik.handleChange}
                placeholder='Enter Title'
              />
              <Form.Text className='text-danger'>
                {formik.touched.title && formik.errors.title ? (
                  <div className='text-danger'>{formik.errors.title}</div>
                ) : null}
              </Form.Text>
            </Form.Group>
            <Form.Group className='mb-3' controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                name='description'
                onChange={formik.handleChange}
                value={formik.values.description}
                placeholder='Enter Description'
              />
              <Form.Text className='text-danger'>
                {formik.touched.description && formik.errors.description ? (
                  <div className='text-danger'>{formik.errors.description}</div>
                ) : null}
              </Form.Text>
            </Form.Group>
            <Form.Group className='mb-3' controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='text'
                name='price'
                onChange={formik.handleChange}
                value={formik.values.price}
                placeholder='Enter Title'
              />
              <Form.Text className='text-danger'>
                {formik.touched.price && formik.errors.price ? (
                  <div className='text-danger'>{formik.errors.price}</div>
                ) : null}
              </Form.Text>
            </Form.Group>
            <Form.Group className='mb-3' controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                name='image'
                onChange={formik.handleChange}
                value = {formik.values.image}
                placeholder='Enter Title'
              />
              <Form.Text className='text-danger'>
                {formik.touched.image && formik.errors.image ? (
                  <div className='text-danger'>{formik.errors.image}</div>
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
  )
}

export default Product
