import React from 'react'
import Review from "./review.jsx";

class Reviews extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="container">
                    <div className="row">
                            <div className="col col-xl-4">
                            <div id='Rating-tab-Reviews'>
                                </div>
                            </div>
                            <div className="col">
                                    <div className='Reviews-tab'>
                                        <p className='reviews-tab-title'>248 reviews, Sorted By Relevence</p>
                                        <Review />
                                    </div>
                                    <div className='Reviews-tab'>
                                        <p className='reviews-tab-title'>248 reviews, Sorted By Relevence</p>
                                        <Review />
                                    </div>
                                    
                            </div>
                    </div>
            </div>
        )
    }
}

export default Reviews;