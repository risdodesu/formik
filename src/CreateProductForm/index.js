import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const errorStyle = {color:"red", height:"20px"}
const CreateProductForm = () => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      image: '',
      price: 0,
    },
    validationSchema: Yup.object({
        name: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        description: Yup.string()
          .max(100, 'Must be 100 characters or less')
          .required('Required'),
        image: Yup.string().url()
          .required('Required'),
        price: Yup.number()
          .required('Required'),
      }), 

    onSubmit: values => {
        console.log(values);
        // integrasi API tinggal panggil API setelah submit
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
      />
        <div style={errorStyle}>{formik.errors.name && formik.errors.name}</div>
      <br/>

      <label htmlFor="description">Description</label>
      <input
        id="description"
        name="description"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.description}
      />
        <div style={errorStyle}>{formik.errors.description && formik.errors.description}</div>
      <br/>

      <label htmlFor="image">Image URL</label>
      <input
        id="image"
        name="image"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.image}
      />
         <div style={errorStyle}>{formik.errors.image && formik.errors.image}</div>
      <br/>

      <label htmlFor="price">Price</label>
      <input
        id="price"
        name="price"
        type="number"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.price}
      />
         <div style={errorStyle}>{formik.errors.price && formik.errors.price}</div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateProductForm;