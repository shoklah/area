import { connect } from 'react-redux';
import HomeComponent from '../components/Home';

const mapStateToProps = state => ({

});

const mapDispatchToProps = (dispatch, ownProps) => ({
});

const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);

export default Home;