export interface AsyncActionInterface<TData> {
    (dispatch: () => void): Promise<TData>;
}
