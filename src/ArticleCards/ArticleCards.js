import ArticleDetails from '../ArticleDetails/ArticleDetails';
import './ArticleCards.css';
import { Link } from 'react-router-dom';

function ArticleCards({ articles, onArticleClick }) {
  const articleDetails = articles.map((article, index) => {
    return (
      <div>
        <Link to={`/articles/${index}`} style={{ textDecoration: 'none', color: "#2f2f2f" }} onClick={() => onArticleClick(index)}>
        <ArticleDetails 
        image={article.urlToImage}
        title={article.title}
        date={article.publishedAt}
        description={article.description}
        id={article.source.id}
        key={index}
        />
        </Link> 
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