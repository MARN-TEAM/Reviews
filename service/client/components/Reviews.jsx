import React from 'react'
import Review from "./review.jsx";

class Reviews extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="container">
                <h2 style={{fontSize:'20px',fontWeight:'100'}}>Rating & Reviews</h2>
                    <div className="row">
                            <div className="col col-xl-4">
                            <div id='Rating-tab-Reviews'>
                                <div className='row'>
                                        <span style={{fontSize:'50px'}}>3.5</span>
                                </div>
                                </div>
                            </div>
                            <div className="col">
                                    <div className='row Reviews-tab'>
                                        <p className='reviews-tab-title'>248 reviews, Sorted By Relevence</p>
                                        <Review />
                                        <Review />
                                    </div>
                                    <div className='row reviews-buttons-space'>
                                        <button className='review-buttons-type'>More Reviews</button>
                                        <button className='review-buttons-type'>Add A Review <span style={{marginLeft:'9px',fontSize:'22px'}}>+</span></button>
                                    </div>
                                    
                            </div>
                    </div>
            </div>
        )
    }
}

export default Reviews;