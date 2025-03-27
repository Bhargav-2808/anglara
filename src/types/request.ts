import { Request } from "express";
import { UserDocument } from "../models/schemas/user.schema";

export type AuthenticatedRequest = Request & {
    userData?: UserDocument; // Add the user property to the Request type
  };
  