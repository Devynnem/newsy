import './SingleArticle.css';
import React, {useState, useEffect} from 'react';
import { formatReadableDate } from '../ArticleDetails/ArticleDetails';


const SingleArticle = ({ article }) => {
  console.log(article.title, 'singleArticle')
  return (
    <div className='single-article'>
      <h2>{article.title}</h2>
      <p>{article.description}</p>
      <p>Published on: {formatReadableDate(article.publishedAt)}</p>
      <img src={article.urlToImage} alt='Article image' />
      <p>{article.content}</p>
      <a href={article.url} target='_blank' rel='noopener noreferrer'>
        Read more
      </a>
    </div>
  )
}




export default SingleArticle;