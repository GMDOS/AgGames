import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacarItemComponent } from './placar-item.component';

describe('PlacarItemComponent', () => {
  let component: PlacarItemComponent;
  let fixture: ComponentFixture<PlacarItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlacarItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlacarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
