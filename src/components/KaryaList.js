import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/KaryaList.css";

const KaryaList = () => {
  const [karyas, setKaryas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://rw-illlumart-production.up.railway.app/api/karya')
      .then(response => response.json())
      .then(data => setKaryas(data))
      .catch(error => console.error('Gagal fetch karya:', error));
  }, []);

  const handleBeliSekarangClick = (karya) => {
    navigate('/Transaksi', {
      state: {
        idKarya: karya.id,
        namaKarya: karya.nama,
        penulis: karya.penulis,
        harga: karya.harga,
        gambar: `http://https://rw-illlumart-production.up.railway.app/${karya.file_path}`,
        fileUrl: `http://https://rw-illlumart-production.up.railway.app/${karya.file_url}`, // pastikan ini tersedia
      },
    });
  };

  return (
    <div className="karya-list">
      <h1>Daftar Karya</h1>
      <div className="karya-container">
        {karyas.map(karya => (
          <div key={karya.id} className="karya-card">
            <img
              src={`http://https://rw-illlumart-production.up.railway.app/${karya.file_path}`}
              alt={karya.nama}
              className="karya-image"
            />
            <h3>{karya.nama}</h3>
            <p>Rp {karya.harga.toLocaleString()}</p>
            <p>Lisensi: {karya.lisensi}</p>
            <button
              className="beli-button"
              onClick={() => handleBeliSekarangClick(karya)}
            >
              Beli Sekarang
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KaryaList;
