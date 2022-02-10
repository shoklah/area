import { connect } from 'react-redux';
import HeaderComponent from '../components/Landing';

const mapStateToProps = state => ({

});

const mapDispatchToProps = (dispatch, ownProps) => ({
});

const Landing = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderComponent);

export default Landing;