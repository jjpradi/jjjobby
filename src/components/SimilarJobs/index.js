import {Component} from 'react'
import './index.css'

import {Link} from 'react-router-dom'

class SimilarJobs extends Component {
  render() {
    const {item} = this.props

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
        <li className="similar-job-item">
          <div>
            <h1>{title}</h1>

            <img alt="similar job company logo" src={companyLogoUrl} />
            <div>
              <div>
                <p> rating: {rating}</p>
              </div>
            </div>
          </div>

          <div>
            <p>{location}</p>
            <h1>Description</h1>

            <p>{jobDescription}</p>
          </div>
        </li>
      </Link>
    )
  }
}

export default SimilarJobs
