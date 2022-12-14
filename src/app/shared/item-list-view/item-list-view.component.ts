import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface ImgRight {
  img1?: string;
  img2?: string;
  icon1?: string;
  icon2?: string;
}

@Component({
  selector: 'app-item-list-view',
  templateUrl: './item-list-view.component.html',
  styleUrls: ['./item-list-view.component.scss']
})
export class ItemListViewComponent implements OnInit {
  //para colocar el icono al avatar
  @Input() icon: string = 'bubble_chart';
  //para que el avatar tenga el color primario, esto es cuando la imagen principal es un iono en vez de imagen
  @Input() avatarColorPrimary = true;
  //para darle color especifico al avatar, esto es cuando la imagen principal es un iono en vez de imagen
  @Input() avatarColor: string = '';
  // propiadad que trae el valor del dato que esta debajo de la imagen principal.
  @Input() dataCode: string = '';
  // propiedad que trae el valor del el titulo.
  @Input() dataTitle: string ='';
  // propiedad que la url de la imagen principal (imagen de la izquierda)
  @Input() mainImage: string = '';
  // este arreglo trae la informacion del centro del card, (icono texto y si es icono o imagen la que se va a mostrar)
  @Input() arrayContentData: any[] = [];
  // este arreglo trae las imagenes que van a la derecha
  //@ts-ignore
  @Input() arrayImagesRight: ImgRight;
  // este indicador sirve para mostrar o no el dato que esta debajo de la imagen principal hay un formato donde
  @Input() isCode: boolean = true;
  // este puede ser false
  @Input() isDatePicker: boolean = true;
  // este indicador es para determinar si el icon va a tomar el color de fondo primario
  @Input() fondoPrimarioIcon: boolean = false;
  // Index del Item
  @Input() index: number = -1;
  // Define si se puede marcar o no como seleccionado segun los permisos
  @Input('havePermissionToChecked')
  private _havePermissionToChecked: boolean = true;
  // Marca si el Item va estar seleccionado al presionar la imagen
  @Input()
  checked: boolean = false;
  // este indicador es para sirve para mostrar o no el rectangulo donde van las imagenes pequeñas a la derecha.
  @Input() imageRight: boolean = false;
  // esta propiedad es para saber cuantas imagenes a la derecha quiero mostrar puede ser 1 o 2 imagenes.
  @Input() columnImageRight: number = 1;
  // propiedad que trae el valor del formato que se deben mostrar los datos
  @Input() formato: number = 1;
  // Evento que se dispara al presionar una imagen para seleccionarla
  @Output() onImageClick: EventEmitter<any> = new EventEmitter();
  flexHeightVal: number = 80; // altura del contenedor de la imagen
  tipoFormato: string = 'formato1';
  styleFormat: string = 'styleImageFormat1'; // estilo por defecto para la imagen que lleva la letra
  backFormat: string = ''; // estilo que lleva la imagen cuand se da click para borrar
  extraClass: string = '';
  //@ts-ignore
  @Input('classStyleExtra') public classExtra: { [key: string]: boolean };

  

  constructor(private cd: ChangeDetectorRef) {}

  imageClick(): void {
    if (this._havePermissionToChecked) this.onImageClick.emit(this.index);
  }

  ngOnChanges(): void {
    this.cd.reattach();
  }

  public getClasses(){
    return {
      [this.styleFormat]: true,
      'fondo-primario': this.avatarColorPrimary === true,
      ...this.classExtra
    };
  }

  ngOnInit(): void {
    this.fondoPrimarioIcon =
      this.fondoPrimarioIcon === undefined ? false : this.fondoPrimarioIcon;
    // formato 1: normal
    // formato 2: coloca la imagen a 55px de ancho y alto, elimina la linea que sale debajo de la imagen
    // formato 3 solo coloca la imagen a 50px de ancho y alto. Se reduce el tamaño del contenedor del codigo
    if (this.formato === 2) {
      this.flexHeightVal = 100;
      this.styleFormat = 'styleImageFormat2';
    } else if (this.formato === 3) {
      this.flexHeightVal = 65;
      this.styleFormat = 'styleImageFormat3';
      this.tipoFormato = 'formato3';
      this.backFormat = 'backFormat3';
    }
  }

}
