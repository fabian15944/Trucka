import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TipoestadoPage } from './tipoestado.page';

describe('TipoestadoPage', () => {
  let component: TipoestadoPage;
  let fixture: ComponentFixture<TipoestadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoestadoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TipoestadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
