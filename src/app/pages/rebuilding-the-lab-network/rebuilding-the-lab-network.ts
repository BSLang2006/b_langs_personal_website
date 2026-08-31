import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CmlNetworking } from '../../diagrams/cml-networking/cml-networking';

@Component({
  selector: 'app-rebuilding-the-lab-network',
  imports: [RouterLink, CmlNetworking],
  templateUrl: './rebuilding-the-lab-network.html',
  styleUrl: './rebuilding-the-lab-network.scss',
})
export class RebuildingTheLabNetwork {}
