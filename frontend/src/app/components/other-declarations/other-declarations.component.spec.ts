import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherDeclarationsComponent } from './other-declarations.component';

describe('OtherDeclarationsComponent', () => {
  let component: OtherDeclarationsComponent;
  let fixture: ComponentFixture<OtherDeclarationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherDeclarationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherDeclarationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
