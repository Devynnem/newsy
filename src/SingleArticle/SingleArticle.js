import './SingleArticle.css';
import React, {useState, useEffect} from 'react';
import { formatReadableDate } from '../ArticleDetails/ArticleDetails';
import noImage from '../noImage.png';


const SingleArticle = ({ article }) => {
  console.log(article.title, 'singleArticle')
  return (
    <div className='single-article'>
      <h2>{article.title}</h2>
      <p>{article.description}</p>
      <p>Published on: {formatReadableDate(article.publishedAt)}</p>
      <span>
          {article.urlToImage ? (
            <img className='single-image' src={article.urlToImage} alt="Article Image"/>
          ) : (
          <img className="no-card-img" src={noImage} alt="no image" />
          )}
      </span>
      <p>{article.content}</p>
      <a href={article.url} target='_blank' rel='noopener noreferrer'>
        Read more
      </a>
    </div>
  )
}




export default SingleArticle;