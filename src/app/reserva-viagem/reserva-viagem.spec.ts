import { ComponentFixture, TestBed } from '@angular/core/testing';


import { ReservaViagemComponent } from './reserva-viagem';


describe('ReservaViagem', () => {
  let component: ReservaViagemComponent;
  let fixture: ComponentFixture<ReservaViagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaViagemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaViagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});