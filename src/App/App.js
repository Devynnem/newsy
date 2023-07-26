import React, { useEffect, useState } from 'react';
import { mockData } from '../mockData';
import '../ArticleCards/ArticleCards'
import './App.css';
import ArticleCards from '../ArticleCards/ArticleCards';
import Search from '../Search/Search';

function App() {
  const [articles, setArticles] = useState([]);
  const [singleArticle, setSingleArticle] = useState({});
  const [initialArticles, setInitialArticles] = useState([]);
  const [filteredArticle, setFilteredArticle] = useState([]);
  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);



  const searchResults = (searchValue) => {
    let lowerCaseSearchValue = searchValue.toLowerCase();
    return initialArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(lowerCaseSearchValue) ||
        article.description.toLowerCase().includes(lowerCaseSearchValue)
    );
  }

  const fetchData = () => {
    const thisData = mockData.articles.map(article => {
      return article
    })
    console.log(thisData)
    setArticles(thisData);
    setInitialArticles(thisData);
  }

  useEffect(() => {
    fetchData()
  }, []);

  // const handleSearch = (searchValue) => {
  //   const searchResultsData = searchResults(searchValue);
  //   setFilteredArticle(searchResultsData);
  //   if (searchResultsData.length === 0) {
  //     setArticles([]);
  //   }
  // };

  const handleSearch = (searchValue) => {
    const searchResultsData = searchResults(searchValue);
    setFilteredArticle(searchResultsData);
    setShowNoResultsMessage(searchValue.trim() !== "" && searchResultsData.length === 0);
  };

  return (
    <main className='app'>
      <h1 className='header'>Newsy</h1>
      <Search search={handleSearch} />
      {showNoResultsMessage && <p>Sorry, no results found!</p>}
      {filteredArticle.length > 0 ? (
        <ArticleCards articles={filteredArticle} />
      ) : (
        <ArticleCards articles={articles} />
      )}
    </main>
  )

}


export default App;
