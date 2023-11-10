import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DateAndTimeComponent} from './date-and-time.component';

describe('DateAndTimeComponent', () => {
    let component: DateAndTimeComponent;
    let fixture: ComponentFixture<DateAndTimeComponent>;

    beforeAll(() => {
        const mockedData = new Date('2020-11-26T00:00:00.000Z');

        jest.useFakeTimers();
        jest.setSystemTime(mockedData);
    })
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DateAndTimeComponent]
        });
        fixture = TestBed.createComponent(DateAndTimeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call method when interval runs',()=>{
        const mockedData = new Date('2020-11-26T00:00:01.000Z');

        jest.advanceTimersToNextTimer();
       expect(component.currentDate).toEqual(mockedData);
    })
});
