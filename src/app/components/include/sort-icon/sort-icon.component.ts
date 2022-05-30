import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sort-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sort-icon.component.html',
  styleUrls: ['./sort-icon.component.css']
})
export class SortIconComponent implements OnInit {
  @Input() direction!: string;

  public chevronUpIcon = faChevronUp;
  public chevronDownIcon = faChevronDown;

  constructor() { }

  ngOnInit(): void {
  }

}
