/**
 * Npm import
 */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
/**
 * Local import
 */
import Headline from 'src/components/Headline';
import Field from 'src/containers/Field';
import data from 'src/datas';

/**
 * Code
 */
class SignUp extends React.Component {
  static propTypes = {
    createAccount: PropTypes.func.isRequired,
  }
 handleSubmit = (evt) => {
   evt.preventDefault();
   this.props.createAccount();
 }

 render() {
   return (
     <div id="signup" className="box">
       <Headline data={data.signup} />
       <form className="form" onSubmit={this.handleSubmit}>
         {data.signup.fields.map(field => <Field key={field.name} {...field} />)}
         <button
           id="signup-submit"
           className={data.signup.submit.className}
         >
           {data.signup.submit.label}
         </button>
       </form>
       <Link
         to="/"
         className="cancel"
       >
        Annuler
       </Link>
     </div>
   );
 }
}

/**
* Export
*/
export default SignUp;
