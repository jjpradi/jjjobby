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
class Jobs extends Component {
  state = {
    jobsList: [],
    profileDetails: {},
    activeSalary: '',
    activeType: [],
    searchInput: '',
    isLoading: true,
    typeArray: [],
    salaryArray: [],
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const options = {
      method: 'GET',

      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const {activeSalary, searchInput, activeType} = this.state

    console.log(activeType)

    const response = await fetch(
      `https://apis.ccbp.in/jobs?minimum_package=${activeSalary}&search=${searchInput}&employment_type=${activeType}`,
      options,
    )

    console.log(response)
    const data = await response.json()

    const filteredData = data.jobs.map(e => ({
      companyLogoUrl: e.company_logo_url,
      employmentType: e.employment_type,
      id: e.id,

      jobDescription: e.job_description,

      location: e.location,
      packagePerAnnum: e.package_per_annum,
      rating: e.rating,
      title: e.title,
    }))

    this.setState({
      jobsList: filteredData,

      isLoading: false,
    })
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
        activeType: '',
        activeSalary: '',
        searchInput: '',
      },
      this.getJobs,
    )
  }

  onType = event => {
    const {activeType} = this.state
    console.log(event)
    console.log(event.target)

    if (event.target.checked) {
      this.setState(
        prevState => ({
          typeArray: [...prevState.typeArray, event.target.id],
        }),
        this.getFilter,
      )
    }
  }

  onLocation = event => {
    console.log(event.target)
    console.log(event.target.value)
    const {jobsList} = this.state

    console.log(jobsList)
    const filtered = jobsList.filter(e => e.location === event.target.value)
    console.log(filtered)
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
    const {jobsList, searchInput, isLoading} = this.state
    console.log(employmentTypesList, salaryRangesList)

    return (
      <div className="job-page">
        <div className="filters">
          <UserInfo />

          <div>
            <h1>Type of Employment</h1>

            <ul onChange={e => this.onType(e)}>
              {employmentTypesList.map(e => (
                <li>
                  <input id={e.employmentTypeId} type="checkbox" />

                  <label htmlFor={e.employmentTypeId}>{e.label}</label>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h1>Salary Range</h1>

            <ul>
              {salaryRangesList.map(e => (
                <li>
                  <input
                    onClick={this.onSalary}
                    id={e.salaryRangeId}
                    type="checkbox"
                  />

                  <label htmlFor={e.salaryRangeId}>{e.label}</label>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h1>Location</h1>

            <ul onChange={e => this.onLocation(e)}>
              <input id="Hyderabad" type="radio" value="Hyderabad" />
              <label htmlFor="Hyderabad">Hyderabad</label>
              <input id="Bangalore" value="Bangalore" type="radio" />
              <label value="Bangalore" htmlFor="Bangalore">
                Bangalore
              </label>
              <input value="Chennai" id="Chennai" type="radio" />
              <label htmlFor="Chennai" value="Chennai">
                Chennai
              </label>
              <input value="Delhi" id="Delhi" type="radio" />
              <label htmlFor="Delhi">Delhi</label>
              <input id="Mumbai" value="Mumbai" type="radio" />
              <label htmlFor="Mumbai">Mumbai</label>
            </ul>
          </div>

          <button onClick={this.onClear}>Clear All</button>
        </div>

        <div className="job-list">
          <div>
            <input value={searchInput} onChange={this.onName} type="search" />
          </div>

          {isLoading ? (
            <div data-testid="Loader" className="loader-container">
              <Loader type="ThreeDots" color="#000000" height="54" width="76" />
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
    )
  }
}

export default Jobs
