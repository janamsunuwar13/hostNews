import React, {Component} from 'react'
import NewsItem from './NewsItem'
import CircleF from './CircleF'
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
        country : "in",
        pageSize: "6",
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    articles = []
    constructor(){
        super();
        console.log("this is constructor from news");
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1
        }
    }
    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=243efffac8da4284bb8456df7d9f67d1&page=1&pageSize=${this.props.pageSize}`
        this.setState ({loading : true})
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading : false});
    }
    handelPrevClick = async() => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=243efffac8da4284bb8456df7d9f67d1&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading : true})
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);

        this.setState({
            page: this.state.page -1,
            articles: parsedData.articles,
            loading : false
        });
    }

    handelNextClick = async() => {
        //logic for next page math.ceil roundup the output
        if(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)){
        }
        else{
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=243efffac8da4284bb8456df7d9f67d1&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        this.setState({loading : true})
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
            loading: false
        })
    }
    }
    render() {
        return(
            
                <div className= 'container my-3'>
                    <h1 className = "text-center" style={{margin:'35px'}}>NewsApp - Read a daily updated</h1>
                    {this.state.loading && <CircleF/>}
                    <div className= 'row' >
                       { !this.state.loading && this.state.articles.map((element)=> {
                           return <div className = "col-md-4" key = {element.url}>
                            <NewsItem title= {element.title?element.title.slice(0,40):"Not Given"} description={element.description?element.description.slice(0,80):"Discription Not given"} imageUrl = {element.urlToImage} newsUrl = {element.url}/>
                        </div>
                        })}


                    </div>
                    <div className="container d-flex justify-content-center" >
                    <button disabled = {this.state.page<=1} type="button" className="btn btn-success mx-4" onClick={this.handelPrevClick}>&larr; Previous</button>
                    <button disabled = {this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-success mx-4" onClick={this.handelNextClick}>  Next &rarr; </button>

                    </div>
                </div>
                
        
        )
    }
}
export default News