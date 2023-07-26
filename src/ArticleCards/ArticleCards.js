import ArticleDetails from '../ArticleDetails/ArticleDetails';
import './ArticleCards.css';
import { NavLink } from 'react-router-dom';

function ArticleCards({ articles }) {
  const articleDetails = articles.map((article, index) => {
    return (
      <div>
        <NavLink key={index} to={`/article/${index}`}></NavLink>
        <ArticleDetails 
        image={article.urlToImage}
        title={article.title}
        date={article.publishedAt}
        description={article.description}
        id={article.source.id}
        key={index}
        />
      </div>
    )

  })
  return (
    <div className='articles-container'>
        {articleDetails}
    </div>
  )
}




export default ArticleCards;