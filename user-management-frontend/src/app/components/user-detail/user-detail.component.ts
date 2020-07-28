import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User;
  isDuplicate: boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) { }

  ngOnInit(): void {
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.userService.getUserDetail(id).subscribe(response => {
      this.user = response;
      console.log(response);
    });
  }

  backClick(): void {
    this.location.back();
  }

  onSubmit(detailsForm: NgForm): void {
    const id: number = +this.route.snapshot.paramMap.get('id');

    if (detailsForm.invalid) {
      return;
    }

    this.userService.updateUser(id, detailsForm.value).subscribe(
      response => {
        this.router.navigate(['']);
        console.log(response);
      },
      error => {
        console.log(error);
        if (error instanceof HttpErrorResponse) {
          if (error.status === 409) {
            this.isDuplicate = true;
            return;
          }
        }
      }
    );
  }

}
