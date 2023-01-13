import { ItemRoute } from '@Core/models/general/navigation/item-route.interface';

export const ROUTES: ItemRoute[] = [
  {
    id: 'P01',
    title: 'Póliza',
    type: 'collapsable',
    icon: 'settings',
    children: [
      {
        id: 'PS010101',
        title: 'Type Poliza',
        type: 'item',
        url: ['type-poliza']
      },
    ],
  },
  /*{
    id: 'B02',
    title: 'Security',
    type: 'collapsable',
    icon: 'security',
    children: [
      {
        id: 'B020101',
        title: 'My user',
        saveOnExit: true,
        type: 'item',
        disabled: true,
      },
      {
        id: 'B020102',
        title: 'Users',
        saveOnExit: true,
        type: 'item',
        url: ['users'],
      },
      {
        id: 'B020103',
        title: 'Roles',
        saveOnExit: true,
        type: 'item',
        url: ['roles'],
      },
    ],
  },
  {
    id: 'B04',
    title: 'Configurations',
    type: 'collapsable',
    icon: 'settings',
    children: [
      {
        id: 'B040101',
        title: 'Currencies',
        saveOnExit: true,
        type: 'item',
        url: ['currencies'],
      },
      {
        id: 'B040102',
        title: 'Exchange Rates',
        saveOnExit: true,
        type: 'item',
        url: ['exchange-rates'],
      },
      {
        id: 'B040201',
        title: 'Countries',
        saveOnExit: true,
        type: 'item',
        disabled: true,
        url: ['countries'],
      },
      {
        id: 'B040202',
        title: 'Payment Methods',
        saveOnExit: true,
        type: 'item',
        url: ['payment-methods'],
      },
      {
        id: 'B040203',
        title: 'Taxes',
        saveOnExit: true,
        type: 'item',
        url: ['taxes'],
      },
      {
        id: 'B040204',
        title: 'Unit Of Measurement',
        saveOnExit: true,
        type: 'item',
        url: ['unit-of-measurements'],
      },
      {
        id: 'B040206',
        title: 'Document Templates',
        saveOnExit: true,
        type: 'item',
        disabled: true,
      },
      {
        id: 'B040207',
        title: 'Data integration',
        saveOnExit: true,
        type: 'item',
        disabled: true,
      },
      {
        id: 'B040208',
        title: 'Import/Export',
        saveOnExit: true,
        type: 'item',
        disabled: true,
      },
    ],
  },
  {
    id: 'B03',
    title: 'Entities',
    type: 'collapsable',
    icon: 'business',
    children: [
      {
        id: 'B030101',
        title: 'My Companies',
        saveOnExit: true,
        type: 'item',
        url: ['companies'],
      },
      {
        id: 'B030102',
        title: 'Clients',
        saveOnExit: true,
        type: 'item',
        url: ['clients'],
      },
      {
        id: 'B030103',
        title: 'Suppliers',
        saveOnExit: true,
        type: 'item',
        url: ['suppliers'],
      },
      {
        id: 'B0302',
        title: 'Employees',
        saveOnExit: true,
        type: 'collapsable',
        children: [
          {
            id: 'B030201',
            title: 'Employees',
            saveOnExit: true,
            type: 'item',
            url: ['employees'],
          },
          {
            id: 'B030202',
            title: 'Categories',
            saveOnExit: true,
            type: 'item',
            url: ['categories'],
          },
        ],
      },
      {
        id: 'B030301',
        title: 'Equipments',
        saveOnExit: true,
        type: 'item',
        url: ['equipments'],
      },
      {
        id: 'B120101',
        title: 'Items',
        saveOnExit: true,
        type: 'item',
        url: ['items'],
      },
    ],
  },
  {
    id: 'B05',
    title: 'Projects',
    type: 'collapsable',
    icon: 'build',
    children: [
      {
        id: 'B050101',
        title: 'Projects',
        saveOnExit: true,
        type: 'item',
        url: ['projects'],
      },
      {
        id: 'B050107',
        title: 'Price Database',
        saveOnExit: true,
        type: 'item',
        url: ['price-database'],
      },
      {
        id: 'B050108',
        title: 'Estimates',
        saveOnExit: true,
        type: 'item',
        url: ['estimates'],
      },
      {
        id: 'B050110',
        title: 'Planning Gantt',
        saveOnExit: true,
        type: 'item',
        url: ['planning-gantt'],
      },
      {
        id: 'B050103',
        title: 'Project Progress',
        saveOnExit: true,
        type: 'item',
        disabled: true,
      },
      {
        id: 'B050106',
        title: 'Project Certification',
        saveOnExit: true,
        type: 'item',
        disabled: true,
      },
      {
        id: 'B050105',
        title: 'Resource Analysis',
        saveOnExit: true,
        type: 'item',
        url: ['resource-analysis'],
      },
      {
        id: 'B070402',
        title: 'Task Analysis',
        saveOnExit: true,
        type: 'item',
        url: ['task-analysis'],
      },
      {
        id: 'B050109',
        title: 'Cost Analysis',
        saveOnExit: true,
        type: 'item',
        disabled: true,
      },
      {
        id: 'B050111',
        title: 'Project Analysis',
        saveOnExit: true,
        type: 'item',
        url: ['project-analysis'],
      },
    ],
  },
  {
    id: 'B06',
    title: 'Expenses/Revenues',
    type: 'collapsable',
    icon: 'attach_money',
    children: [
      {
        id: 'B0601',
        title: 'Expenses',
        type: 'collapsable',

        children: [
          {
            id: 'B060101',
            title: 'Purchase Invoices',
            saveOnExit: true,
            type: 'item',
            url: ['purchase-invoices'],
          },
          {
            id: 'B060103',
            title: 'Reception of Materials',
            saveOnExit: true,
            type: 'item',
            url: ['reception-of-materials'],
          },
          {
            id: 'B060102',
            title: 'Timesheets',
            saveOnExit: true,
            type: 'item',
            url: ['timesheets'],
          },
          {
            id: 'B060104',
            title: 'Equipment Allocation',
            saveOnExit: true,
            type: 'item',
            url: ['equipment-allocation'],
          },
        ],
      },
      {
        id: 'B0602',
        title: 'Revenues',
        type: 'collapsable',

        children: [
          {
            id: 'B060201',
            title: 'Sales Invoices',
            saveOnExit: true,
            type: 'item',
            disabled: true,
            url: ['sales-invoices'],
          },
          {
            id: 'B060202',
            title: 'Payment Certificates',
            saveOnExit: true,
            type: 'item',
            disabled: true,
          },
        ],
      },
    ],
  },
  {
    id: 'B11',
    title: 'CRM',
    type: 'collapsable',
    icon: 'supervised_user_circle',
    disabled: true,
    children: [
      {
        id: 'B110101',
        title: 'Contacts',
        type: 'item',
      },
      {
        id: 'B110102',
        title: 'Accounts',
        type: 'item',
      },
      {
        id: 'B110103',
        title: 'Opportunities',
        type: 'item',
      },
      {
        id: 'B110104',
        title: 'Activities',
        type: 'item',
      },
      {
        id: 'B110105',
        title: 'Reports',
        type: 'collapsable',
        children: [
          {
            id: 'B1101051',
            title: 'Contacts',
            type: 'item',
          },
          {
            id: 'B1101052',
            title: 'Accounts',
            type: 'item',
          },
          {
            id: 'B1101053',
            title: 'Opportunities',
            type: 'item',
          },
          {
            id: 'B1101054',
            title: 'Activities',
            type: 'item',
          },
        ],
      },
    ],
  },
  {
    id: 'B12',
    title: 'Logistic',
    type: 'collapsable',
    icon: 'store',
    children: [
      {
        id: 'B120102',
        title: 'Material transfers',
        saveOnExit: true,
        type: 'item',
        disabled: true,
      },
      {
        id: 'B120103',
        title: 'Warehouses',
        saveOnExit: true,
        type: 'item',
        disabled: false,
        url: ['warehouses'],
      },
      {
        id: 'B120104',
        title: 'Purchase Orders',
        saveOnExit: true,
        type: 'item',
        url: ['purchase-orders'],
      },
    ],
  },
  {
    id: 'B07',
    title: 'Data Analysis',
    type: 'collapsable',
    icon: 'assignment',

    children: [
      {
        id: 'B0702',
        title: 'Security',
        type: 'collapsable',
        children: [
          {
            id: 'B070201',
            title: 'Users',
            type: 'item',
            titleTab: 'Users Report',
            url: ['data-analysis', 'users'],
          },
          {
            id: 'B070202',
            titleTab: 'Roles Report',
            title: 'Roles',
            type: 'item',
            url: ['data-analysis', 'roles'],
          },
        ],
      },
      {
        id: 'B0703',
        title: 'Configurations',
        type: 'collapsable',
        children: [
          {
            id: 'B070301',
            titleTab: 'Exchange Rates Report',
            title: 'Exchange Rates',
            type: 'item',
            url: ['data-analysis', 'exchange-rates'],
          },
        ],
      },
      {
        id: 'B0701',
        title: 'Entities',
        type: 'collapsable',
        children: [
          {
            id: 'B070101',
            titleTab: 'My Companies Report',
            title: 'My Companies',
            type: 'item',
            url: ['data-analysis', 'companies'],
          },
          {
            id: 'B070102',
            title: 'Clients',
            titleTab: 'Clients Report',
            type: 'item',
            url: ['data-analysis', 'clients'],
          },
          {
            id: 'B070103',
            title: 'Suppliers',
            titleTab: 'Suppliers Report',
            type: 'item',
            url: ['data-analysis', 'suppliers'],
          },
          {
            id: 'B070104',
            title: 'Employees',
            titleTab: 'Employees Report',
            type: 'item',
            url: ['data-analysis', 'employees'],
          },
          {
            id: 'B070802',
            title: 'Items',
            titleTab: 'Items Report',
            type: 'item',
            url: ['data-analysis', 'items'],
          },
          {
            id: 'B070105',
            title: 'Equipment',
            titleTab: 'Equipment Report',
            type: 'item',
            url: ['data-analysis', 'equipment'],
          },
        ],
      },
      {
        id: 'B0704',
        title: 'Projects',
        type: 'collapsable',

        children: [
          {
            id: 'B070401',
            title: 'Projects',
            titleTab: 'Projects Report',
            type: 'item',
            url: ['data-analysis', 'projects'],
          },
          {
            id: 'B070600',
            title: 'Project Outcome',
            titleTab: 'Project Outcome Report',
            type: 'item',
            url: ['data-analysis', 'project-outcome'],
          },
          {
            id: 'B059900101',
            title: 'Project Analysis (Acciona)',
            type: 'item',
            url: ['acciona', 'data-analysis', 'project-analysis-acciona'],
          },
          {
            id: 'B059900102',
            title: 'Energetic Services Analysis (Acciona)',
            type: 'item',
            url: ['acciona', 'data-analysis', 'energetic-services-analysis'],
          },
        ],
      },
      {
        id: 'B070601',
        title: 'Expenses',
        type: 'collapsable',

        children: [
          {
            id: 'B07060101',
            title: 'Purchase Invoices',
            titleTab: 'Purchase Invoices Report',
            type: 'item',
            url: ['data-analysis', 'purchase-invoices'],
          },
          {
            id: 'B07060102',
            title: 'Timesheets',
            titleTab: 'Timesheets Report',
            type: 'item',
            url: ['data-analysis', 'timesheets'],
          },
          {
            id: 'B07060103',
            title: 'Purchase Lines',
            titleTab: 'Purchase Lines Report',
            type: 'item',
            url: ['data-analysis', 'purchase-lines'],
          },
          {
            id: 'B07060104',
            title: 'Equipment Allocation',
            titleTab: 'Equipment Allocation Report',
            type: 'item',
            url: ['data-analysis', 'equipment-allocation'],
          },
        ],
      },
      {
        id: 'B070602',
        title: 'Revenues',
        type: 'collapsable',
        // 'icon': 'monetization_on',

        children: [
          {
            id: 'B07060201',
            title: 'Sales Invoice',
            titleTab: 'Sales Invoices Report',
            type: 'item',
            url: ['data-analysis', 'sales-invoices'],
          },
          {
            id: 'B07060202',
            title: 'Sales Invoices Lines',
            titleTab: 'Sales Invoices Lines Report',
            type: 'item',
            url: ['data-analysis', 'sales-invoices-lines'],
          },
        ],
      },
      {
        id: 'B0707',
        title: 'Cash Management',
        type: 'collapsable',

        children: [
          {
            id: 'B070701',
            title: 'Collections',
            titleTab: 'Collections Report',
            type: 'item',
            url: ['data-analysis', 'collections'],
          },
          {
            id: 'B070702',
            titleTab: 'Payments Report',
            title: 'Payments',
            type: 'item',
            url: ['data-analysis', 'payments'],
          },
        ],
      },
      {
        id: 'B0708',
        title: 'Logistic',
        type: 'collapsable',

        children: [
          {
            id: 'B070801',
            title: 'Purchase Order Lines',
            titleTab: 'Purchase Order Lines Report',
            type: 'item',
            url: ['data-analysis', 'purchase-orders-lines'],
          },
        ],
      },
    ],
  },
  {
    id: 'B08',
    title: 'Help',
    type: 'collapsable',
    icon: 'help',
    disabled: true,
    children: [
      {
        id: 'B0801',
        title: 'Spanish',
        type: 'collapsable',
        children: [
          {
            id: 'B080101',
            title: 'Quick start guide',
            type: 'item',
          },
          {
            id: 'B080102',
            title: 'User Manual ',
            type: 'item',
          },
          {
            id: 'B080103',
            title: 'FAQ',
            type: 'item',
          },
          {
            id: 'B080104',
            title: 'Video Tutorials',
            type: 'item',
          },
          {
            id: 'B080105',
            title: 'Free online training',
            type: 'item',
          },
        ],
      },
      {
        id: 'B0803',
        title: 'Support',
        type: 'collapsable',
        disabled: true,
        children: [
          {
            id: 'B080301',
            title: 'Chat online',
            type: 'item',
          },
        ],
      },
    ],
  },*/
];
