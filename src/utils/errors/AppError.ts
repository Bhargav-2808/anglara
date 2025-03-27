export type AppErrorObj = {
  status: number
  message: string
  error?: unknown
}

export class AppError {
  status: number
  message: string
  error?: unknown
  constructor(status: number, message: string, error?: unknown) {
    this.status = status
    this.message = message
    this.error = error
  }

  static BadRequest(msg: string): AppErrorObj {
    return new AppError(400, msg)
  }

  static NotFound(msg: string): AppErrorObj {
    return new AppError(404, msg)
  }

  static ServerError(msg: string, error: unknown): AppErrorObj {
    return new AppError(500, msg, error)
  }

  static UnAuthorized(msg: string): AppErrorObj {
    return new AppError(401, msg)
  }
  
  static Forbidden(msg: string): AppErrorObj {
    return new AppError(403, msg);
  }
}
