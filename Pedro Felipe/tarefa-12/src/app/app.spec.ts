import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize form with empty competencies array', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.competencias.length).toBeGreaterThan(0);
  });

  it('should add competency to form array', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    const initialLength = app.competencias.length;
    app.adicionarCompetencia();
    expect(app.competencias.length).toBe(initialLength + 1);
  });

  it('should remove competency from form array', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    app.adicionarCompetencia();
    const lengthBeforeRemove = app.competencias.length;
    app.removerCompetencia(0);
    expect(app.competencias.length).toBe(lengthBeforeRemove - 1);
  });

  it('form should be invalid when empty', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.formColaborador.valid).toBeFalsy();
  });
});
