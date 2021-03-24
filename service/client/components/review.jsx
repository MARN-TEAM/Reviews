import React from 'react'

class Review extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        
        const {body,date,helpfulness,photos,rating,recommend,response,review_id,reviewer_name,summary} = this.props.review
        let d = new Date(date);
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        return(
            <div className='container one-Review-card'>
                <div className='row'>
                        <div className=' one-Review-stars col ' >
                        <span><i className={(rating>=1) ?"fas fa-star" :"far fa-star" }></i> </span><i className={(rating>=2) ?"fas fa-star" :"far fa-star" }></i> <i className={(rating>=2) ?"fas fa-star" :"far fa-star" }></i> <i className={(rating>=4) ?"fas fa-star" :"far fa-star" }></i> <i className={(rating>=5) ?"fas fa-star" :"far fa-star" }></i>
                        </div>
                        <div className='col' className='one-Review-date'>
                                    {reviewer_name}, {da +' '+mo + ', '+ye}
                        </div>
                </div>
                <div className='row'>
                            <div className='col' className='one-review-title'>
                                    {summary}
                            </div>
                </div>
                <div className='row'>
                            <div className='col' className='one-review-Content'>
                                
                           {body}
                            </div>
                </div>
{     (recommend) ?<div className='row Review-recomendation'>
                    <i className="fas fa-check Checked-recomendation-icon"></i><p> I recommend this product</p>
                </div>:''}
                <div className='row'>
                            <div className='col' className='one-review-Helpful'>
                    Helpful?<button type="button" className="btn btn-link Yes-button-one-review">Yes<p className='Count-Helpful-Yes'>({helpfulness})</p></button><div className="Vertical-Line"></div><button type="button" className="btn btn-link report-button-one-review">Report</button>
                            </div>
                </div>
                <hr  color="black" width='100%' className='Reviews-seperator' />
                
            </div>
        )
    }
}

export default Review;