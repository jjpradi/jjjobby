import './index.css'
import {Link} from 'react-router-dom'

const JobItem = props => {
  const {item} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = item

  return (
    <Link to={`/jobs/${id}`}>
      <li className="list-item">
        <div className=" ">
          <div className="info-1">
            {' '}
            <img className="img" src={companyLogoUrl} />
            <div>
              <h1>{title}</h1>

              <p>
                {' '}
                <img src="" /> {rating}{' '}
              </p>
            </div>
          </div>

          <div className="info-2">
            <div>
              <p>{location}</p>
              <p>{employmentType}</p>
            </div>
            <p>{packagePerAnnum}</p>
          </div>

          <br />
          <p>{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
