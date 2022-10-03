class CustomError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export default CustomError;

// https://github.com/tryber/sd-020-a-store-manager/pull/116/files#diff-8878d0357aeba5c00d88ad0d2f0cd2a478d5b977f23723b56d3b1c2b480f61b7
