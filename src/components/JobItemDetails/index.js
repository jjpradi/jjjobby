import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'
import SimilarJobs from '../SimilarJobs'

class JobItemDetails extends Component {
  state = {jobDetails: {}, similarJobs: [], skillSet: [], lifeAtCompany: {}}

  componentDidMount() {
    this.getJobDetails()

    console.log('gg')
  }

  onVisit = () => {
    const {jobDetails} = this.state

    console.log(jobDetails)

    const {companyWebsiteUrl} = jobDetails

    console.log(companyWebsiteUrl)

    const {history} = this.props

    return <Redirect to="/" />
  }

  getJobDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const {match} = this.props
    const {id} = match.params

    const options = {
      method: 'GET',

      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
    const data = await response.json()

    console.log(data)
    const jd = data.job_details

    const filteredJobDetails = {
      companyLogoUrl: jd.company_logo_url,

      companyWebsiteUrl: jd.company_website_url,

      employmentType: jd.employment_type,
      id: jd.id,

      jobDescription: jd.job_description,
      location: jd.location,

      packagePerAnnum: jd.package_per_annum,
      rating: jd.rating,
    }

    console.log(filteredJobDetails)

    const filteredSkills = data.job_details.skills.map(e => ({
      imageUrl: e.image_url,
      name: e.name,
    }))

    console.log(filteredSkills)
    const ee = data.job_details.life_at_company
    const filteredLife = {
      description: ee.description,

      imageUrl: ee.image_url,
    }

    console.log(filteredLife)

    const filteredSimilarJobs = data.similar_jobs.map(e => ({
      companyLogoUrl: e.company_logo_url,
      employmenntType: e.employment_type,

      id: e.id,
      jobDescription: e.job_description,

      location: e.location,

      rating: e.rating,

      title: e.title,
    }))

    console.log(filteredSimilarJobs)

    this.setState({
      skillSet: filteredSkills,
      jobDetails: filteredJobDetails,

      similarJobs: filteredSimilarJobs,
      lifeAtCompany: filteredLife,
    })
  }

  renderDetails = () => {
    const {jobDetails, skillSet, similarJobs, lifeAtCompany} = this.state
    const {
      companyLogoUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails
    return (
      <div>
        <div className="">
          <div className="info-1">
            {' '}
            <img className="img" src={companyLogoUrl} />
            <div className="first">
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

          <div>
            <div>
              <h1>Description</h1>
              <p>{jobDescription}</p>
            </div>

            <p onClick={this.onVisit}>Visit</p>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {skillSet, lifeAtCompany, similarJobs} = this.state

    return (
      <div className="job-details-page">
        <div className="job-details-card">
          <div>{this.renderDetails()}</div>

          <div className="skill-set">
            <ul className="skill-list">
              {skillSet.map(e => (
                <li className="skill-item">
                  <img src={e.imageUrl} />
                  <p>{e.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div>
              <h1>Life at Company</h1>

              <p>{lifeAtCompany.description}</p>
            </div>
            <img src={lifeAtCompany.imageUrl} />
          </div>

          <div>
            <h1>Similar Jobs</h1>

            <ul className="similar-job-details">
              {similarJobs.map(e => (
                <SimilarJobs item={e} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default JobItemDetails
