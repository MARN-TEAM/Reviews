import React from 'react'

class Review extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className='container one-Review-card'>
                <div className='row'>
                        <div className=' one-Review-stars col ' >
                        <span><i className="fas fa-star "></i> </span><i className="fas fa-star"></i> <i className="fas fa-star Colored-Star-review"></i> <i className="far fa-star"></i> <i className="far fa-star"></i>
                        </div>
                        <div className='col' className='one-Review-date'>
                                    user1527, january 19, 2021
                        </div>
                </div>
                <div className='row'>
                            <div className='col' className='one-review-title'>
                                    Review title with word-trunction etc
                            </div>
                </div>
                <div className='row'>
                            <div className='col' className='one-review-Content'>
                                
                            This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.
                            </div>
                </div>
                <div className='row Review-recomendation'>
                    <i class="fas fa-check Checked-recomendation-icon"></i><p> I recommend this product</p>
                </div>
                <div className='row'>
                            <div className='col' className='one-review-Helpful'>
                    Helpful?<button type="button" className="btn btn-link Yes-button-one-review">Yes<p className='Count-Helpful-Yes'>(10)</p></button><div className="Vertical-Line"></div><button type="button" className="btn btn-link report-button-one-review">Report</button>
                            </div>
                </div>
                <hr  color="black" width='100%' className='Reviews-seperator' />
                
            </div>
        )
    }
}

export default Review;