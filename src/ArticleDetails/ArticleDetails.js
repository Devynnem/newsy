import './ArticleDetails.css';
import noImage from '../noImage.png'


export function formatReadableDate(isoDate) {
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
          {image ? (
            <img className='image' src={image} alt="Article Image"/>
          ) : (
          <img className="no-card-img" src={noImage} alt="no image" />
          )}
      </span>
    </div>
  )
}


export default ArticleDetails;