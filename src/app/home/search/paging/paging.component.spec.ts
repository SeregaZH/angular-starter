import { Page, PageModelInterface, PagingComponent } from './paging.component';
import { SimpleChange } from '@angular/core';

const expect = chai.expect;
const moduleName = 'SearchModule';
const componentName = 'PagingComponent';

const ItemsPerPage: number = 50;
interface TestCaseInterface {
    page: number;
    total: number;
    condition: string;
    expectResult: boolean;
}

describe(`${moduleName}.${componentName} `, () => {

    let testTarget;

    beforeEach(() => {
        testTarget = new PagingComponent((c) => ({ valid: true, messages: [] }));
        testTarget.frameSize = 4;
        testTarget.itemsPerPage = ItemsPerPage;
    });

    describe('#showNextFrame ', () => {

        const testSuite: TestCaseInterface[] = [
            { page: 0, total: 50, expectResult: false, condition: 'if total pages less than' +
                ' frameSize' },
            { page: 5, total: 600, expectResult: true, condition: 'if total pages greater than' +
                ' frameSize' },
            { page: 8, total: 300, expectResult: false, condition: 'if current page in the last' +
                ' frame' },
            { page: 4, total: 400, expectResult: false, condition: 'if current page in the start' +
                ' of the last frame' },
            { page: 3, total: 400, expectResult: true, condition: 'if current page in the end of' +
                ' pre end frame' }
        ];

        _.forEach(testSuite, (testCase: TestCaseInterface) => {

            it(`should ${ testCase.expectResult ? 'enable' : 'disable' }
                next frame button ${testCase.condition }`,
                () => {

                // Arrange
                testTarget.total = testCase.total;
                testTarget.page = testCase.page;

                // Act
                const result = testTarget.showNextFrame;

                //
                expect(testCase.expectResult).to.be.eq(result);
            });
        });
    });

    describe('#showPreviousFrame ', () => {

        const testSuite: TestCaseInterface[] = [
            { page: 1, total: 10, expectResult: false, condition: 'if total pages less than' +
                ' frameSize' },
            { page: 6, total: 600, expectResult: true, condition: 'if total pages greater than' +
                ' frameSize' },
            { page: 2, total: 300, expectResult: false, condition: 'if current page in the first' +
                ' frame' },
            { page: 4, total: 300, expectResult: true, condition: 'if current page at the start' +
                ' of second frame' }
        ];

        _.forEach(testSuite, (testCase: TestCaseInterface) => {

            it(`should ${ testCase.expectResult ? 'enable' : 'disable' }
               previous frame button ${ testCase.condition }`,
               () => {

                    // Arrange
                    testTarget.total = testCase.total;
                    testTarget.page = testCase.page;

                    // Act
                    const result = testTarget.showPreviousFrame;

                    //
                    expect(testCase.expectResult).to.be.eq(result);
                });
        });
    });

    describe('#ngOnInit ', () => {
        it('should throw an error if parameters is invalid', () => {
            // Arrange
            const validatorSpy = sinon.spy(
                (c) => ( { valid: false, messages: ['A', 'B', 'C'] } )
            );
            const invalidTarget = new PagingComponent(validatorSpy);

            // Act
            try {
                invalidTarget.ngOnInit();
            } catch (e) {
                expect(e.message).to.be.eq('A, B, C');
            }

            expect(validatorSpy.calledWithExactly(invalidTarget)).be.ok;
            expect(invalidTarget.ngOnInit).to.throw;
        });
    });

    describe('#ngOnChange ', () => {

        describe('should initialize ', () => {

            const testCases = [{
                expectedItems: {},
                previousTotal: 0,
                currentTotal: null,
                firstChange: true,
                page: 0,
                message: 'empty pages collection if total is null with first change'
            }, {
                expectedItems: {},
                previousTotal: 0,
                currentTotal: 0,
                page: 0,
                firstChange: true,
                message: 'empty pages collection if total is zero with first change'
            }, {
                expectedItems: {
                    0: new Page(0, ItemsPerPage, true),
                    1: new Page(1, ItemsPerPage),
                    2: new Page(2, ItemsPerPage)
                },
                previousTotal: 0,
                page: 0,
                currentTotal: 150,
                firstChange: true,
                message: '3 pages with first active'
            }, {
                expectedItems: {
                    4: new Page(4, ItemsPerPage, true)
                },
                previousTotal: 0,
                page: 4,
                currentTotal: 250,
                firstChange: true,
                message: '1 page for second frame with fifth page active'
            }];

            _.forEach(testCases, tc => {
                it(tc.message, () => {

                    // Arrange
                    testTarget.total = tc.currentTotal;
                    testTarget.page = tc.page;

                    // Act
                    testTarget.ngOnChanges(
                        { total: new SimpleChange(
                                tc.previousTotal,
                                tc.currentTotal,
                                tc.firstChange
                            ) }
                    );

                    // Assert
                    expect(testTarget.framePages).to.be.eql(tc.expectedItems);
                });
            });
        });

        describe('should reset number of pages and current page ', () => {

            it(' if only 2 pages left from 4', () => {

                // Arrange
                testTarget.framePages = {
                    0: new Page(0, ItemsPerPage),
                    1: new Page(1, ItemsPerPage),
                    2: new Page(2, ItemsPerPage),
                    3: new Page(3, ItemsPerPage, true)
                };
                testTarget.page = 3;
                testTarget.total = 100;

                // Act
                testTarget.ngOnChanges(
                    {total: new SimpleChange(250, 100, false)}
                );

                // Assert
                expect(testTarget.page).to.be.eq(1);
                expect(testTarget.framePages).to.be.eql({
                    0: new Page(0, ItemsPerPage),
                    1: new Page(1, ItemsPerPage, true)
                });
            });

            it(' if only 2 pages left from 10', () => {

                // Arrange
                testTarget.total = 500;
                testTarget.changePage(5);

                // Act
                testTarget.total = 100;
                testTarget.ngOnChanges(
                    {total: new SimpleChange(500, 100, false)}
                );

                // Assert
                expect(testTarget.page).to.be.eq(1);
                expect(testTarget.framePages).to.be.eql({
                    0: new Page(0, ItemsPerPage),
                    1: new Page(1, ItemsPerPage, true)
                });

            });
        });
    });

    describe('#changePage ', () => {

        const changeEmitterStub = {
            emit: sinon.spy()
        };

        beforeEach(() => {
            testTarget.framePages = {
                0: new Page(0, ItemsPerPage, true),
                1: new Page(1, ItemsPerPage),
                2: new Page(2, ItemsPerPage),
                3: new Page(3, ItemsPerPage)
            };
            testTarget.total = 500;
            testTarget.page = 0;
            testTarget.changePage(1);
            testTarget.pageChanged = changeEmitterStub;
        });

        it('should change page in the current page frame', () => {

            // Act
            testTarget.changePage(3);

            // Assert
            expect(testTarget.page).to.be.eq(3);
            expect(
                changeEmitterStub
                    .emit
                    .calledWithExactly(<PageModelInterface>{
                        skip: ItemsPerPage * 3,
                        top: ItemsPerPage,
                        page: 3
                    })).to.be.ok;
        });

        it('should change page from next page frame', () => {

            // Act
            testTarget.changePage(7);

            // Assert
            expect(testTarget.page).to.be.eq(7);
            expect(
                changeEmitterStub
                    .emit
                    .calledWithExactly(<PageModelInterface>{
                        skip: ItemsPerPage * 7,
                        top: ItemsPerPage,
                        page: 7
                    })).to.be.ok;
            expect(testTarget.framePages).eql({
                4: new Page(4, ItemsPerPage),
                5: new Page(5, ItemsPerPage),
                6: new Page(6, ItemsPerPage),
                7: new Page(7, ItemsPerPage, true)
            });
        });

        it('should change page from previous page frame', () => {

            // Arrange
            testTarget = new PagingComponent((c) => ({ valid: true, messages: [] }));
            testTarget.framePages = {
                4: new Page(4, ItemsPerPage),
                5: new Page(5, ItemsPerPage),
                6: new Page(6, ItemsPerPage),
                7: new Page(7, ItemsPerPage, true)
            };
            testTarget.total = 500;
            testTarget.page = 7;
            testTarget.frameSize = 4;
            testTarget.changePage(7);
            testTarget.pageChanged = changeEmitterStub;

            // Act
            testTarget.changePage(2);

            // Assert
            expect(testTarget.page).to.be.eq(2);
            expect(
                changeEmitterStub
                    .emit
                    .calledWithExactly(<PageModelInterface>{
                        skip: ItemsPerPage * 2,
                        top: ItemsPerPage,
                        page: 2
                    }));
            expect(testTarget.framePages).eql({
                0: new Page(0, ItemsPerPage),
                1: new Page(1, ItemsPerPage),
                2: new Page(2, ItemsPerPage, true),
                3: new Page(3, ItemsPerPage)
            });
        });
    });

    describe('#nextFrame ', () => {

        let changeEmitterStub = {
            emit: sinon.spy()
        };

        beforeEach(() => {
            testTarget.framePages = {
                '0': new Page(0, ItemsPerPage, true),
                '1': new Page(1, ItemsPerPage),
                '2': new Page(2, ItemsPerPage),
                '3': new Page(3, ItemsPerPage)
            };
            testTarget.total = 500;
            testTarget.page = 0;
            testTarget.changePage(1);
            testTarget.pageChanged = changeEmitterStub;
        });

        it('should select the same page by index in the next frame if page exist', () => {

            // Act
            testTarget.nextFrame();

            // Assert
            expect(testTarget.page).to.be.eq(5);
            expect(
                changeEmitterStub
                    .emit
                    .calledWithExactly(<PageModelInterface>{
                        skip: ItemsPerPage * 5,
                        top: ItemsPerPage,
                        page: 5
                    })).to.be.ok;
            expect(testTarget.framePages).eql({
                4: new Page(4, ItemsPerPage),
                5: new Page(5, ItemsPerPage, true),
                6: new Page(6, ItemsPerPage),
                7: new Page(7, ItemsPerPage)
            });
        });

        it('should select the last page in the next frame if current page is not exist', () => {

            // Arrange
            testTarget = new PagingComponent((c) => ({ valid: true, messages: [] }));
            testTarget.framePages = {
                0: new Page(0, ItemsPerPage),
                1: new Page(1, ItemsPerPage, true),
                2: new Page(2, ItemsPerPage),
                3: new Page(3, ItemsPerPage)
            };
            testTarget.total = 250;
            testTarget.page = 1;
            testTarget.frameSize = 4;
            testTarget.pageChanged = changeEmitterStub;

            // Act
            testTarget.nextFrame();

            // Assert
            expect(testTarget.page).to.be.eq(4);
            expect(
                changeEmitterStub
                    .emit
                    .calledWithExactly(
                        <PageModelInterface>{ skip: ItemsPerPage * 4, top: ItemsPerPage, page: 4 })
            ).to.be.ok;
            expect(testTarget.framePages).eql({
                4: new Page(4, ItemsPerPage, true)
            });
        });

        it('should select the current page by index in the next frame after total changes', () => {

            // Arrange
            testTarget = new PagingComponent((c) => ({ valid: true, messages: [] }));
            testTarget.framePages = {
                0: new Page(0, ItemsPerPage),
                1: new Page(1, ItemsPerPage, true),
                2: new Page(2, ItemsPerPage),
                3: new Page(3, ItemsPerPage)
            };

            testTarget.page = 1;
            testTarget.frameSize = 4;
            testTarget.pageChanged = changeEmitterStub;

            testTarget.total = 250;
            testTarget.ngOnChanges({ total: new SimpleChange(500, 250, false) });
            // Act
            testTarget.nextFrame();

            // Assert
            expect(testTarget.page).to.be.eq(4);
            expect(
                changeEmitterStub
                    .emit
                    .calledWithExactly(
                        <PageModelInterface>{ skip: ItemsPerPage * 4, top: ItemsPerPage, page: 4 })
            ).to.be.ok;
            expect(testTarget.framePages).eql({
                4: new Page(4, ItemsPerPage, true)
            });
        });
    });

    describe('#previousFrame', () => {
        const changeEmitterStub = {
            emit: sinon.spy()
        };

        beforeEach(() => {
            testTarget.framePages = {
                4: new Page(0, ItemsPerPage, true),
                5: new Page(1, ItemsPerPage),
                6: new Page(2, ItemsPerPage),
                7: new Page(3, ItemsPerPage)
            };
            testTarget.total = 500;
            testTarget.page = 4;
            testTarget.changePage(4);
            testTarget.pageChanged = changeEmitterStub;
        });

        it('should select the same page by index in the previous frame', () => {

            // Act
            testTarget.previousFrame();

            // Assert
            expect(testTarget.page).to.be.eq(0);
            expect(
                changeEmitterStub
                    .emit
                    .calledWithExactly(
                         { skip: 0, top: ItemsPerPage, page: 0 } as PageModelInterface)
            ).to.be.ok;
            expect(testTarget.framePages).eql({
                0: new Page(0, ItemsPerPage, true),
                1: new Page(1, ItemsPerPage),
                2: new Page(2, ItemsPerPage),
                3: new Page(3, ItemsPerPage)
            });
        });
    });
});
