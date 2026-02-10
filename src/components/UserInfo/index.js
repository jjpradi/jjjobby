import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

class UserInfo extends Component {
  state = {profileDetails: {}, isLoading: true}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch('https://apis.ccbp.in/profile', options)

    const data = await response.json()

    console.log(data)

    const newData = data.profile_details

    const profileDetails = {
      name: newData.name,

      profileImageUrl: newData.profile_image_url,
      shortBio: newData.short_bio,
    }

    this.setState({
      profileDetails,
      isLoading: false,
    })
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#000000" height="34" width="45" />
    </div>
  )

  render() {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails

    const {isLoading} = this.state

    return (
      <div className="profile-card">
        {isLoading ? (
          this.renderLoader()
        ) : (
          <div className="user-info">
            <img alt="profile" src={profileImageUrl} />

            <h1>{name}</h1>

            <p>{shortBio}</p>
          </div>
        )}
      </div>
    )
  }
}

export default UserInfo
