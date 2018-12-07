/* These tests can be run by giving the "test" attribute in the 
package.json (root directory) the value of "cd client && npm run test". */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';

describe('<App />', () => {
  it('renders 1 <App /> component', () => {
    const component = shallow(<App />);
    expect(component).toHaveLength(1);
  });
});
jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({})
}));