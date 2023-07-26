import './ArticleDetails.css';

function formatReadableDate(isoDate) {
  const date = new Date(isoDate);

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  };

  return date.toLocaleString(undefined, options);
}

function ArticleDetails({ title, image, date, description }) {
  const formattedDate = formatReadableDate(date);

  return(
    <div className='card'>
      <h3>{title}</h3>
      <p>{formattedDate}</p>
      <p>{description}</p>
      <span>
        <img className='image' src={image} alt="Article Image"/>
      </span>
    </div>
  )
}


export default ArticleDetails;