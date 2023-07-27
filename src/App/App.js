import React, { useEffect, useState } from 'react';
import '../ArticleCards/ArticleCards'
import './App.css';
import ArticleCards from '../ArticleCards/ArticleCards';
import Search from '../Search/Search';
import { Routes, Route, Link } from 'react-router-dom';
import SingleArticle from '../SingleArticle/SingleArticle';

function App() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState({});
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
  };

  const resetResults = (event) => {
    setFilteredArticle([])
    setArticles(initialArticles)
  };

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
      setArticles(thisData);
      setInitialArticles(thisData);
    } catch (error) {
      throw new Error(`${error.status}`)
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  const handleArticleClick = (index) => {
    const article = articles[index];
    setSelectedArticle(article);
  };

  const handleSearch = (searchValue) => {
    if (searchValue.trim() !== "") {
      const searchResultsData = searchResults(searchValue);
      setFilteredArticle(searchResultsData);
      setShowNoResultsMessage(searchResultsData.length === 0);
      if (searchResultsData.length === 0) {
        setTimeout(() => {
          setShowNoResultsMessage(false);
        }, 3000);
      }
    } else {
      setFilteredArticle(initialArticles);
      setShowNoResultsMessage(false);
    }
  };

  return (
    <main className='app'>
      <Link to="/" style={{ textDecoration: 'none', color: "#2f2f2f" }} className='header-link'>
        <h1 className='header'>📰 Newsy☕️</h1>
      </Link>
      <Search search={handleSearch} reset={resetResults} />
      {showNoResultsMessage && <p className='no-results'>Sorry, no results found!</p>}
      <Routes>
        <Route path="/" element={<ArticleCards articles={filteredArticle.length > 0 ? filteredArticle : articles} onArticleClick={handleArticleClick} />} />
        <Route path="/articles/:index" element={selectedArticle ? <SingleArticle article={selectedArticle} /> : null} />
      </Routes>
    </main>
  );
};


export default App;
