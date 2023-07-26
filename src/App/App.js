import React, { useEffect, useState } from 'react';
import { mockData } from '../mockData';
import '../ArticleCards/ArticleCards'
import './App.css';
import ArticleCards from '../ArticleCards/ArticleCards';
import Search from '../Search/Search';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  const [articles, setArticles] = useState([]);
  const [singleArticle, setSingleArticle] = useState({});
  const [initialArticles, setInitialArticles] = useState([]);
  const [filteredArticle, setFilteredArticle] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
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
    event.preventDefault()
    setFilteredArticle([])
    setArticles(initialArticles)
    console.log(articles, "articles")
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

  // const handleSearch = (searchValue) => {
  //   setFilteredArticle(searchResults(searchValue));
  //   setShowNoResultsMessage(searchValue.trim() !== '' && filteredArticle.length === 0);
  // }

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
      <h1 className='header'>Newsy</h1>
      <Search search={handleSearch} reset={resetResults}/>
        {showNoResultsMessage && <p>Sorry, no results found!</p>}
        {/* <Link to="/articles">Show all articles</Link> */}
        {filteredArticle.length > 0 ? (
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ArticleCards articles={filteredArticle} />
              </>
            }
          />
          <Route path="/articles" element={<ArticleCards articles={articles} />} />
        </Routes>
      ) : articles.length > 0 ? (
        <ArticleCards articles={articles} />
      ) : (
        <p>Loading Articles...</p>
      )}
    </main>
  )
}


export default App;
