export interface Studio {
  title: string
  weekdays:
  {
    weekday: string,
    from: string,
    to: string,
    holiday: boolean
  }[]
}