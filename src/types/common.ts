export interface FilterQuery<TFilter> {
  page: number
  limit: number
  filter?: TFilter
}
