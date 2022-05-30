import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-navtopbar',
  templateUrl: './navtopbar.component.html',
  styleUrls: ['./navtopbar.component.css']
})
export class NavtopbarComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  logout(): void{
    localStorage.clear();
    this._router.navigate(['/login']);
  }

}
