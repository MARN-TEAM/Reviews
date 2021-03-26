import React from 'react'
import Review from "./review.jsx";
import $ from 'jquery'
import {token} from '../../../config'
class Reviews extends React.Component{
    constructor(props){
        super(props)
        this.state={
            reviews:[],
            ReviewsNumber:2,
            averageRate:0,
            reromendedpercent:0,
            percentfive:0,
            percentfour:0,
            percentthree:0,
            percenttwo:0,
            percentone:0,
            charachts:{}
        }
    }
    sortChange(){
        reviews = this.state.reviews

    }
    componentDidMount(){
        $.ajax({
            url:'https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews?product_id=11007',
            type:'GET',
            contentType:'application/json',
            headers:{"Authorization":token},
            success:(Data)=>{

                this.setState({reviews:Data.results})          
                 
            }
        })
        $.ajax({
            url:'https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews/meta?product_id=11007',
            type:'GET',
            contentType:'application/json',
            headers:{"Authorization":token},
            success:(Meta)=>{
                console.log(Meta)
                var CountReviews = Number(Meta.ratings[1]) + Number(Meta.ratings[2]) + Number(Meta.ratings[3]) + Number(Meta.ratings[4]) + Number(Meta.ratings[5])
                var sumrating = Number(Meta.ratings[1])*1 + Number(Meta.ratings[2])*2 + Number(Meta.ratings[3])*3 + Number(Meta.ratings[4])*4 + Number(Meta.ratings[5])*5
                this.setState({percentfive:(Meta.ratings[5]/CountReviews)*100,percentfour:(Meta.ratings[4]/CountReviews)*100,percentthree:(Meta.ratings[3]/CountReviews)*100,percenttwo:(Meta.ratings[2]/CountReviews)*100,percentone:(Meta.ratings[1]/CountReviews)*100})
                if(sumrating && CountReviews){
                    this.setState({averageRate:(sumrating/CountReviews).toFixed(1)})
                }
                if(Meta.recommended.true && CountReviews){
                    this.setState({reromendedpercent: Math.trunc((Number(Meta.recommended.true)/CountReviews)*100)})
                }
                
                this.setState({charachts:Meta.characteristics})
            }
        })
        
    }
    RatingStars(averageRate){
        var storage=[]
        for(var i=0;i<5;i++){
            if(averageRate>1){
                storage.push(1)
            }else if(averageRate>0){
                storage.push(averageRate)
            }else{
                storage.push(0)
            }
            averageRate--
        }
        var Stars=<div>
                {storage.map((e,i)=>{

                    if((e==1)){
                        return(<i className="fa fa-star" key={i}></i>)
                    }else {
                        return(
<i className="fa fa-star Colored-Star-rating" key={i} 
style={{background: "linear-gradient(90deg,#525252 "+Number(e*100)+"%, white "+Number(e*100)+"%)",
        BackgroundClip:'text',
        TextFillColor:'transparent',
        WebkitBackgroundClip: "text", 
        WebkitTextFillColor: "transparent",
        color:'transparent'}}>
</i>)
                    }
                } )}
        </div>

        return Stars
    }
    render(){
        
        const {reviews,ReviewsNumber,averageRate,reromendedpercent,percentfive,percentfour,percentthree,percenttwo,percentone,charachts} = this.state
        return(
            <div className="container">
                <h2 style={{fontSize:'20px',fontWeight:'100'}}>Rating & Reviews</h2>
                <div id='Reviews-data-container'>
                <div className="row">
                            <div className="col col-xl-4">
                            <div id='Rating-tab-Reviews'>
                                <div className='row'>
                                   <div className='col-3'><span style={{fontSize:'60px',fontWeight:'600'}}>{averageRate}</span> </div> 
                                   <div className='col-6 Stars-mini-tab-rating' >{this.RatingStars(averageRate)}</div>
                                </div>
                                <div className='row'>
                                        <p id='rating-perceentage-para'>{reromendedpercent} % of reviews recommend this product</p>
                                </div>
                                <div className='row'>
                                    <button type="button" className="btn btn-link Start-button-rating-tab">5 stars </button><div className='Stars-percentage-bar' style={{background: "linear-gradient(90deg,#525252 "+percentfive+"%, #EBEBEB "+percentfive+"%)"}} ></div>
                                </div>
                                <div className='row'>
                                    <button type="button" className="btn btn-link Start-button-rating-tab">4 stars </button><div className='Stars-percentage-bar' style={{background: "linear-gradient(90deg,#525252 "+percentfour+"%, #EBEBEB "+percentfour+"%)"}} ></div>
                                </div>
                                <div className='row'>
                                    <button type="button" className="btn btn-link Start-button-rating-tab">3 stars </button><div className='Stars-percentage-bar' style={{background: "linear-gradient(90deg,#525252 "+percentthree+"%, #EBEBEB "+percentthree+"%)"}} ></div>
                                </div>
                                <div className='row'>
                                    <button type="button" className="btn btn-link Start-button-rating-tab">2 stars </button><div className='Stars-percentage-bar' style={{background: "linear-gradient(90deg,#525252 "+percenttwo+"%, #EBEBEB "+percenttwo+"%)"}} ></div>
                                </div>
                                <div className='row'>
                                    <button type="button" className="btn btn-link Start-button-rating-tab">1 stars </button><div className='Stars-percentage-bar' style={{background: "linear-gradient(90deg,#525252 "+percentone+"%, #EBEBEB "+percentone+"%)"}} ></div>
                                </div>
                                {(charachts.Size != undefined && charachts.Size.value != null) ? <div>
                                <div className='row size-cursor-rate'>
                                    Size
                                    </div>
                                    <div className='row'>
                                    <span className='bar-for-cursor'></span><div className='bar-for-cursor'></div><div className='bar-for-cursor'></div>

                                    </div>
                                    <div className='row size-scrollar-bar-container'>
                                    <span id='down-sort-size' style={{marginLeft:(Number(charachts.Size.value)/5)*90+'%'}}>
                                        <i className="fa fa-sort-down"></i>
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
                                </div>:''}

                                {(charachts.Quality != undefined && charachts.Quality.value != null ) ? <div>
                                <div className='row size-cursor-rate'>
                                     Quality
                                    </div>
                                    <div className='row'>
                                    <span className='bar-for-cursor'></span><div className='bar-for-cursor'></div><div className='bar-for-cursor'></div>

                                    </div>
                                    <div className='row size-scrollar-bar-container'>
                                    <span id='down-sort-size' style={{marginLeft:(Number(charachts.Quality.value)/5)*90+'%'}}>
                                        <i className="fa fa-sort-down"></i>
                                        </span>
                                        <div className='col'>
                                             <span className='size-caract-font' style={{marginLeft:'-8px'}}>Poor</span>
                                        </div>
                                        <div className='col'>
                                            <span className='size-caract-font'  style={{marginLeft:'-18px'}}>What I expected</span>
                                        </div>
                                        <div className='col'>
                                            <span className='size-caract-font' style={{marginLeft:'10px'}}>Perfect</span>
                                        </div>
                                    
                                    
                                    </div>
                                </div>:''}
                                {(charachts.Width != undefined && charachts.Width.value != null ) ? <div>
                                <div className='row size-cursor-rate'>
                                        Width
                                    </div>
                                    <div className='row'>
                                    <span className='bar-for-cursor'></span><div className='bar-for-cursor'></div><div className='bar-for-cursor'></div>

                                    </div>
                                    <div className='row size-scrollar-bar-container'>
                                    <span id='down-sort-size' style={{marginLeft:(Number(charachts.Width.value)/5)*90+'%'}}>
                                        <i className="fa fa-sort-down"></i>
                                        </span>
                                        <div className='col'>
                                             <span className='size-caract-font' style={{marginLeft:'-8px'}}>Too narrow</span>
                                        </div>
                                        <div className='col'>
                                            <span className='size-caract-font'  >Perfect</span>
                                        </div>
                                        <div className='col'>
                                            <span className='size-caract-font' style={{marginLeft:'10px'}}>Too wide</span>
                                        </div>
                                    
                                    
                                    </div>
                                </div>:''}
                                {(charachts.Comfort != undefined && charachts.Comfort.value != null) ? <div>
                                <div className='row size-cursor-rate'>
                                    Comfort
                                    </div>
                                    <div className='row'>
                                    <span className='bar-for-cursor'></span><div className='bar-for-cursor'></div><div className='bar-for-cursor'></div>

                                    </div>
                                    <div className='row size-scrollar-bar-container' >
                                    <span id='down-sort-size' style={{marginLeft:(Number(charachts.Comfort.value)/5)*90+'%'}} >
                                        <i className="fa fa-sort-down"></i>
                                        </span>
                                        <div className='col'>
                                             <span className='size-caract-font' style={{marginLeft:'-8px'}}>Uncomfortable</span>
                                        </div>
                                        <div className='col'>
                                            <span className='size-caract-font'  >OK</span>
                                        </div>
                                        <div className='col'>
                                            <span className='size-caract-font' style={{marginLeft:'10px'}}>Perfect</span>
                                        </div>
                                    
                                    
                                    </div>
                                </div>:''}
                                {(charachts.Length != undefined && charachts.Length.value != null ) ? <div>
                                <div className='row size-cursor-rate'>
                                        Length
                                    </div>
                                    <div className='row'>
                                    <span className='bar-for-cursor'></span><div className='bar-for-cursor'></div><div className='bar-for-cursor'></div>

                                    </div>
                                    <div className='row size-scrollar-bar-container'>
                                    <span id='down-sort-size' style={{marginLeft:(Number(charachts.Length.value)/5)*90+'%'}} >
                                        <i className="fa fa-sort-down"></i>
                                        </span>
                                        <div className='col'>
                                             <span className='size-caract-font' style={{marginLeft:'-8px'}}>Runs Short</span>
                                        </div>
                                        <div className='col'>
                                            <span className='size-caract-font'  >Perfect</span>
                                        </div>
                                        <div className='col'>
                                            <span className='size-caract-font' style={{marginLeft:'10px'}}>Runs long</span>
                                        </div>
                                    
                                    
                                    </div>
                                </div>:''}
                                {(charachts.Fit != undefined && charachts.Fit.value != null ) ? <div>
                                <div className='row size-cursor-rate'>
                                Fit
                                    </div>
                                    <div className='row'>
                                    <span className='bar-for-cursor'></span><div className='bar-for-cursor'></div><div className='bar-for-cursor'></div>

                                    </div>
                                    <div className='row size-scrollar-bar-container'>
                                    <span id='down-sort-size' style={{marginLeft:(Number(charachts.Fit.value)/5)*90+'%'}}  >
                                        <i className="fa fa-sort-down"></i>
                                        </span>
                                        <div className='col'>
                                             <span className='size-caract-font' style={{marginLeft:'-8px'}}>Runs tight</span>
                                        </div>
                                        <div className='col'>
                                            <span className='size-caract-font'  >Perfect</span>
                                        </div>
                                        <div className='col'>
                                            <span className='size-caract-font' style={{marginLeft:'10px'}}>Runs long</span>
                                        </div>
                                    
                                    
                                    </div>
                                </div>:''}
                                </div>
                            </div>
                            <div className="col">
                                    <div className='row Reviews-tab'>
                                        <p className='reviews-tab-title'>{reviews.length} reviews, Sorted By Relevence</p>
                                        {(ReviewsNumber >2)? <div className='box box-two'>
                                        {reviews.map((e,i)=> (i<ReviewsNumber) ? <Review key={i} review = {e} RatingStars={this.RatingStars} /> : '' )}
                                        </div>:reviews.map((e,i)=> (i<ReviewsNumber) ? <Review key={i} review = {e} RatingStars={this.RatingStars} /> : '' )}
                                        
                                        
                                    </div>
                                    <div className='row reviews-buttons-space'>
                                       {(reviews.length > ReviewsNumber) ?<button className='review-buttons-type' onClick={()=>this.setState({ReviewsNumber:ReviewsNumber+2})}>More Reviews</button> : ''}
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