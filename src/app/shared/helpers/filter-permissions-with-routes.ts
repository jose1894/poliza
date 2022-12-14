import { ItemRoute } from '@Core/models/general/navigation/item-route.interface';
import { ROUTES } from '@Core/routes/routes';

export function filterPermissionsWithRoutes(
  permissions: string[]
): any[]  {
  if (permissions.length > 0) {
    return ROUTES.map((route) => {
      const data = _addLevelOne(route, permissions);
      console.log(data, 'mostrar nav')
      if (!data || !data.children || data.children.length === 0) return null;
      console.log(data, 'finallll nav')
      return data;
    }).filter(Boolean);
  }

  return [];
}

function _addLevelOne(
  element: ItemRoute,
  permisos: string[]
): ItemRoute {
  console.log(permisos.indexOf(element.id))
  if (permisos.indexOf(element.id) > -1 && !element.disabled) {
    if (element.type === 'collapsable') {
      //@ts-ignore
      const children: ItemRoute[] = element.children
        .map((route: any) => {
          const child = _addChildren(route, permisos);
          if (child === null) return null;

          if (
            child.type === 'collapsable' &&
            child.children &&
            child.children.length === 0
          ) {
            // No posee permisos de ultimos nivel
            return null;
          }

          return child;
        })
        .filter(Boolean);

      return {
        ...element,
        children,
      };
    } else {
      return _addItem(element, permisos);
    }
  }
  //@ts-ignore
  return null;
}

// add level 1
function _addChildren(
  element: ItemRoute,
  permisos: string[]
): ItemRoute {
  // console.log(element.disabled, !element.disabled);
  if (permisos.indexOf(element.id) > -1 && !element.disabled) {
    // children of children
    console.log(element)
    if (element.children) {
      const children: ItemRoute[] = element.children.filter((route) => {
        const child = _addChildren(route, permisos);
        return !!child ? true : false;
      });

      return {
        ...element,
        children,
      };
    } else {
      return _addItem(element, permisos);
    }
  }
  //@ts-ignore
  return null;
}

// add level 2
function _addItem(route: ItemRoute, permisos: string[]): ItemRoute {
  if (permisos.indexOf(route.id) > -1 && !route.disabled) {
    return {
      ...route,
      url: route.url && route.url.length > 0 ? route.url : [''],
    };
  }
  //@ts-ignore
  return null;
}
