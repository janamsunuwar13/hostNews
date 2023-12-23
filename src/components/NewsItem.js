import React, {Component} from 'react'

export class NewsItem extends Component{
    render() {
        let {title, description, imageUrl, newsUrl} = this.props;
        return(
            <div>
                <div className="card my-3" style={{width: "18rem"}}>
                    <img src= {imageUrl?imageUrl:"https://cdn.vox-cdn.com/thumbor/zCUZ308k3-5t-4co4I_I3j6n2ic=/0x0:2040x1360/1200x628/filters:focal(1020x680:1021x681)/cdn.vox-cdn.com/uploads/chorus_asset/file/24418649/STK114_Google_Chrome_02.jpg"} className = "card-image-top" alt="NoImage"/>
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <a href={newsUrl}  className="btn btn-sm btn-success">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
export default NewsItem