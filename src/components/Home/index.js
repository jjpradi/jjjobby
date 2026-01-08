import './index.css'
import {Link} from 'react-router-dom'

const Home = () => (
  <div className="home">
    <h1>Find the Job That Fits Your Life</h1>

    <p>
      Milions of people are searching for jobs,salary information,company
      reviews.Find the job that fits your abities and Potential
    </p>

    <Link to="/jobs">
      {' '}
      <button>Find Now</button>
    </Link>
  </div>
)

export default Home
