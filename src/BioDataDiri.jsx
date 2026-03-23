import React from 'react';
import './custom.css';

// 6 Child Components
const Header = () => (
  <div className="portfolio-header">
    <h1 className="hero-name">SUCI</h1>
    <p className="tagline">Backend Developer | Python & Cloud Enthusiast</p>
  </div>
);

const TentangSaya = () => (
  <div className="portfolio-section center-text">
    <h2 className="section-title">Tentang Saya</h2>
    <p className="content-text">
      Mahasiswa Prodi Sistem Informasi yang sedang belajar menggunakan React pada semester 4
    </p>
  </div>
);

const ProyekCoreAPI = () => (
  <div className="proyek-card card-teal-accent">
    <h3>Core API Service</h3>
    <p>Membangun sistem autentikasi dan otorisasi terpusat menggunakan Django Rest Framework.</p>
  </div>
);

const ProyekDataPipeline = () => (
  <div className="proyek-card card-teal-accent">
    <h3>Data Pipeline ETL</h3>
    <p>Otomatisasi pemrosesan data besar menggunakan Python dan AWS Lambda.</p>
  </div>
);

const ProyekCloudDeploy = () => (
  <div className="proyek-card card-teal-accent">
    <h3>Microservices Docker</h3>
    <p>Containerisasi dan orkestrasi layanan backend menggunakan Docker & Kubernetes.</p>
  </div>
);

const PengalamanOrganisasi = () => (
  <div className="portfolio-section">
    <h2 className="section-title center-text">Pengalaman Organisasi</h2>
    <ul className="org-list">
      <li><strong>Pengurus PSM PCR</strong> - Divisi Kominfo (2025-2026).</li>
      <li><strong>Pengurus Seni Tari PCR</strong> - Divisi Kominfo (2025-2026).</li>
    </ul>
  </div>
);

// Parent Component
const BiodataDiri = () => {
  return (
    <div className="main-container">
      <div className="portfolio-card">
        <Header />
        <TentangSaya />
        
        <div className="portfolio-section">
          <h2 className="section-title center-text">Portofolio Proyek Backend</h2>
          <div className="proyek-grid">
            <ProyekCoreAPI />
            <ProyekDataPipeline />
            <ProyekCloudDeploy />
          </div>
        </div>
        
        <PengalamanOrganisasi />
      </div>
    </div>
  );
};

export default BiodataDiri;