import React ,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import {useSelector,useDispatch} from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsProducts } from '../actions/productActions';

export default function ProductScreen(props) {
    const dispatch =useDispatch();
    const productId=props.match.params.id;
    const [qty, setQty] = useState(1);
   const productDetails = useSelector((state) => state.productDetails);
    const {loading,error,product} = productDetails;

    useEffect(() =>{
        dispatch(detailsProducts(productId));
    },[dispatch, productId]);

    const addToCartHandler =() =>{
        props.history.push(`/cart/${productId}?qty=${qty}`);
    }
  
    return (
        <div>
        {loading?(<LoadingBox></LoadingBox>)
        : error?(<MessageBox variant="danger">{error}</MessageBox>)
    :  ( 
        <div>
        <Link to="/">Back to Home</Link>
    <div className="row top">
        <div className="col-2">
        <img className="large" src ={product.image} alt={product.name}></img>
        </div>
        <div className="col-1">
        <ul>
            <li>
                <h1>{product.name}</h1>
            </li>
            <li>
                <Rating rating={product.rating}
                numReviews={product.numReviews}></Rating>
            </li>
            <li>
                price : sh{product.price}
             </li>
             <li>
               desciption : <p>{product.description}</p>
             </li>
        </ul>
        </div>
        <div className="col-1">
            <div className="card card-body">
                <ul>
                    <li>
                        <div className="row">
                       <div>Price</div>     
                        <div className="price">sh{product.price}</div>  
                        </div>
                    </li>
                    <li>
                        <div className="row">
                       <div>Status</div>     
                        <div className="status">
                            {product.countInStock>0 ? (<span className="success">In stock</span>):
                             (<span className="danger">Out Of Stock</span>)}
                            </div>  
                        </div>
                    </li>  
                    {
                        product.countInStock>0 &&(
                            <>
                            <li>
                             <div className="row">
                                 <div>Qty</div>
                                 <div>
                                     <select value={qty} onChange={e =>setQty(e.target.value)}>
                                         {
                                             [...Array(product.countInStock).keys()].map(x=>(
                                                 <option key={x+1}  value={x+1}>{x+1}</option>
                                             ))
                                         }
                                     </select>
                                 </div>
                                 </div>       
                            </li>
                         <li>
                            <button onClick={addToCartHandler} className="primary block">Add to Cart</button>
                        </li>
                            </>
                         
                        )
                    }
                  

                </ul>
            </div>

        </div>
    </div>
    </div>
    )}
</div>
       
    )
}
