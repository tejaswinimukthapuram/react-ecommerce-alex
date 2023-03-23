import { object, string, number, InferType } from 'yup';

import React from 'react';

let userSchema = object({
    title: string().required(),
    price: number().required().positive().integer(),
    description: string().required(),
    image: string().url().nullable(),
    
  });

  export default userSchema;
  