import { Component, OnInit } from '@angular/core';
import { PetsService } from '@ngrx-pets/core-data';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngrx-pets-pets-item',
  templateUrl: './pets-item.component.html',
  styleUrls: ['./pets-item.component.scss']
})
export class PetsItemComponent implements OnInit {
  _pet$;

  public get pet$() {
    return this._pet$;
  }

  public set pet$(value) {
    this._pet$ = value;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private petsService: PetsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(param => {
      const id = param['id'];
      this.pet$ = this.petsService.findOne(id);
    });
  }

  goBackToPets() {
    this.router.navigate(['/pets']);
  }
}
