declare global {
  namespace Express {
    interface Response {
      locals: {
        userId?: number;
      };
    }
  }
}
