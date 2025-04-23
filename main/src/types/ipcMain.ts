/**
 * IPC main listener
 *
 * @desc A function that handles IPC calls
 *
 * @template T The return type of the function
 * @template K The argument(s) needed to call the function
 */
export type IpcMainListener<T, K extends any = any> = (
  event: Electron.IpcMainInvokeEvent,
  data: K
) => Promise<T | null>;
