import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { startWith, debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  searchInput: FormControl;
  searchResult: User[];
  @Output() searchEvent = new EventEmitter<any>();

  constructor(private userService: UserService) {
    this.searchInput = new FormControl();
  }

  ngOnInit() {
    this.getSearchResult();
  }

  getSearchResult() {
    this.searchInput.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        switchMap(name => this.userService.getUsersByName({name: name}))
      ).subscribe(result => {
        console.log(result);
        this.searchResult = result;
      });
  }

  displayFn(user?: User): string | undefined {
    return user ? user.name + ', (' + user.username + ')' : undefined;
  }

  sendValue() {
    this.searchEvent.emit(this.searchInput.value);
  }

}
