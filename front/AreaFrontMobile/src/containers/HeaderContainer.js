import { connect } from 'react-redux';
import HeaderComponent from '../components/Header';

const mapStateToProps = state => ({

});

const mapDispatchToProps = (dispatch, ownProps) => ({
});

const Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderComponent);

export default Header;