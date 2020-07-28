import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  isDuplicate: boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(userForm: NgForm): void {
    const id: number = +this.route.snapshot.paramMap.get('id');

    this.userService.creatUser(userForm.value).subscribe(
      response => {
        this.router.navigate([''])
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

  backClick(): void {
    this.location.back();
  }

}
