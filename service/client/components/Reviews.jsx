import React from 'react'
import Review from "./review.jsx";
import $ from 'jquery'
import { prefix } from 'inline-style-prefixer'
import {token} from '../../../config'
import ReactStars from "react-rating-stars-component";

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
            charachts:{},
            photosNum:['0'],
            name:'',
            email:'',
            summary:'',
            body:'',
            rate:0,
            recommendThis:false,
            photos:['','',''],
            product_id:11007,
            err:''
        }
        this.ratingChanged = this.ratingChanged.bind(this)
    }
    sortChange(element){
        var  reviews = this.state.reviews
        if(element == 'date' || element == 'helpfulness'){
        for(var i=0;i<reviews.length;i++){
            var j=0;
            var search = true
            while(j<i && search == true){
                if(reviews[j][element] < reviews[i][element] ){
                    reviews.splice(j,0,reviews[i]);
                    reviews.splice(i+1,1)
                    search = false
                }
                j++;
            }
        }
       
        }else{
            
        for(var i=0;i<reviews.length;i++){
            var j=0;
            var search = true
            while(j<i && search == true){
                if(( reviews[j].date < reviews[i].date  && new Date(reviews[i].date) - new Date(reviews[j].date) < 3600 * 1000 * 24 * 90)  || reviews[j].helpfulness < reviews[i].helpfulness  ){
                    reviews.splice(j,0,reviews[i]);
                    reviews.splice(i+1,1)
                    search = false
                }
                j++;
            }
        }
        }
        this.setState({reviews:reviews})
        

    }
    Initialdata(){
        $.ajax({
            url:'https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews?product_id='+this.state.product_id,
            type:'GET',
            contentType:'application/json',
            headers:{"Authorization":token},
            success:(Data)=>{
                console.log(Data)
                this.setState({reviews:Data.results})          
                 
            }
        })
        $.ajax({
            url:'https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews/meta?product_id='+this.state.product_id,
            type:'GET',
            contentType:'application/json',
            headers:{"Authorization":token},
            success:(Meta)=>{                var CountReviews = Number(Meta.ratings[1]) + Number(Meta.ratings[2]) + Number(Meta.ratings[3]) + Number(Meta.ratings[4]) + Number(Meta.ratings[5])
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
    componentDidMount(){
        this.Initialdata()
        
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
<div key={i}
className="fa fa-star Colored-Star-rating" 
style={{backgroundImage: "linear-gradient(90deg,#525252 "+Number(e*100)+"%, white "+Number(e*100)+"%)",
BackgroundClip:'text',
TextFillColor:'transparent',
WebkitBackgroundClip: "text", 
WebkitTextFillColor: "transparent",
WebkitFillColor:'transparent'}}>
</div>)
                    }
                } )}
        </div>

        return Stars
    }

    ratingChanged(rate){
        this.setState({rate:rate})
    }
    RecomendValue(){
        this.setState({recommendThis: !this.state.recommendThis})
    }
    PostData (){
        const {product_id,name,email,summary,body,rate,recommendThis,photos} = this.state
        
        var Data = {
            product_id:product_id,
            name:name,
            email:email,
            recommend:recommendThis,
            summary:summary,
            rating:rate,
            photos:photos,
            body:body,
            characteristics:{}

        }
        console.log(Data)
        $.ajax({
            url:'https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews',
            type:'POST',
            data:JSON.stringify(Data),
            contentType:'application/json',
            headers:{"Authorization":token},
            success:(Data)=>{
                this.Initialdata()
                this.setState({err:'clear'}) 
                 
            },
            error:(err)=>{
                this.setState({err:'Recheck'}) 
            }
        })
    }
    render(){
        
        const {reviews,ReviewsNumber,averageRate,reromendedpercent,percentfive,percentfour,percentthree,percenttwo,percentone,charachts,photosNum,err} = this.state
        var alert=''
        if(err == 'Recheck'){
            alert=<div className="alert alert-danger" role="alert" > Recheck Your Entries </div>
        }else if(err=='clear'){
            alert=<div className="alert alert-success" role="alert" > Review Submited</div>
        }
        return(
            <div className="container">
                <h2 style={{fontSize:'20px',fontWeight:'100'}}>Rating & Reviews</h2>
                <div id='Reviews-data-container'>
                <div className="row">
                            <div className="col col-xl-4">
                            <div id='Rating-tab-Reviews'>
                                <div className='row'>
                                   <div className='col-3'><span style={{fontSize:'70px',fontWeight:'600',marginLeft:'100%'}}>{averageRate}</span> </div> 
                                   <div className='col-md-6 Stars-mini-tab-rating' >{this.RatingStars(averageRate)}</div>
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
                                        <p className='reviews-tab-title'>{reviews.length} reviews, Sorted By 
                                            <select onChange={(e)=>{this.sortChange(e.target.value)}} className="form-select Reviews-sot-select" aria-label="Default select example" >
                                                <option >Relevant </option>
                                                <option value='date' >Newest</option>
                                                <option value='helpfulness' >Helpful</option>
                                            </select>
                                            
                                        </p>
                                        {(ReviewsNumber >2)? <div className='box box-two'>
                                        {reviews.map((e,i)=> (i<ReviewsNumber) ? <Review key={i} review = {e} RatingStars={this.RatingStars} /> : '' )}
                                        </div>:reviews.map((e,i)=> (i<ReviewsNumber) ? <Review key={i} review = {e} RatingStars={this.RatingStars} /> : '' )}
                                        
                                        
                                    </div>
                                    <div className='row reviews-buttons-space'>
                                       {(reviews.length > ReviewsNumber) ?<button className='review-buttons-type' onClick={()=>this.setState({ReviewsNumber:ReviewsNumber+2})}>More Reviews</button> : ''}
                                        <button className='review-buttons-type' data-toggle="modal" data-target="#AddReview" >Add A Review <span style={{marginLeft:'9px',fontSize:'22px'}}>+</span></button>
                                    </div>
                                    
                            </div>
                    </div>
                </div>
                <div className="modal fade" id="AddReview" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document" >
                            <div className="modal-content" >
                            <div className="modal-header" style={{margin:'auto'}}>
                                <h3 className="modal-title" id="exampleModalLabel">Write Your Review</h3><br />
                            </div>
                            <div className="modal-body">
                                    <div className='review-post-container'>

                                        <div className='Form-container '>
                                            <div className='container'>
                                                <div className='row'>
                                                <div className='col-sm'>
                                                <div className=" input-material">
                                                <input type="text" className="form-control" id="name-field" value={this.state.name} onChange={(e)=>this.setState({name:e.target.value})} required ></input>
                                                <label htmlFor="name-field">Name (*)</label>
                                            </div>

                                            <div className=" input-material">
                                                <input type="text" className="form-control" id="email-field" value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})}  ></input>
                                                <label htmlFor="email-field">Email</label>
                                            </div>

                                            <div className=" input-material">
                                                <input type="text" placeholder='Example: Best purchase ever!' className="form-control" id="summary-field" value={this.state.summary} onChange={(e)=>this.setState({summary:e.target.value})} required ></input>
                                                
                                            </div>


                                            <div className=" input-material">
                                                <textarea placeholder='Why did you like the product or not?' type="text" className="form-control" id="body-field" value={this.state.body} onChange={(e)=>this.setState({body:e.target.value})} required ></textarea>
                                                <p style={{fontSize:'11px',textAlign:'left'}}>Minimum required characters left: [{(this.state.body.length <50) ? 50 - this.state.body.length : ' Minimum reached '}]</p>
                                            </div>
                                            
                                                </div>
                                                <div className='col-sm'>
                                                <div className=" input-stars ">
                                                <ReactStars
                                                    count={5}
                                                    onChange={this.ratingChanged}
                                                    size={24}
                                                    isHalf={false}
                                                    emptyIcon={<i className="far fa-star"></i>}
                                                    fullIcon={<i className="fa fa-star"></i>}
                                                    activeColor="#f9ca24"
                                                />
                                                </div>

                                            <div className=" input-stars" style={{marginLeft:'-80px'}}>
                                                <div className="form-check" >
                                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"  onChange={()=>this.RecomendValue()}/>
                                                    <label className="form-check-label" htmlFor="flexCheckDefault" >
                                                        I recommend This Product
                                                    </label>
                                                </div>
                                            </div>
                                            <label htmlFor="photo-field" style={{marginTop:'20px'}}>Photos </label><button className='btn btn-secondary' type='button' style={{marginLeft:'10px',fontSize:'8px',marginTop:'28px'}} onClick={(e)=>{photosNum.push('0') ;if(photosNum.length<3) {this.setState({photosNum:photosNum})}  else{this.setState({photosNum:photosNum}) ; e.target.disabled = true}  }}>Add Photo</button>
                                            <div className=" input-photos" id="All-photos-review-div">
                                               {photosNum.map((e,i)=> <input key={i} style={{marginBottom:'10px',fontSize:'14px'}} type="text" className="form-control" id="photo-field" placeholder='photo Link' value={this.state.photos[i]} onChange={(e)=>{var photosSt = this.state.photos;photosSt[i] = e.target.value ;  this.setState({photos:photosSt})}} required ></input>)} 
                                                
                                            </div>


                                                </div>
                                            </div>
                                                </div>
                                               
                                            {alert}
                                        </div>

                                    </div>
                            </div>
                            <div className="modal-footer">
                                
                                <button type="button" className="btn btn-primary" style={{marginRight:'32%'}}  onClick={()=>this.PostData()}>Post Review</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" style={{float:'right'}}>Close</button>
                            </div>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

export default Reviews;