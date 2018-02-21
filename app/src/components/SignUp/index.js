/**
 * Npm import
 */
import React from 'react';
import { Link } from 'react-router-dom';
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
 handleSubmit = (evt) => {
   evt.preventDefault();
 }

 render() {
   return (
     <div id="signup">
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
         exact
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
