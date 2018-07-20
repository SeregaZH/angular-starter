import {LayoutComponent} from './layout.component';

const expect = chai.expect;
const moduleName = 'HeaderModule';
const componentName = 'HelpComponent';

describe(`${moduleName}.${componentName} `, () => {
    it('should be created', () => {
        var component = new LayoutComponent();
        expect(component).not.to.be.undefined;
    })
});