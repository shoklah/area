import { connect } from 'react-redux'
import { signIn } from '../../actions';
import EmailSignupComponent from '../../components/signup/EmailSignup';

const mapStateToProps = state => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSignUp: (email, password) => {
        let firebaseData = ownProps.onSubmit(email, password)
        dispatch(signIn(firebaseData))
    }
})

const EmailSignup = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailSignupComponent)

export default EmailSignup