import { z } from 'zod';
import { TASK_STATUS } from '../utils/constants/constant';

export const addTaskSchema = z.object({
  title: z
    .string({
      invalid_type_error: 'title must be in String.',
      required_error: 'title is required',
    })
    .trim(),
  description: z
    .string({
      invalid_type_error: 'description must be in String.',
      required_error: 'description is required',
    })
    .trim(),
});

export const updateTaskSchema = z.object({
  title: z
    .string({
      invalid_type_error: 'title must be in String.',
      required_error: 'title is required',
    })
    .trim(),
  description: z
    .string({
      invalid_type_error: 'description must be in String.',
      required_error: 'description is required',
    })
    .trim(),
    status: z.enum([TASK_STATUS.TODO, TASK_STATUS.IN_PROGRESS, TASK_STATUS.COMPLETED], {
      errorMap: () => {
        return { message: 'Invalid task status' }; // Custom error message
      }
    }).refine((status) => Object.values(TASK_STATUS).includes(status), {
      message: 'Invalid task status',
    }),
});
