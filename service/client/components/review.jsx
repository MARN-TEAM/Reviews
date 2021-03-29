import React from 'react'
import $ from 'jquery'
import {token} from '../../../config'


class Review extends React.Component{
    constructor(props){
        super(props)
        this.state={
            helpfuls:0,
            ClickedHelpful:false,
            reported:false
        }
    }
    componentDidMount(){
        this.setState({helpfuls:this.props.review.helpfulness})
    }
    UpdateHelpfulness(){
        $.ajax({
            url:'https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews/'+this.props.review.review_id+'/helpful',
            type:'PUT',
            headers:{"Authorization":token},
            success:()=>{
                this.props.review.helpfulness ++
                this.setState({helpfuls:this.state.helpfuls + 1})
                this.setState({ClickedHelpful:true})
            }
        })
        
    }

    ReportReview(){
        $.ajax({
            url:'https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews/'+this.props.review.review_id+'/report',
            type:'PUT',
            headers:{"Authorization":token},
            success:()=>{
                this.setState({reported:true})
            }
        })
        
    }
    PreviewPhoto(imgLink){
        var modal = document.getElementById("Modal-image-review-preview");
        var modalImg = document.getElementById("img-modal-preview");
        modal.style.display = "block";
        modalImg.src = imgLink;
        
    }
    closeImagePreview(e){
        if(e.target.id != 'img-modal-preview'){
            document.getElementById("Modal-image-review-preview").style.display = "none"
        }
    }

    render(){
        const {body,date,helpfulness,photos,rating,recommend,response,review_id,reviewer_name,summary} = this.props.review
        const {helpfuls,ClickedHelpful,reported} = this.state
        let d = new Date(date);
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        if(!reported){
            return(
                <div className='container one-Review-card'>
                    <div className='row'>
                            <div className=' one-Review-stars col-md ' >
                            {this.props.RatingStars(rating)}
                            </div>
                            <div className='col-sm' className='one-Review-date'>
                                        {reviewer_name}, {da +' '+mo + ', '+ye}
                            </div>
                    </div>
                    <div className='row'>
                                <div className='col' className='one-review-title'>
                                        {(summary.length > 60) ? summary.slice(0,60)+'...':summary}
                                </div>
                    </div>
                    <div className='row'>
                                <div className='col' className='one-review-Content'>
                                    
                               {body}
                                </div>
                    </div>
    {     (recommend) ?<div className='row Review-recomendation'>
                        <i className="fa fa-check Checked-recomendation-icon"></i><p> I recommend this product</p>
                    </div>:''}
                    {(!response) ? '':<div className='Review-response'>
                    <div className='row' style={{color:'#525252',fontSize:'13px',fontWeight:'600'}}>
                        Response:
                    </div> 
                    <div className='row' style={{fontSize:'13px',marginTop:'10px'}}>
                            {response}
                    </div> 
                    </div>}
                    {(photos.length>0)?<div className='row'>
                        {photos.map((e,i)=><div className='col-md-3 image'><img className='mage-review-style' style={{margin:'5px',borderRadius:'4%'}} src={e.url} onClick={()=>this.PreviewPhoto(e.url)} width='80px' height="80px"  /></div>)}
                    </div>:''}
                    
                    <div className='row'>
                                <div className='col' className='one-review-Helpful'>
                        Helpful?<button type="button" className={(ClickedHelpful ) ? "btn btn-link Yes-button-one-review disabled":"btn btn-link Yes-button-one-review"} onClick={()=>this.UpdateHelpfulness()} aria-disabled={(ClickedHelpful ) ? 'true':'false'} >Yes<p className='Count-Helpful-Yes'>({helpfulness})</p></button><div className="Vertical-Line"></div><button type="button" className="btn btn-link report-button-one-review" onClick={()=>this.ReportReview()}>Report</button>
                                </div>
                    </div>
                    <hr  color="black" width='100%' className='Reviews-seperator' />
                    <div id="Modal-image-review-preview" class="modal-preview-container" onClick={(e)=>this.closeImagePreview(e)}>
                        <span class="close-review-image-previews" >&times;</span>
                        <img class="modal-content-image-preview" id="img-modal-preview" />
                        </div>
                </div>
            )
        }else{
            return('')
        }
        
    }
}

export default Review;