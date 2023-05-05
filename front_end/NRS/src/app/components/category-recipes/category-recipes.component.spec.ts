import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryRecipesComponent } from './category-recipes.component';

describe('CategoryRecipesComponent', () => {
  let component: CategoryRecipesComponent;
  let fixture: ComponentFixture<CategoryRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryRecipesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
