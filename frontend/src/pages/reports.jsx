import { useEffect, useState } from "react";
import { fetchReports } from "../utils/api";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/reports.css";

export default function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    let interval;

    const loadReports = async () => {
      const res = await fetchReports();
      setReports(res.data);
    };

    loadReports();

    // 🔄 Refresh every 5 seconds while any report is still processing
    interval = setInterval(loadReports, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <div className="reports-container">
      <h2>Your Reports</h2>
      {reports.length === 0 ? (
        <p>No reports uploaded yet.</p>
      ) : (
        <div className="report-list">
          {reports.map((r) => (
            <Link key={r.id} to={`/reports/${r.id}`} className="report-card">
              <div className="report-header">
                <span className="filename">{r.filename}</span>
                <span
                  className={
                    r.explanation
                      ? "status ready"
                      : r.analysisError
                      ? "status error"
                      : "status processing"
                  }
                >
                  {r.explanation
                    ? "Ready"
                    : r.analysisError
                    ? "Error"
                    : "Processing..."}
                </span>
              </div>
              <p className="time">
                Uploaded: {new Date(r.uploadedAt).toLocaleString()}
              </p>
            </Link>
          ))}
        </div>
      )}
      </div>
    </>
  );
}

