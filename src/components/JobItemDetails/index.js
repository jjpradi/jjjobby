import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import './index.css'
import {FaRegStar, FaSuitcase} from 'react-icons/fa'
import {IoLocationOutline} from 'react-icons/io5'

import Loader from 'react-loader-spinner'
import SimilarJobs from '../SimilarJobs'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    skillSet: [],
    lifeAtCompany: {},
    isLoading: true,

    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()

    console.log('gg')
  }

  onVisit = () => {
    const {jobDetails} = this.state

    console.log(jobDetails)

    const {companyWebsiteUrl} = jobDetails

    console.log('website')
    console.log(companyWebsiteUrl)

    console.log('website')

    window.open(companyWebsiteUrl, '_blank')
  }

  reTry = () => {
    this.getJobDetails()
  }

  failureView = () => (
    <div>
      <h1>Oops! Something Went Wrong</h1>
      <img src="" alt="failure view" />
      <p>We cannot seem to find the page you are looking for</p>

      <button onClick={this.reTry}>Retry</button>
    </div>
  )

  successData = data => {
    const jd = data.job_details

    const filteredJobDetails = {
      companyLogoUrl: jd.company_logo_url,

      companyWebsiteUrl: jd.company_website_url,
      title: jd.title,
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

      employmentType: e.employment_type,

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
      isLoading: false,
    })
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

    if (response.ok === false) {
      this.setState({
        apiStatus: apiConstants.failure,
      })
    } else {
      this.setState({
        apiStatus: apiConstants.success,
      })

      this.successData(data)
    }
  }

  renderLoader = () => (
    <div data-testid="Loader" className="loader-container">
      <Loader type="ThreeDots" color="#000000" height="54" width="76" />
    </div>
  )

  renderDetails = () => {
    const {
      jobDetails,
      skillSet,
      similarJobs,
      lifeAtCompany,
      isLoading,
    } = this.state

    const {
      companyLogoUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      companyWebsiteUrl,
    } = jobDetails

    console.log(`title ${title}`)
    return (
      <div className="">
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
    )
  }

  renderResult = () => {
    const {skillSet, lifeAtCompany, similarJobs, jobDetails} = this.state
    console.log(jobDetails.companyWebsiteUrl)
    console.log(jobDetails.companyWebsiteUrl)

    return (
      <div className="job-details-page">
        <div className="job-details-card">
          <div>{this.renderDetails()}</div>

          <div className="skill-set">
            <hr style={{color: '#ffffff'}} />

            <h1>Skills</h1>
            <ul className="skill-list">
              {skillSet.map(e => (
                <li className="skill-item">
                  <img alt={e.name} src={e.imageUrl} />

                  <p className="skill-name">{e.name}</p>
                </li>
              ))}
            </ul>

            <hr style={{width: '100%', color: '#ffffff'}} />
          </div>
          <div className="life-at-company">
            <div>
              <h1>Life at Company</h1>
              <p>{lifeAtCompany.description}</p>

              <a
                href={jobDetails.companyWebsiteUrl}
                target="_blank"
                rel="noreferrer"
              >
                {' '}
                Visit
              </a>
            </div>
            <img
              className="life-img"
              alt="life at company"
              src={lifeAtCompany.imageUrl}
            />
          </div>
        </div>

        <div className="similar-list">
          <h1>Similar Jobs</h1>

          <ul className="similar-job-details">
            {similarJobs.map(e => (
              <SimilarJobs key={e.id} item={e} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'INITIAL':
        return this.renderLoader()

      case 'SUCCESS':
        return this.renderResult()
      case 'FAILURE':
        return this.failureView()

      default:
        return null
    }
  }
}

export default JobItemDetails
