import axios from 'axios'
import React, { useContext, useState } from 'react'
import { ColorRing, InfinitySpin } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import toast, { Toaster } from 'react-hot-toast';
import { authContext } from '../Context/authuntication';


const Products = () => {

  const [added,setAdded]=useState(false)
  function getAllProducts(){
return axios.get("https://route-ecommerce.onrender.com/api/v1/products");
  }
  const {data,isLoading,isFetching,refetch}=useQuery('products', getAllProducts,{
    refetchInterval:2000,
    refetchOnMount:true
  })

  

  async function getProductID(id,e){
    e.target.style.cssText="color:red"
localStorage.setItem('productID',id)

    try {
      
       let response = await axios.post("https://route-ecommerce.onrender.com/api/v1/wishlist",{
      productId:id,
    },{
      headers:{
        token:localStorage.getItem("token"),
      }
    })

toast.success(response.data.message, {
  style: {
    border: '1px solid green',
    padding: '16px',
    color: 'green',
  },
  iconTheme: {
    primary: 'green',
    secondary: '#FFFAEE',
  },
}) ;
   setAdded(true)

   

   
    } 
    
    catch (error) {
      setAdded(false);
      toast.success("Product not added successfully", {
  style: {
    border: '1px solid green',
    padding: '16px',
    color: 'green',
  },
  iconTheme: {
    primary: 'green',
    secondary: '#FFFAEE',
  },
}) ;
    }

   
    
  }

      {if(isLoading){
      return <div className='d-flex justify-content-center align-items-center vh-100 '>
      <InfinitySpin 
  width='200'
  color="#4fa94d"
/>
</div>
    }}
  return (

  
    
   <>

 {added?<Toaster position='top-right'/>:""}
   <div className="container">
    <div className="row">
     {data?.data.data.map((product,indx) =>{
      return  <div className="col-md-2" key={indx}>
        <div>
          <img src={product.imageCover} className='w-100' alt="" />

          <div className="d-flex justify-content-between align-items-center">

          <h6 className='main-color'>{product.category.name}</h6>
          <i class="fa-solid fa-heart" style={{cursor:"pointer"}} onClick={(e)=>{getProductID(product.id,e)}}></i>
          </div>
          <h5>{product.title.split(" ").slice(0,2).join(" ")}</h5>

        <div className="d-flex justify-content-between align-align-items-center ">
          <p>{product.price} <span>EGP</span></p>

          <p>
          <i class="fa-solid fa-star" style={{color:"#ffc906"}}></i>{product.ratingsAverage}
          </p>
          </div>
        </div>
      </div>
     })}
    </div>
   </div>
   </>
  )
}

export default Products