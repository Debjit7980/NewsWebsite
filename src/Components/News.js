import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import '../components.css';
import InfiniteScroll from "react-infinite-scroll-component";




export class News extends Component {
  static defaultProps = {
    category: 'general',
    country: 'in',
    pageSize: 6
  }

  static propTypes = {
    category: PropTypes.string,
    country: PropTypes.string,
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      totalResults: 0

    }
    document.title = `NewsMonkey-${this.capitalizeFirstLetter(this.props.category)}`;
  }
  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ee2977e5b3ee4d79a9b61ac3d2ca2626&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews()

  }
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ee2977e5b3ee4d79a9b61ac3d2ca2626&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults });
    this.props.setProgress(100);
  }

  render() {
    return (
      <>
        <h2 className="heading text-center">NewsMonkey-Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
        <br />


        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
        >

          <div className='container'>
            <div className='row'>
              {this.state.articles.map((element) => {
                return <div className='col-md-4' key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 58) : ""} description={element.description ? element.description.slice(0, 80) : ""} imgUrl={!element.urlToImage ? "https://media.istockphoto.com/id/1145179413/vector/red-ribbon-with-the-inscription-new-vector-illustration.jpg?s=612x612&w=0&k=20&c=2PHF1pw-BFu8NEHnPQFYYrPWtSXzDO9zWd8z2nQCm0w=" : element.urlToImage}
                    newsUrl={element.url}
                    author={element.author ? element.author : "Unknown"} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    )
  }
}

export default News