import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { DataTestComponent } from './dataTest.component';
import { DataTestService } from "./dataTest.service";
import { DataProviderService } from "./serviceProvider/dataProvider.service";

describe('Component: dataTest', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DataTestComponent]
        });
    });

    it('should create the app', () => {
        let fixture = TestBed.createComponent(DataTestComponent);
        let app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    // Check if data will be read from dataTestService

    it('should get the town name from the service', () => {
        let fixture = TestBed.createComponent(DataTestComponent);
        let app = fixture.debugElement.componentInstance;
        let dataTestService = fixture.debugElement.injector.get(DataTestService);
        fixture.detectChanges();
        expect(dataTestService.town.name).toEqual(app.town.name);
    });

    // check if data will be display in page if flag is set

    it('should display the town name if test is passed', () => {
        let fixture = TestBed.createComponent(DataTestComponent);
        let app = fixture.debugElement.componentInstance;
        app.passedTest = true;
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('p').textContent).toContain(app.town.name);
    });

    // Check if data will be not display in page if flag is not set

    it('shouldn\'t display the town name if test is not passed', () => {
        let fixture = TestBed.createComponent(DataTestComponent);
        let app = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('p').textContent).not.toContain(app.town.name);
    });

    // Get data from dataProviderService

    it('shouldn\'t fetch data successfully if not called asynchronously', () => {
        let fixture = TestBed.createComponent(DataTestComponent);
        let app = fixture.debugElement.componentInstance;
        let dataProviderService = fixture.debugElement.injector.get(DataProviderService);
        let spy = spyOn(dataProviderService, 'getDetails')
            .and.returnValue(Promise.resolve({"name": "Disease Diary"}));
        fixture.detectChanges();
        expect(app.data).toBe(undefined);
    });

    //

    it('should fetch data successfully if called asynchronously', async(() => {
        let fixture = TestBed.createComponent(DataTestComponent);
        let app = fixture.debugElement.componentInstance;
        let dataProviderService = fixture.debugElement.injector.get(DataProviderService);
        let spy = spyOn(dataProviderService, 'getDetails')
            .and.returnValue(Promise.resolve('Disease Diary'));
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(app.data).toBe('Disease Diary');
        });
    }));

    //

    it('should fetch data successfully if called asynchronously', fakeAsync(() => {
        let fixture = TestBed.createComponent(DataTestComponent);
        let app = fixture.debugElement.componentInstance;
        let dataProviderService = fixture.debugElement.injector.get(DataProviderService);
        let spy = spyOn(dataProviderService, 'getDetails')
            .and.returnValue(Promise.resolve('Disease Diary'));
        fixture.detectChanges();
        tick();
        expect(app.data).toBe('Disease Diary');
    }));
});
