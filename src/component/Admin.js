import React, {useRef, useState} from 'react'
import './Admin.css'
const Admin = () => {
  const [imgUrl, setimgUrl] = useState();
  const [notice, setnotice] = useState(false);
  const formRef = useRef(null);
  const [productDetails, setproductDetails] = useState({
    title:'',
    description:'',
    price:'',
    quantity:'',
    image:'',
  })
  const handleProductChange = (e)=>{
    setproductDetails({...productDetails,[e.target.name] : e.target.value})
  }
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imgURL = URL.createObjectURL(file);
    setimgUrl(imgURL);
    setproductDetails({
      ...productDetails,
      image: file,
    });
  };
  const handleAddProducts = (e)=>{
   e.preventDefault();
   const formData = new FormData();
   if(!productDetails.title || !productDetails.price || !productDetails.quantity || !productDetails.image || !productDetails.description) {
    alert("Please Fill Product Details");
    return;
   }  
   formData.append('title', productDetails.title);
   formData.append('price', productDetails.price);
   formData.append('quantity', productDetails.quantity);
   formData.append('description', productDetails.description);
   if (productDetails.image) {
     formData.append('image', productDetails.image);
   }
   fetch('http://localhost:5000/addProduct',{
    method:'POST',
    body: formData,
   }).then((response)=>{
    response.json().then((result)=>{
      console.log(result);
      setnotice(true);
      setTimeout(() => {
        setnotice(false);
      }, 2000);
    })
   }).catch((error)=>{
    alert("Product added failed");
   })
   setimgUrl();
   formRef.current.reset();
 setproductDetails({
  title:'',
  description:'',
  price:'',
  quantity:'',
  image:'',
});
  }
  return (
    <div style={{display:'flex',width:'100%',justifyContent:'center',marginTop:'20px',height:'100vh',overflow:'auto'}}>
    <div style={{width:'45%'}}>
    <div className='add-product-text' >Add Your Products Here!</div>
    <form  ref={formRef} action="">
    <div > <div className='margin-5' >Product Name</div> <input value={productDetails.title} name='title' placeholder='Please enter the Product Name' className='input-field' onChange={handleProductChange} style={{width:'100%'}} type="text" /></div>
    <div > <div className='margin-5' >Product Description</div> 
    <textarea onChange={handleProductChange} value={productDetails.description} name='description' placeholder='Please enter the Product Name' className='input-field' style={{width:'100%',height:'10vh',padding:'10px'}} type="text" /></div>
    <div> <div className='margin-5'>Price</div> <input onChange={handleProductChange} value={productDetails.price} name='price' placeholder='Please enter the Price' className='input-field'  style={{width:'100%'}} type="number" /></div>
    <div> <div className='margin-5'>Quantity</div> <input onChange={handleProductChange} value={productDetails.quantity} name='quantity' className='input-field' placeholder='Please enter the Quantity'  style={{width:'100%'}} type="number" /></div>
    <input  name='image' className='margin-5' type="file" accept='image/*' onChange={handleImageChange}/>
    <div style={{width:'400px',height:'100px',margin:'auto'}}>
    
    {
      productDetails && productDetails.image ? <img style={{width:'100%',height:'100%',objectFit:'contain'}} src={imgUrl} alt="" />:
      <img   style={{width:'100%',height:'100%',objectFit:'contain'}} src='https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png' />
    }
    </div>

    <button onClick={handleAddProducts} >Add</button>
   { notice &&  <div style={{backgroundColor:'green',position:'absolute',left:'43%',bottom:'7%',color:'#ffffff',padding:'12px',borderRadius:'10px'}}>Product Added successfully</div> }
    </form>
    </div>
    </div>
  )
}

export default Admin
