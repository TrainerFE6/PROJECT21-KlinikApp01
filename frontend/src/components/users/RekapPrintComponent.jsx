import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { NumericFormat } from 'react-number-format';

const RekapPrintComponent = React.forwardRef(({ rekap }, ref) => (
  <div ref={ref} className="container mt-5">
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h5>Nama Pasien: {rekap.nama_pasien}</h5>
      </div>
      <div className="card-body">
        <h5 className="card-title text-center">Dokter Pemeriksa: {rekap.nama_dokter}</h5>
        <p className="card-text text-center">Keluhan Pasien: {rekap.keluhan_pasien}</p>
        <p className="card-text text-center">Obat Yang Harus Diberi: {rekap.Obat_pasien}</p>
        <p className="card-text text-center">Jenis Pemeriksaan: {rekap.jenis_pemeriksaan}</p>
        <b style={{
          backgroundColor: 'lightgreen',
          padding: '10px',
          display: 'block',
          borderRadius: '5px',
          marginTop: '15px',
          border: '1px solid #008000'
        }}>
          <p className="card-text">Hasil Pemeriksaan: {rekap.hasil_pemeriksaan}</p>
          <p className="card-text">Pesan: {rekap.pesan}</p>
          <p className="card-text">Biaya Pemeriksaan:
            <NumericFormat
              value={rekap.biayaPemeriksaan}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'Rp '}
              renderText={value => <span>{value}</span>}
            />
          </p>
        </b>
      </div>
      <div className="card-footer text-muted">
        Terima kasih telah menggunakan layanan kami
      </div>
    </div>
  </div>
));

export default RekapPrintComponent;
