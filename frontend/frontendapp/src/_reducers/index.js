import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { favourite } from './favourite.reducer';
import { gists } from './gists.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  favourite,
  gists
});

export default rootReducer;