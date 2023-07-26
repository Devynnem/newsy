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
  const fetchAllArticles = async () => {
    return fetch("https://newsapi.org/v2/everything?q=apple&from=2023-07-25&to=2023-07-25&sortBy=popularity&apiKey=5c88a8ad462040739d32abd6ea2ff125")
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        throw new Error(response.message)
      }
    })
    .then(data => data)
    .catch(error => {
      throw new Error(error)
    })
  }

  const fetchData = async () => {
    try {
      const data = await fetchAllArticles();
      const thisData = data.articles.map(article => {
        return article
      })
      console.log(thisData)
      setArticles(thisData);
      setInitialArticles(thisData);
    } catch (error) {
      console.log(error, "fetch");
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

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
