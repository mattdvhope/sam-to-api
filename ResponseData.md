INFO   {
  id: 120412, # Print job ID
  line_items: [ # Two books in this case (for testing)
    {
      id: 197312, # Line Item ID
      title: 'Test product',
      printable_normalization: [Object],
      status: [Object],
      is_reprint: false,
      thumbnail_url: '',
      external_id: 'item-910707-0',
      quantity: 1,
      printable_id: null,
      order_line_item_id: null,
      tracking_id: '',
      tracking_urls: null,
      pod_package_id: '0600X0900BWSTDLW060UC444GNG'
    },
    {
      id: 197313, # Line Item ID
      title: 'Test product',
      printable_normalization: [Object],
      status: [Object],
      is_reprint: false,
      thumbnail_url: '',
      external_id: 'item-910707-1',
      quantity: 1,
      printable_id: null,
      order_line_item_id: null,
      tracking_id: '',
      tracking_urls: null,
      pod_package_id: '0600X0900BWSTDPB060UC444GXX'
    }
  ],
  shipping_level: 'MAIL',
  shipping_option_id: '',
  status: {
    name: 'CREATED',
    message: 'Print-job is currently being validated',
    changed: '2024-10-12T21:22:45.834721Z'
  },
  costs: {
    shipping_cost: null,
    line_item_costs: null,
    total_cost_excl_tax: null,
    total_tax: null,
    total_cost_incl_tax: null,
    currency: null,
    fulfillment_cost: null
  },
  parent_job_id: null,
  child_job_ids: [],
  estimated_shipping_dates: null,
  reprints: [],
  is_cancellable: true,
  order_id: null,
  date_created: '2024-10-12T21:22:45.840792Z',
  date_modified: '2024-10-12T21:22:45.967125Z',
  external_id: 'PbOrder-20241012T212244877Z-19044083',
  dropship_profile_id: 'c06cefd5-8056-4e03-8020-c50967756069',
  contact_email: 'mattagape@gmail.com',
  production_delay: 120,
  production_due_time: null,
  aggregated_payment_print_job: false,
  tax_country: null,
  order_marked_as_paid: null,
  payments: [],
  shipping_address: {
    user_id: 'b80ab571-a385-48fb-bf4e-478bcca6b23f',
    organization: null,
    street1: '103 Oleander Dr.',
    street2: null,
    city: 'Pensacola',
    postcode: '32503',
    phone_number: '+18502873540',
    email: '',
    is_business: false,
    name: 'Matthew Malone',
    state_code: 'FL',
    country_code: 'US',
    warnings: [ [Object] ],
    suggested_address: {
      country_code: 'US',
      state_code: 'FL',
      postcode: '32503-7637',
      city: 'Pensacola',
      street1: '103 Oleander Dr',
      street2: null
    }
  },
  shipping_option_level: 'MAIL'
}