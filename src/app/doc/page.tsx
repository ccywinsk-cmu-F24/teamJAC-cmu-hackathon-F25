"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });
import "swagger-ui-react/swagger-ui.css";

export default function ApiDoc() {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    fetch("/api/doc/swagger")
      .then((res) => res.json())
      .then((data) => setSpec(data))
      .catch((error) => console.error("Error fetching swagger spec:", error));
  }, []);

  if (!spec) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading API documentation...</p>
      </div>
    );
  }

  return <SwaggerUI spec={spec} />;
}
