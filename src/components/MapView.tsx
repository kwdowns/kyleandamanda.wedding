"use client";
import React, { useEffect, useState } from "react";

export function MapView() {
  const [viewport, setViewport] = useState("");

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width < 768) {
        setViewport("mobile");
      } else if (width < 1024) {
        setViewport("tablet");
      } else {
        setViewport("desktop");
      }
    }

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="mx-auto">
      {viewport === "mobile" && (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3096.036561065716!2d-94.58078742268575!3d39.10563777168053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87c0f12465a4e03b%3A0xa5c299be760e5f4d!2sThe%20Jewel%20Event%20Space!5e0!3m2!1sen!2sus!4v1718410529111!5m2!1sen!2sus"
          width={400}
          height={300}
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="inline md:hidden"
        ></iframe>
      )}
      {viewport === "tablet" && (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3096.036561065716!2d-94.58078742268575!3d39.10563777168053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87c0f12465a4e03b%3A0xa5c299be760e5f4d!2sThe%20Jewel%20Event%20Space!5e0!3m2!1sen!2sus!4v1718410529111!5m2!1sen!2sus"
          width={600}
          height={450}
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="hidden md:inline lg:hidden"
        ></iframe>
      )}
      {viewport === "desktop" && (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1548.0292970908088!2d-94.5770299115985!3d39.10513613530659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87c0f12465a4e03b%3A0xa5c299be760e5f4d!2sThe%20Jewel%20Event%20Space!5e0!3m2!1sen!2sus!4v1716956238954!5m2!1sen!2sus"
          width={800}
          height={600}
          loading="lazy"
          style={{ border: 0 }}
          referrerPolicy="no-referrer-when-downgrade"
          className="hidden lg:inline"
        ></iframe>
      )}
    </div>
  );
}
