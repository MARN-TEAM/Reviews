import React from 'react'
import Review from "./review.jsx";
import $ from 'jquery'
import {token} from '../../../config'
class Reviews extends React.Component{
    constructor(props){
        super(props)
        this.state={
            reviews:[],
            ReviewsNumber:2
        }
    }
    componentDidMount(){
        $.ajax({
            url:'https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews?product_id=11002',
            type:'GET',
            contentType:'application/json',
            headers:{"Authorization":token},
            success:(Data)=>{
                console.log(Data)
                this.setState({reviews:Data.results})
            }
        })
    }
    render(){
        const {reviews,ReviewsNumber} = this.state
        console.log(ReviewsNumber)
        console.log(reviews)
        return(
            <div className="container">
                <h2 style={{fontSize:'20px',fontWeight:'100'}}>Rating & Reviews</h2>
                <div id='Reviews-data-container'>
                <div className="row">
                            <div className="col col-xl-4">
                            <div id='Rating-tab-Reviews'>
                                <div className='row'>
                                   <div className='col-3'><span style={{fontSize:'60px',fontWeight:'600'}}>3.5</span> </div> 
                                   <div className='col-6 Stars-mini-tab-rating' ><span><i className="fas fa-star "></i> </span><i className="fas fa-star"></i> <i className="fas fa-star Colored-Star-rating"></i> <i className="far fa-star"></i> <i className="far fa-star"></i></div>
                                </div>
                                <div className='row'>
                                        <p id='rating-perceentage-para'>100 % of reviews recommend this product</p>
                                </div>
                                <div className='row'>
                                    <button type="button" className="btn btn-link Start-button-rating-tab">5 stars </button><div className='Stars-percentage-bar' id='Stars-percentage-bar-5'></div>
                                </div>
                                <div className='row'>
                                    <button type="button" className="btn btn-link Start-button-rating-tab">4 stars </button><div className='Stars-percentage-bar' id='Stars-percentage-bar-4'></div>
                                </div>
                                <div className='row'>
                                    <button type="button" className="btn btn-link Start-button-rating-tab">3 stars </button><div className='Stars-percentage-bar' id='Stars-percentage-bar-3'></div>
                                </div>
                                <div className='row'>
                                    <button type="button" className="btn btn-link Start-button-rating-tab">2 stars </button><div className='Stars-percentage-bar' id='Stars-percentage-bar-2'></div>
                                </div>
                                <div className='row'>
                                    <button type="button" className="btn btn-link Start-button-rating-tab">1 stars </button><div className='Stars-percentage-bar' id='Stars-percentage-bar-1'></div>
                                </div>
                                <div className='row size-cursor-rate'>
                                    Size
                                    </div>
                                    <div className='row'>
                                    <span className='bar-for-cursor'></span><div className='bar-for-cursor'></div><div className='bar-for-cursor'></div>

                                    </div>
                                    <div className='row size-scrollar-bar-container'>
                                    <span id='down-sort-size'>
                                        <i className="fas fa-sort-down"></i>
                                        </span>
                                        <div className='col'>
                                             <span className='size-caract-font' style={{marginLeft:'-8px'}}>Too small</span>
                                        </div>
                                        <div className='col'>
                                            <span className='size-caract-font'  >Perfect</span>
                                        </div>
                                        <div className='col'>
                                            <span className='size-caract-font' style={{marginLeft:'10px'}}>Too Large</span>
                                        </div>
                                    
                                    
                                    </div>
                                <div className='row size-cursor-rate'>
                                    Comfort
                                    </div>
                                    <div className='row'>
                                    <span className='bar-for-cursor'></span><div className='bar-for-cursor'></div><div className='bar-for-cursor'></div>

                                    </div>
                                    <div className='row size-scrollar-bar-container'>
                                        <span id='down-sort-comfort'>
                                        <i className="fas fa-sort-down"></i>
                                        </span>
                                        <div className='col'>
                                             <span className='size-caract-font' style={{marginLeft:'-8px'}}>Poor</span>
                                        </div>
                                        <div className='col'>
                                            <span className='size-caract-font'  ></span>
                                        </div>
                                        <div className='col'>
                                            <span className='size-caract-font' style={{marginLeft:'18px'}}>Perfect</span>
                                        </div>
                                    
                                    
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                    <div className='row Reviews-tab'>
                                        <p className='reviews-tab-title'>{reviews.length} reviews, Sorted By Relevence</p>
                                        {reviews.map((e,i)=> <Review key={i} review = {e} /> )}
                                    </div>
                                    <div className='row reviews-buttons-space'>
                                        <button className='review-buttons-type' onClick={()=>this.setState({ReviewsNumber:ReviewsNumber+2})}>More Reviews</button>
                                        <button className='review-buttons-type'>Add A Review <span style={{marginLeft:'9px',fontSize:'22px'}}>+</span></button>
                                    </div>
                                    
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Reviews;