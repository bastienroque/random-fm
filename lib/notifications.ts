import { toast } from "sonner";

type PromiseFn<T> = Promise<T> | (() => Promise<T>);

export const notify = {
  success: (msg: string) => toast.success(msg, { duration: 5000 }),

  error: (msg = "Something went wrong") => toast.error(msg, { duration: 5000 }),

  promise: <T>(
    fn: PromiseFn<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    },
  ) => toast.promise(fn, messages),
};
