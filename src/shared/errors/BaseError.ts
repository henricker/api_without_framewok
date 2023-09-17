type BaseErrorProps = {
  message: string
  statusCode?: number
}

export class BaseError extends Error {
  private statusCode: number

  constructor(props: BaseErrorProps) {
    super(props.message)
    this.statusCode = props.statusCode ?? 500
  }
}
