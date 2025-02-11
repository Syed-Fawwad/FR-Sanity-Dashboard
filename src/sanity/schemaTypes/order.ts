export default {
  name: "order",
  title: "Orders",
  type: "document",
  fields: [
    {
      name: "firstName",
      title: "First Name",
      type: "string",
      validation: (Rule: { required: () => { (): any; new(): any; min: { (arg0: number): { (): any; new(): any; max: { (arg0: number): any; new(): any; }; }; new(): any; }; }; }) => Rule.required().min(2).max(50),
    },
    {
      name: "lastName",
      title: "Last Name",
      type: "string",
      validation: (Rule: { required: () => { (): any; new(): any; min: { (arg0: number): { (): any; new(): any; max: { (arg0: number): any; new(): any; }; }; new(): any; }; }; }) => Rule.required().min(2).max(50),
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule: { required: () => { (): any; new(): any; email: { (): any; new(): any; }; }; }) => Rule.required().email(),
    },
    {
      name: "phone",
      title: "Phone Number",
      type: "string",
      validation: (Rule: { required: () => { (): any; new(): any; min: { (arg0: number): { (): any; new(): any; max: { (arg0: number): any; new(): any; }; }; new(): any; }; }; }) => Rule.required().min(10).max(15),
    },
    {
      name: "city",
      title: "City",
      type: "string",
      validation: (Rule: { required: () => any; }) => Rule.required(),
    },
    {
      name: "zipCode",
      title: "Zip Code",
      type: "string",
      validation: (Rule: { required: () => { (): any; new(): any; min: { (arg0: number): { (): any; new(): any; max: { (arg0: number): any; new(): any; }; }; new(): any; }; }; }) => Rule.required().min(4).max(10),
    },
    {
      name: "address1",
      title: "Address 1",
      type: "string",
      validation: (Rule: { required: () => any; }) => Rule.required(),
    },
    {
      name: "items",
      title: "Ordered Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Product Name", type: "string", validation: (Rule: { required: () => any; }) => Rule.required() },
            { name: "price", title: "Price", type: "number", validation: (Rule: { required: () => { (): any; new(): any; min: { (arg0: number): any; new(): any; }; }; }) => Rule.required().min(0) },
            { name: "quantity", title: "Quantity", type: "number", validation: (Rule: { required: () => { (): any; new(): any; min: { (arg0: number): any; new(): any; }; }; }) => Rule.required().min(1) },
          ],
        },
      ],
      validation: (Rule: { required: () => any; }) => Rule.required(),
    },
    {
      name: "total",
      title: "Total Amount",
      type: "number",
      validation: (Rule: { required: () => { (): any; new(): any; min: { (arg0: number): any; new(): any; }; }; }) => Rule.required().min(0),
    },
    {
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: ["Pending", "Shipped", "Delivered", "Cancelled"],
      },
      initialValue: "Pending",
    },
  ],
};