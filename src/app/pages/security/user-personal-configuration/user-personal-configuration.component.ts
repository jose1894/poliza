import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '@Core/models/user';
import { AuthService } from '@Core/services/auth.service';
import { NotifyService } from '@Core/services/notify.service';

@Component({
  selector: 'app-user-personal-configuration',
  templateUrl: './user-personal-configuration.component.html',
  styleUrls: ['./user-personal-configuration.component.scss']
})
export class UserPersonalConfigurationComponent implements OnInit {

  public title: string = 'My User';
  public hide1: boolean = true;
  public hide2: boolean = true;
  public hide3: boolean = true;

  public err01: any = false;
  public err02: any = false
  public disabled: boolean = true;

  public changePass = false;
  public formControlUserInformation: FormGroup;

  public dataUser: User;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UserPersonalConfigurationComponent>,
    private _notifyService: NotifyService,
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
  ) { 
    this.dataUser = this._authService.userLogged;
    this.formControlUserInformation = this._formBuilder.group({
      firstName: [this.dataUser?.nombre || '', [Validators.required, Validators.maxLength(50)]],
      email: [this.dataUser?.email || '', [Validators.required, Validators.email]],
      changePassword: [false],
      lastName: [this.dataUser?.apellido || '', Validators.required],
      userName: [this.dataUser?.username || '', Validators.required],      
      password: [this.dataUser?.password || '', Validators.required],
      CPassword: [this.dataUser?.c_password || '', Validators.required],
      rememberUser: [true],
    });
  }

  ngOnInit(): void {}

  //Funcion que cierra el modal
  public close(): void {
    this.dialogRef.close();
  }

  //Funcion que guarda la informacion
  public apply(): void {
    this.saveUserConfig();
  }

  saveUserConfig() {}

   //Toggle para quitarle el hide a los inputs de cambiar contraseña
   public toggleFlag(value: boolean): void {
    this.changePass = value;
    
    if (!this._checkIfUserHasChanges()) {
      this.disabled = !value;
    }
   }

   private _checkIfUserHasChanges() : boolean {
    return false;
    /*return (
      this.formControlUserInformation.get('color').value.id !==
         this.selectedColor.id ||
       this.formControlUserInformation.get('language').value.id !==
         this.selectedLanguage.id ||
       this.formControlUserInformation.get('rowsByPage').value !==
         this.dataUser.itemsFormsPerPage ||
       this.dataUser.itemsReportsPerPage !==
         this.formControlUserInformation.get('rowsByPageReport').value
    )*/
  }

}
