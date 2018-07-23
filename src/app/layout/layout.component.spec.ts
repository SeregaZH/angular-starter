import {LayoutComponent} from './layout.component';

const expect = chai.expect;
const moduleName = 'LayoutModule';
const componentName = 'LayoutComponent';

describe(`${moduleName}.${componentName} `, () => {
    it('should be created', () => {
        const component = new LayoutComponent();
        expect(component).not.to.be.undefined;
    })
});