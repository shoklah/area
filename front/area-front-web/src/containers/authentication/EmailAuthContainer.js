import { connect } from 'react-redux'
import { signIn } from '../../actions';
import EmailAuthComponent from '../../components/authentication/EmailAuth';

const mapStateToProps = state => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSignIn: (email, password) => {
        let firebaseData = ownProps.onSubmit(email, password)
        dispatch(signIn(firebaseData))
    }
})

const EmailAuthContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailAuthComponent)

export default EmailAuthContainer