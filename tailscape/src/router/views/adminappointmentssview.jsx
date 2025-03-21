import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const PetApprovalTable = () => {
  const [data, setData] = useState([]);
  const auth = useSelector((state) => state.auth);
  
  useEffect(() => {
    fetch(`http://localhost:5000/api/${auth.user.role === 'Vet' ? 'doctorAppointments/doctor-appointments' : 'appointments/store-appointments'}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log('Fetched appointments:', result);
        setData(auth.user.role === 'Vet' ? result.data : result.appointments || []);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [auth.user.role]);

  const handleApprovalChange = (id, value) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: value } : item
      )
    );

    fetch(`http://localhost:5000/api/${auth.user.role === 'Vet' ? 'doctorAppointments/doctor-appointments' : 'appointments/store-appointments'}/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: value }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update status');
        }
        window.location.reload();
        return response.json();
      })
      .then((updatedItem) => {
        console.log('Status updated successfully:', updatedItem);
      })
      .catch((error) => {
        console.error('Error updating status:', error);
      });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return '#4CAF50';
      case 'Rejected':
        return '#F44336';
      default:
        return '#FFC107';
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Pet Approval Table</h2>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Time</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Pet Type</th>
              <th style={styles.th}>Breed</th>
              <th style={styles.th}>User ID</th>
              {auth.user.role === 'Vet' && (
                <>
                  <th style={styles.th}>Doctor Name</th>
                  <th style={styles.th}>Hospital Name</th>
                </>
              )}
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((item) => (
                <tr key={item._id} style={styles.tr}>
                  <td style={styles.td}>{item._id}</td>
                  <td style={styles.td}>{item.userId?.name || 'N/A'}</td>
                  <td style={styles.td}>{new Date(item.date).toLocaleDateString()}</td>
                  <td style={styles.td}>{item.time}</td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.status,
                        backgroundColor: getStatusColor(item.status),
                      }}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td style={styles.td}>{item.petType}</td>
                  <td style={styles.td}>{item.breed}</td>
                  <td style={styles.td}>{item.userId?.email || 'N/A'}</td>
                  {auth.user.role === 'Vet' && (
                    <>
                      <td style={styles.td}>{item.doctor.name || 'N/A'}</td>
                      <td style={styles.td}>{item.hospital.name || 'N/A'}</td>
                    </>
                  )}
                  <td style={styles.td}>
                    <select
                      value={item.status}
                      onChange={(e) => handleApprovalChange(item._id, e.target.value)}
                      style={styles.select}
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="denied">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={auth.user.role === 'Vet' ? 11 : 9} style={{ textAlign: 'center' }}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    color: '#333',
    marginBottom: '20px',
  },
  tableContainer: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0 10px',
  },
  th: {
    backgroundColor: '#f8f9fa',
    color: '#333',
    fontWeight: 'bold',
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #dee2e6',
  },
  tr: {
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #dee2e6',
  },
  status: {
    padding: '5px 10px',
    borderRadius: '20px',
    color: 'white',
    fontWeight: 'bold',
  },
  select: {
    width: '100%',
    padding: '5px',
    borderRadius: '4px',
    border: '1px solid #ced4da',
  },
};

export default PetApprovalTable;
