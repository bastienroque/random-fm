import { toast } from "sonner";

type PromiseFn<T> = Promise<T> | (() => Promise<T>);

export const notify = {
  success: (msg: string) => toast.success(msg, { duration: 4000 }),

  error: (msg = "Something went wrong") =>
    toast.error(msg, { duration: Infinity }),

  promise: <T>(
    fn: PromiseFn<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    },
  ) => toast.promise(fn, messages),
};
