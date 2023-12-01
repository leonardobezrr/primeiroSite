import React, { useEffect, useState } from "react";
import axios from "axios";

const IpInfo = () => {
  const [ipInfo, setIpInfo] = useState(null);

  useEffect(() => {
    const fetchIpInfo = async () => {
      try {
        const response = await axios.get("https://extreme-ip-lookup.com/json/?key=igoDiVF4RskbYeSBN3jk");
        setIpInfo(response.data);
      } catch (error) {
        console.error("Erro ao obter informações do IP:", error);
      }
    };

    fetchIpInfo();
  }, []);

  if (!ipInfo) return <div>Carregando informações do IP...</div>;

  return (
    <div>
      <h2>Informações do IP</h2>
      <p><strong>IP:</strong> {ipInfo.query}</p>
      <p><strong>Cidade:</strong> {ipInfo.city}</p>
      <p><strong>Região:</strong> {ipInfo.region}</p>
      <p><strong>País:</strong> {ipInfo.country}</p>
      <p><strong>Latitude:</strong> {ipInfo.lat}</p>
      <p><strong>Longitude:</strong> {ipInfo.lon}</p>
    </div>
  );
};

export default IpInfo;
