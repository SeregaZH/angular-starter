import {PagingComponent} from './paging.component';
import { validateParameters } from './parameters-validation';

const expect = chai.expect;
const moduleName = 'SearchModule';
const componentName = 'ParameterValidationFunction';

declare type ValidationTestCase = {
    page?: number,
    itemPerPage?: number,
    total?: number,
    frameSize?: number,
    expectedMessage: string,
    testMessage: string
};

describe(`${moduleName}.${componentName} `, () => {

    let pagingComponent: PagingComponent;

    beforeEach(() => {
        pagingComponent = new PagingComponent(validateParameters);
    });

    let testCases: ValidationTestCase[] = [
        {
            page: 5,
            itemPerPage: 50,
            total: 50,
            frameSize: 4,
            expectedMessage: `Selected page 5 is invalid`,
            testMessage: 'if page number greater than total number of pages'
        },
        {
            page: -1,
            itemPerPage: 50,
            total: 50,
            frameSize: 4,
            expectedMessage: `Selected page -1 is invalid`,
            testMessage: 'if page is negative'
        },
        {
            page: 0,
            itemPerPage: -1,
            total: 50,
            frameSize: 4,
            expectedMessage: `Items per page can not be negative`,
            testMessage: 'if items per page count is negative'
        },
        {
            page: 0,
            itemPerPage: 10,
            total: -5,
            frameSize: 4,
            expectedMessage: `Total items can not be negative`,
            testMessage: 'if total items count is negative'
        },
        {
            page: 0,
            itemPerPage: 10,
            total: 10,
            frameSize: -4,
            expectedMessage: `Frame size can not be negative or 0`,
            testMessage: 'if frame size is negatives'
        },
        {
            page: 0,
            itemPerPage: 10,
            total: 10,
            frameSize: 0,
            expectedMessage: `Frame size can not be negative or 0`,
            testMessage: 'frame size is zero'
        }
    ];

    _.forEach(testCases,(testCase: ValidationTestCase) => {
        it(`should return error ${testCase.testMessage}`, () => {

            // Arrange
            pagingComponent.total = testCase.total;
            pagingComponent.page = testCase.page;
            pagingComponent.itemsPerPage = testCase.itemPerPage;
            pagingComponent.frameSize = testCase.frameSize;

            // Act
            let result = validateParameters(pagingComponent);

            // Assert
            expect(result.valid).to.be.false;
            expect(result.messages).to.be.contains(testCase.expectedMessage)
        });
    });
});