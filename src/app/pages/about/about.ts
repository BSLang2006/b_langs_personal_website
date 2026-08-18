import { Component } from '@angular/core';
import { site } from '../../core/site.config';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  readonly site = site;

  readonly skills = [
    { group: 'Networking', items: 'TCP/IP · VLANs · STP/RSTP · EtherChannel · OSPF · EIGRP · BGP · NAT · DHCP · DNS · VPNs · wireless' },
    { group: 'Operations', items: 'Incident triage · outage isolation · escalation · monitoring · technical documentation' },
    { group: 'Systems', items: 'Linux · Windows · Docker · Postgres · Caddy · TLS · REST APIs · MQTT' },
    { group: 'Automation', items: 'Python · Netmiko · TypeScript · Angular · FastAPI · SQL · Git · PowerShell · YAML' },
    { group: 'Diagnostics', items: 'Wireshark · packet capture · device logs · SSH · Cisco Modeling Labs' },
  ];

  readonly certs = [
    { name: 'CCNP Enterprise', note: 'In progress' },
    { name: 'AWS Cloud Practitioner', note: 'Exam scheduled' },
    { name: 'Pakedge Certified Network Administrator', note: 'PCNA' },
  ];
}
