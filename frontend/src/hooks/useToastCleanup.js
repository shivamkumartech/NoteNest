import { useEffect } from "react";
import { toast } from "sonner";

export function useToastCleanup() {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        toast.dismiss();
      }
    };

    const handlePageShow = (event) => {
      if (event.persisted) {
        toast.dismiss();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);
}