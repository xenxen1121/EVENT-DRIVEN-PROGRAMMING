import { useEffect, useState } from "react";

export default function ClockLabel() {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const id = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(id);
  }, []);

  return (
    <div>
      <h2>Clock</h2>
      <p>{now.toLocaleTimeString()}</p>
    </div>
  );
}