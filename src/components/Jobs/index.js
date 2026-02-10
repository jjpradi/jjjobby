import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {Component} from 'react'
import JobItem from '../JobItem'
import './index.css'
import UserInfo from '../UserInfo'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiConstatnt = {
  initial: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const locationList = ['Hyderabad', 'Bangalore', 'Chennai', 'Delhi', 'Mumbai']
class Jobs extends Component {
  state = {
    allJobs: [],
    jobsList: [],
    profileDetails: {},
    activeSalary: '',
    activeType: [],
    searchInput: '',

    apiStatus: apiConstatnt.initial,

    typeArray: [],
    salaryArray: [],
    isLoading: true,

    activeLocation: [],
  }

  componentDidMount() {
    this.getJobs()
  }

  failureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>

      <button onClick={this.onRetry}>Retry</button>
    </div>
  )

  onRetry = () => {
    this.getJobs()
  }

  getFilteredData = data => {
    console.log(data)

    return data.jobs.map(e => ({
      companyLogoUrl: e.company_logo_url,
      employmentType: e.employment_type,
      id: e.id,

      jobDescription: e.job_description,

      location: e.location,
      packagePerAnnum: e.package_per_annum,
      rating: e.rating,
      title: e.title,
    }))
  }

  successData = (data, data2) => {
    const filteredData = this.getFilteredData(data)

    const filteredData2 = this.getFilteredData(data2)

    this.setState({
      jobsList: filteredData,

      isLoading: false,
      allJobs: filteredData2,
    })
  }

  getJobs = async () => {
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const options = {
      method: 'GET',

      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const {activeSalary, searchInput, activeType, activeLocation} = this.state

    console.log(activeType)

    const response = await fetch(
      `https://apis.ccbp.in/jobs?minimum_package=${activeSalary}&search=${searchInput}&employment_type=${activeType}`,

      options,
    )

    const response2 = await fetch('https://apis.ccbp.in/jobs', options)

    const data2 = await response2.json()

    console.log(response)

    const data = await response.json()

    console.log(data)

    if (response.ok === true) {
      this.setState({
        apiStatus: apiConstatnt.success,
      })

      this.successData(data, data2)
    } else {
      this.setState({
        apiStatus: apiConstatnt.failure,
      })
    }
  }

  onName = event => {
    console.log(event.target.value)

    this.setState(
      {
        searchInput: event.target.value,
      },
      this.getJobs,
    )
  }

  onSalary = event => {
    console.log(event.target.id)

    this.setState(
      {
        activeSalary: event.target.id,
      },
      this.getJobs,
    )
  }

  onClear = () => {
    this.setState(
      {
        activeType: [],
        activeSalary: '',
        searchInput: '',
        typeArray: [],
        activeLocation: '',
      },
      this.getJobs,
    )
  }

  onType = event => {
    const {activeType, typeArray} = this.state

    console.log(event)
    console.log(typeArray)
    console.log(event.target.checked)

    if (event.target.checked) {
      this.setState(
        prevState => ({
          typeArray: [...prevState.typeArray, event.target.id],
        }),
        this.getFilter,
      )
    } else {
      console.log(event.target.checked)

      this.setState(
        prevState => ({
          typeArray: [
            ...prevState.typeArray.filter(e => e !== event.target.id),
          ],
        }),
        this.getFilter,
      )
    }
  }

  onLocation = event => {
    console.log(event.target)
    console.log(event.target.value)

    const {allJobs, jobsList} = this.state

    console.log(allJobs)
    console.log(jobsList)
    console.log(event)
    if (event.target.checked) {
      this.setState(
        prevState => ({
          activeLocation: [...prevState.activeLocation, event.target.value],
        }),
        this.getFilteredView,
      )
    } else {
      this.setState(
        prevState => ({
          activeLocation: [
            ...prevState.activeLocation.filter(e => e !== event.target.value),
          ],
        }),
        this.getFilteredView,
      )
    }
  }

  getFilteredView = () => {
    const {jobsList, activeLocation, allJobs} = this.state
    let filtered
    console.log(activeLocation)
    if (activeLocation.length === 0) {
      filtered = allJobs
    } else {
      filtered = allJobs.filter(e => activeLocation.includes(e.location))
    }
    this.setState({
      jobsList: filtered,
    })
  }

  getFilter = () => {
    const {typeArray} = this.state
    console.log(typeArray.join(','))
    this.setState(
      {
        activeType: typeArray.join(','),
      },
      this.getJobs,
    )
  }

  render() {
    const {
      jobsList,
      searchInput,
      isLoading,
      activeLocation,
      apiStatus,
      activeType,
      activeSalary,
      typeArray,
    } = this.state
    console.log(employmentTypesList, salaryRangesList)

    return (
      <div className="job-page">
        <div className="filters">
          <div>
            <UserInfo />
            <hr style={{color: '#ffffff'}} />
          </div>
          <div>
            <h1> Type of Employment</h1>

            <ul onChange={e => this.onType(e)}>
              {employmentTypesList.map(e => (
                <li>
                  <input
                    checked={typeArray.includes(e.employmentTypeId)}
                    id={e.employmentTypeId}
                    type="checkbox"
                  />

                  <label htmlFor={e.employmentTypeId}>{e.label}</label>
                </li>
              ))}
            </ul>
            <hr style={{color: '#ffffff'}} />
          </div>

          <div>
            <h1>Salary Range</h1>

            <ul>
              {salaryRangesList.map(e => (
                <li>
                  <input
                    onClick={this.onSalary}
                    id={e.salaryRangeId}
                    type="radio"
                    checked={activeSalary === e.salaryRangeId}
                    value={e}
                  />

                  <label htmlFor={e.salaryRangeId}>{e.label}</label>
                </li>
              ))}
            </ul>
            <hr style={{color: '#ffffff'}} />
          </div>

          <div>
            <h1>Location</h1>

            <ul onChange={e => this.onLocation(e)}>
              {locationList.map(e => (
                <li>
                  <input
                    onChange={this.onLocation}
                    checked={activeLocation.includes(e)}
                    id={e}
                    type="checkbox"
                    value={e}
                  />
                  <label name={e} htmlFor={e}>
                    {e}
                  </label>
                </li>
              ))}
            </ul>
            <hr style={{color: '#ffffff'}} />
          </div>

          <div className="clear-btn">
            <button onClick={this.onClear}>Clear All</button>
          </div>
        </div>

        <div className="job-list">
          <div className="search-box">
            <input
              className="search-input"
              value={searchInput}
              onChange={this.onName}
              type="search"
              placeholder="Search"
            />

            <button data-testid="searchButton">Search</button>
          </div>
          <div>
            {jobsList.length === 0 && (
              <div className="no-job-container">
                <img
                  alt="no jobs"
                  src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                />

                <h1>No Jobs Found</h1>
                <p>We could not find any jobs.Try other filters</p>
              </div>
            )}

            {isLoading ? (
              <div data-testid="Loader" className="loader-container">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="54"
                  width="76"
                />
              </div>
            ) : (
              <ul className="list">
                {jobsList.map(e => (
                  <JobItem item={e} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
