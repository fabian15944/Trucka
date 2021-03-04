import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgregarArtPage } from './agregar-art.page';

describe('AgregarArtPage', () => {
  let component: AgregarArtPage;
  let fixture: ComponentFixture<AgregarArtPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarArtPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarArtPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
