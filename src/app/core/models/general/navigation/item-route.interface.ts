export interface ItemRoute {
  id: string;
  titleTab?: string;
  title: string;
  disabled?: boolean;
  type: 'item' | 'collapsable';
  // translate?: string;
  icon?: string;
  saveOnExit?: boolean;
  // hidden?: boolean;
  url?: string[];
  // classes?: string;
  exactMatch?: boolean;
  externalUrl?: boolean;
  openInNewTab?: boolean;
  function?: any;
  badge?: {
    text: string;
    // translate?: string;
    bg?: string;
    fg?: string;
  };
  children?: ItemRoute[];
}
