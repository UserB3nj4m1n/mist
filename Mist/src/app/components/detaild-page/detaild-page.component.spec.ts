import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaildPageComponent } from './detaild-page.component';

describe('DetaildPageComponent', () => {
  let component: DetaildPageComponent;
  let fixture: ComponentFixture<DetaildPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetaildPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetaildPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
