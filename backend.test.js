/* These tests can be run by giving the "test" attribute 
in the package.json the value of "jest backend.test.js". */

const backend = require('./backend')

it('should load data', async () => {
    expect.assertions(1);
    const data = await backend.addressToLocation();
    expect(data).toBeDefined();
});