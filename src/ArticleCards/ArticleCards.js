import ArticleDetails from '../ArticleDetails/ArticleDetails';
import './ArticleCards.css';

function ArticleCards({ articles }) {
  // console.log(articles[0].author, "line four cards")
  const articleDetails = articles.map(article => {
    return (
      <ArticleDetails 
        image={article.urlToImage}
        title={article.title}
        date={article.publishedAt}
        description={article.description}
        id={article.source.id}
        key={article.title}
      />
    )

  })
  return (
    <div className='articles-container'>
      {articleDetails}
    </div>
  )
}




export default ArticleCards;