import { useEffect } from "react";//side effects ko manage karta hai(timers)


//type definition for the props that the Toast component will accept
type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;    //Toast close hone ka handler
};



const Toast = ({ message, type, onClose }: ToastProps) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timer); // ensure karta hai ki agar component unmount ho gaya, to timer clear ho jaye
    };
  }, [onClose]);


  const styles =
    type === "SUCCESS"
      ? "fixed top-4 right-4 z-50 p-4 rounded-md bg-green-600 text-white max-w-md"
      : "fixed top-4 right-4 z-50 p-4 rounded-md bg-red-600 text-white max-w-md";

  return (
    <div className={styles}>
      <div className="flex justify-center items-center">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default Toast;