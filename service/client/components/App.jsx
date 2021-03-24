import React from 'react'
import Reviews from './Reviews.jsx';

class App extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <Reviews />
            </div>
        )
    }
}

export default App;