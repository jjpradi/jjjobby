import './index.css'

import {Link} from 'react-router-dom'

import {FaRegStar, FaSuitcase} from 'react-icons/fa'

import {IoLocationOutline} from 'react-icons/io5'

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
    <Link className="link-item" to={`/jobs/${id}`}>
      <li className="list-item">
        <div className="job-item">
          <div className="info-1">
            {' '}
            <img alt="company logo" className="img" src={companyLogoUrl} />
            <div>
              <h1>{title}</h1>

              <p>
                {' '}
                <FaRegStar className="star-logo" size={17} /> {rating}{' '}
              </p>
            </div>
          </div>

          <div className="info-2">
            <div className="info-2-1 ">
              <p>
                {' '}
                <IoLocationOutline size={15} /> {location}
              </p>
              <p>
                {' '}
                <FaSuitcase size={15} /> {employmentType}
              </p>
            </div>
            <p>{packagePerAnnum}</p>
          </div>

          <hr style={{color: '#ffffff'}} />
          <div>
            <h1>Description</h1>
            <p>{jobDescription}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
