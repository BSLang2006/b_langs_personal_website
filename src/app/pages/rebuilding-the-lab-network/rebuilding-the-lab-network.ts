import { Component } from '@angular/core';
import { Entry } from '../../shared/entry/entry';
import { CmlNetworking } from '../../diagrams/cml-networking/cml-networking';

@Component({
  selector: 'app-rebuilding-the-lab-network',
  imports: [Entry, CmlNetworking],
  templateUrl: './rebuilding-the-lab-network.html',
})
export class RebuildingTheLabNetwork {}
