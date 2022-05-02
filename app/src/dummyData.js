export const userData = [
    {
      name: 'Jan',
      "Active Users": 4000,
    },
    {
      name: 'Feb',
      "Active Users": 3000,
    },
    {
      name: 'Mar',
      "Active Users": 2000,
    },
    {
      name: 'Apr',
      "Active Users": 2780,
    },
    {
      name: 'May',
      "Active Users": 1890,
    },
    {
      name: 'Jun',
      "Active Users": 2390,
    },
    {
      name: 'Jul',
      "Active Users": 3490,
    },
    {
        name: 'Aug',
        "Active Users": 4000,
        },
        {
        name: 'Sep',
        "Active Users": 3000,
        },
        {
        name: 'Oct',
        "Active Users": 5000,
        },
        {
        name: 'Nov',
        "Active Users": 6000,
        },
        {
        name: 'Dec',
        "Active Users": 7000,
        },
  ];
  
  export const userImageUrl = "https://i.picsum.photos/id/1027/2848/4272.jpg?hmac=EAR-f6uEqI1iZJjB6-NzoZTnmaX0oI0th3z8Y78UpKM";


  export const userRows = [
    { 
        id: 1, 
        username: 'Jon Snow', 
        avatar: userImageUrl, 
        email: "jon@gmail.com",
        status: "active",
        transaction: "$120"
    },
    { 
        id: 2, 
        username: 'Jon Snow', 
        avatar: userImageUrl, 
        email: "jon@gmail.com",
        status: "active",
        transaction: "$120"
    },
    { 
        id: 3, 
        username: 'Jon Snow', 
        avatar: userImageUrl, 
        email: "jon@gmail.com",
        status: "active",
        transaction: "$120"
    },
    { 
        id: 4, 
        username: 'Jon Snow', 
        avatar: userImageUrl, 
        email: "jon@gmail.com",
        status: "active",
        transaction: "$120"
    },
    { 
        id: 5, 
        username: 'Jon Snow', 
        avatar: userImageUrl, 
        email: "jon@gmail.com",
        status: "active",
        transaction: "$120"
    },
    { 
        id: 6, 
        username: 'Jon Snow', 
        avatar: userImageUrl, 
        email: "jon@gmail.com",
        status: "active",
        transaction: "$120"
    },
    { 
        id: 7, 
        username: 'Jon Snow', 
        avatar: userImageUrl, 
        email: "jon@gmail.com",
        status: "active",
        transaction: "$120"
    },
    { 
        id: 8, 
        username: 'Jon Snow', 
        avatar: userImageUrl, 
        email: "jon@gmail.com",
        status: "active",
        transaction: "$120"
    },
    { 
        id: 9, 
        username: 'Jon Snow', 
        avatar: userImageUrl, 
        email: "jon@gmail.com",
        status: "active",
        transaction: "$120"
    },
    { 
        id: 10, 
        username: 'Jon Snow', 
        avatar: userImageUrl, 
        email: "jon@gmail.com",
        status: "active",
        transaction: "$120"
    },
    { 
        id: 11, 
        username: 'Jon Snow', 
        avatar: userImageUrl, 
        email: "jon@gmail.com",
        status: "active",
        transaction: "$120"
    },
    { 
        id: 12, 
        username: 'Jon Snow', 
        avatar: userImageUrl, 
        email: "jon@gmail.com",
        status: "active",
        transaction: "$120"
    },
  ];
  
  export const productImageUrl = "https://i.gadgets360cdn.com/large/apple_airpods_3rd_generation_image_1634579538152.jpg?downsize=950:*";

  export const productRows = [
    { 
        id: 1, 
        name: 'Apple Airpods', 
        image: productImageUrl, 
        stock: 123,
        status: "active",
        price: "$120"
    },
    { 
      id: 2, 
      name: 'Apple Airpods', 
      image: productImageUrl, 
      stock: 123,
      status: "active",
      price: "$120"
    },
  ];
  

  export const productData = [
    {
      name: 'Jan',
      "Sales": 2000,
    },
    {
      name: 'Feb',
      "Sales": 3000,
    },
    {
      name: 'Mar',
      "Sales": 4000,
    },
  ];

  var baseId = 1000

  export const generateId = () => {
    return baseId++
  }