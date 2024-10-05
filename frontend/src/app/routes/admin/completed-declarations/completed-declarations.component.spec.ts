import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedDeclarationsComponent } from './completed-declarations.component';

describe('CompletedDeclarationsComponent', () => {
  let component: CompletedDeclarationsComponent;
  let fixture: ComponentFixture<CompletedDeclarationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedDeclarationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedDeclarationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
