// src/DocumentUpload.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styles } from './Theme';

function Upload({ user }) {
  // State for file selection and upload status
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  // State for the list of documents
  const [documents, setDocuments] = useState([]);

  // Fetch the document list from the API
  const fetchDocuments = async () => {
    try {
      const response = await axios.get('/api/doclist');
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
      setUploadStatus('Error fetching document list.');
    }
  };

  // Fetch documents on component mount
  useEffect(() => {
    fetchDocuments();
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  // Handle file upload submission
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedFiles || selectedFiles.length === 0) {
      setUploadStatus('Please select at least one document to upload.');
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i]);
    }

    try {
      await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadStatus('Upload successful!');
      setSelectedFiles(null);
      // Refresh the document list after a successful upload
      fetchDocuments();
      
    } catch (error) {
      console.error('Error uploading document:', error);
      setUploadStatus('Upload failed. Please try again.');
    }
  };
  

  // Handle document deletion
  const handleDelete = async (docId) => {
    try {
      await axios.delete(`/api/doclist/${docId}`);
      setUploadStatus('Document deleted successfully.');
      fetchDocuments();
    } catch (error) {
      console.error('Error deleting document:', error);
      setUploadStatus('Delete failed. Please try again.');
    }
  };

  return (
    <div style={styles.contentContainer}>
      <div style={styles.card}>
        <p>
          Welcome, {user?.name} ({user?.title})!
        </p>

        <h2>Document Management</h2>
        
        {/* Upload Form */}
        <form onSubmit={handleUpload} style={styles.form}>
          <div style={styles.formGroup}>
            <label>Select Document(s) to Upload:</label>
            <input
              type="file"
              onChange={handleFileChange}
              multiple
              accept="*/*"
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Upload</button>
        </form>
        {uploadStatus && <p style={styles.message}>{uploadStatus}</p>}

        {/* Document List */}
        <h3 style={{ marginTop: '20px' }}>Uploaded Documents</h3>
        {documents.length > 0 ? (
          <table style={{ width: '100%', marginTop: '10px', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>ID</th>
                <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Name</th>
                <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id}>
                  <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{doc.id}</td>
                  <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{doc.name}</td>
                  <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>
                    <button
                      onClick={() => handleDelete(doc.id)}
                      style={{ ...styles.button, padding: '5px 10px', fontSize: '14px' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No documents found.</p>
        )}
      </div>
    </div>
  );
}

export default Upload;
