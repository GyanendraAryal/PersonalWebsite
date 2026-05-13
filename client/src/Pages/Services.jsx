import { useState, useEffect } from 'react'
import ServiceCard from "../Components/ServiceCard";

const Services = () => {
  const [services, setServices] = useState([])

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/services.json")
        const data = await res.json()
        setServices(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchServices();
  }, [])

  return (
    <section className="min-h-screen bg-[#0f172a] px-6 py-20">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold mb-14 text-center">
          <span className="text-orange-500">Services</span>
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;