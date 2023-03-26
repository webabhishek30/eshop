import * as Yup from 'yup';

export const signInSchema = Yup.object({
    email : Yup.string().email().required('Please enter your email'),
    password : Yup.string().min(6).required('Please enter your password')
});

export const signUpSchema = Yup.object({
    firstName : Yup.string().required('Please enter your first name'),
    lastName : Yup.string().required('Please enter your last name'),
    email : Yup.string().email().required('Please enter your email'),
    password : Yup.string().min(6).required('Please enter your password'),
    confirmPassword : Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    mobile: Yup.string().min(10).max(10).required('Please enter your mobile number')
});

export const addProductSchema = Yup.object({
    name : Yup.string().required('Please enter the product name'),
    category : Yup.string().required('Please select the category'),
    manufacturer : Yup.string().required('Please select the manufacturer'),
    availableItem : Yup.string().required('Please enter the available stocks'),
    price : Yup.string().required('Please enter the product price'),
});
export const addAddressSchema = Yup.object({
    name : Yup.string().required('Please enter your name'),
    mobile : Yup.number().required('Please enter your contact number'),
    street : Yup.string().required('Please enter your street'),
    city : Yup.string().required('Please enter your city'),
    state : Yup.string().required('Please enter your state'),
    zipcode : Yup.string().required('Please enter the zipcode'),
});