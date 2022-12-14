import { AbstractControl, FormGroup } from '@angular/forms';
import { ViewStatusRoute } from '@Core/interfaces/base-service.interface';
import { LoginResultPermission } from '@Core/models/security/loginResult/loginResult-permission.model';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

export function controlFormWithPermissions(
  viewStatus: Observable<ViewStatusRoute>,
  permission: Observable<LoginResultPermission>,
  form: FormGroup | FormGroup[],
  cb?: CallableFunction
): Subscription {
  return combineLatest([permission, viewStatus])
    .pipe(
      map(([permission, viewStatus]) => ({
        permission,
        viewStatus,
      }))
    )
    .subscribe(function ({ permission, viewStatus }) {
      const havePermission = getPermission(viewStatus, permission);
      iterableForm(form, havePermission);
      if (!!cb) cb(arguments[0]);
    });
}

function getPermission(
  viewStatus: ViewStatusRoute,
  permission: LoginResultPermission
) {
  switch (viewStatus) {
    case ViewStatusRoute.ADD:
      return permission?.readonly_write;
    case ViewStatusRoute.EDIT:
      return permission?.readonly_edit;

    case ViewStatusRoute.DASHBOARD:
      return permission?.readonly_read;

    case ViewStatusRoute.DETAIL:
      return permission?.readonly_read;

    default:
      return false;
  }
}

function iterableForm(forms: FormGroup | FormGroup[], havePermission: boolean) {
  if (Array.isArray(forms)) {
    for (const form of forms) {
      iterableControls(form.controls, havePermission);
    }
  } else {
    iterableControls(forms.controls, havePermission);
  }
}

function iterableControls(
  controls: {
    [key: string]: AbstractControl;
  },
  havePermission: boolean
) {
  for (const control in controls) {
    enableDisableControl(controls[control], havePermission);
  }
}

function enableDisableControl(
  control: AbstractControl,
  havePermission: boolean
) {
  if (!havePermission && control.enabled) {
    control.disable()
  }

  // // if (havePermission) {
  //   control.enable();
  // // } else {
  //   control.disable();
  // // }
}
