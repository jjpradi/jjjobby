import {Component} from 'react'

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
      <li className="">
        <div>
          <img src={companyLogoUrl} />
          <div>
            <div>
              <img src="" />

              {rating}
            </div>
          </div>
        </div>

        <div>
          <h1>Description</h1>

          <p>{jobDescription}</p>
        </div>
      </li>
    )
  }
}

export default SimilarJobs
