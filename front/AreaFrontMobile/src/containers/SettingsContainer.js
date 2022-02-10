import { connect } from 'react-redux';
import SettingsComponent from '../components/Settings';

const mapStateToProps = state => ({

});

const mapDispatchToProps = (dispatch, ownProps) => ({
});

const Settings = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsComponent);

export default Settings;