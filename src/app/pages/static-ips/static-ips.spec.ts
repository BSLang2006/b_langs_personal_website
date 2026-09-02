import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticIPs } from './static-ips';

describe('StaticIPs', () => {
  let component: StaticIPs;
  let fixture: ComponentFixture<StaticIPs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaticIPs],
    }).compileComponents();

    fixture = TestBed.createComponent(StaticIPs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
