export class Color {
  private _id: string = '';
  private _name: string = '';
  private _theme: string = '';
  private _color: string = '';

  public set id(id) {
    this._id = id;
  }
  public get id(): string {
    return this._id;
  }

  public set name(name) {
    this._name = name;
  }
  public get name(): string {
    return this._name;
  }

  public set theme(theme) {
    this._theme = theme;
  }
  public get theme(): string {
    return this._theme;
  }

  public set color(color) {
    this._color = color;
  }
  public get color(): string {
    return this._color;
  }
}
