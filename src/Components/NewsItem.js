import React, { Component } from 'react'
import '../components.css';


export class NewsItem extends Component {
    render() {
        let { title, description, imgUrl, newsUrl, author, date,source } = this.props;
        return (
            <div>
                <div className="card" id="newsitem">
                    <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}}>
                        <span className="badge rounded-pill bg-info">{source}</span>
                    </div>
                    <img src={imgUrl} className="card-img-top" alt="..." id="pic" />
                    <div className="card-body">
                        
                            <h5 className="card-title">{title}...</h5>
                            <p className="card-text">{description}...</p>
                            <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
                            <a href={newsUrl} target="black" className="btn btn-dark" id="read">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem