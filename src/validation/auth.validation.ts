import { z } from 'zod';

export const signInInputSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'Email must be in String.',
      required_error: 'Email is required',
    })
    .trim()
    .email(),
  password: z
    .string({
      invalid_type_error: 'Password must be in String.',
      required_error: 'Password is required',
    })
    .trim(),
});

export const signUpInputSchema = z.object({
  first_name: z.string({
    invalid_type_error: 'First Name must be in String.',
    required_error: 'First Name is required',
  }),
  last_name: z.string({
    invalid_type_error: 'Last Name must be in String.',
    required_error: 'Last Name is required',
  }),
  email: z
    .string({
      required_error: 'email is required',
    })
    .trim()
    .email(),
  password: z.string({
    invalid_type_error: 'Password must be in String.',
    required_error: 'Password is required',
  }),
});
